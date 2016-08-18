// set some initial global variables
var this_contract;
var this_contract_addr;
var from_account = web3.eth.coinbase;

// this function will retrieve a list of products from the store
function getItems() {
  console.log("\ngetItems clicked");
  this_contract.getItemCount.call().then(function(value) {
    console.log("Number of items in store: " + value.valueOf());
    var itemCount = value.valueOf();
    if (itemCount != 0) {
      for (var i = 0; i < itemCount; i++) {
          console.log("Item: " + i);
          this_contract.getItem.call(i).then(function(value) {
            console.log(value);
          });
      }
    }
    else { console.log("Store is empty"); }
  }).catch(function(e) {
      console.log(e);
  });
};

// this function will create a new item the store
function newItem() {
  console.log("\nnewItem clicked");
  this_contract.newItem("Test 2", 500, 10, {from: from_account, gas: 500000}).then(function(value) {
    console.log(value.valueOf());
    console.log(web3.eth.getTransactionReceipt(value));
  }).catch(function(e) {
      console.log(e);
  });
};

// this function delete an item from the store
function deleteItem() {
  console.log("\ndeleteItem clicked");
};

function getBalance() {
  //this_contract.GetBalance.call(this_contract_addr, {from: from_account}).then(function(value) {
    
    console.log("Contract balance: " + web3.eth.getBalance(this_contract_addr));
    document.getElementById("c_balance").innerHTML = web3.eth.getBalance(this_contract_addr);
    document.getElementById("cb_balance").innerHTML = web3.eth.getBalance(from_account);
  //});
};

// this function will be called when the dapp initially loads
window.onload = function() {
  this_contract = ShopFront.deployed();
  this_contract_addr = this_contract.address;

  console.log("\nContract info: "); console.log(this_contract);
  console.log("\nContract address: " + this_contract_addr);
  console.log("Contract balance: " + web3.eth.getBalance(this_contract_addr));

  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    console.log("\nAll accounts: ");
    console.log(accounts);
  });
}
