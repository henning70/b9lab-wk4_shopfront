contract ShopFront {
	function ShopFront() {
		owner = msg.sender;
	}
	
	// set some variables
	address owner;
	uint itemIds;

	// create a mapping as a storage reference
	mapping(uint=>myStoreData) public myStore;

	// create the struct to store product information in the store
	struct myStoreData {
		address owner;
		string itemName;
		uint256 itemPrice;
		uint itemStock;
	}

	// add a modifier for only allow
	modifier onlyOwner {
	    if (msg.sender != owner) {
	        throw;
	    } else {
	        _
	    }
	}

	// we need the number of itemyStore in the struct to generate a list of products in the store
	function getItemCount() returns (uint itemCount) {
	    return itemIds;
	}

    // this function will retrieve information regarding the products in the store
	function getItem(uint _itemId) returns (string itemName, uint256 itemPrice, uint itemStock) {
		myStoreData item = myStore[_itemId];
		return (item.itemName, item.itemPrice, item.itemStock);
	}

    // this function will register a new product in the store
	function newItem(string _itemName, uint256 _itemPrice, uint _itemStock) onlyOwner returns (uint _itemId) {
	    _itemId = itemIds++;
		myStore[_itemId] = myStoreData(owner, _itemName, _itemPrice, _itemStock);

		return _itemId;
	}

    // this function will delete an obsolete product from the store
	function deleteItem(uint _itemId) returns(bool) {
  		delete myStore[_itemId];
  	    return true;
	}
}
