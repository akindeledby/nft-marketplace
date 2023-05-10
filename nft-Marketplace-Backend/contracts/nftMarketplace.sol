// SPDX-License-Identifier: MIT

pragma solidity >0.8.0;

// import all needed OpenZeppelin ERC721 NFT Properties
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

contract nftMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

// We will define the listiing price => It is a state variable
uint256 listingPrice = 0.0015 ether;

// whoever deploy this contract becomes the owner and it can also receiive funds because we make it payable
address payable owner;

// Every NFT has a unique ID, and we will pass that ID in this mapping as a struct which will have other properties like seller, price, owner, etc which we will define in a struct below
// All the NFTs/Tokens will be held by the mapping
mapping(uint256 => MarketItem) private idMarketItem;

struct MarketItem {
    uint256 tokenId;
    address payable seller;
    address payable owner;
    uint246 price;
    bool sold;
}

// we will create an event which gets triggered whenever an item is to be sold/listed 
event idMarketItemCreated(
    uint256 indexed tokenId,
    address seller,
    address owner,
    uint256  price,
    bool sold,
);

modifier onlyOwner () {
    require(msg.sender == owner, "Only the owner of the market place can change the listing price")
} _;


// must create the NFT and assign symbol to it using the constructor keyword
    constructor() ERC721("NFT Metaverse Token", "MYTKN") {
        owner == payable(msg.sender);
    }

// We will create a function which will enables us as the owner to alllow us update the listing price on tthe market place
    function updateListingPrice(uint256 _listingPrice) public payable onlyOwner {
        
    }

    // We will create a function that will let people to fetch/get the listing price
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    // We will create/mint the tokens
    function create(string memory tokenURI, uint256 price) public payable returns(uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price);
        return newTokenId;
    } 

    // We will create the market items and specify the conditions
    function createMartketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must be at least 1");
        require(msg.value == listingPrice, "The input Price must be equal  or greater  than listing price");
    
    // We will use the  mappping(idMarketItem) created earlier and pass the id to find the NFT and the entire data and update it with use of the struct
    idMarketItem[tokenId] = MarketItem(
        tokensId,
        payable(msg.sender),
        payable(adddress(this)),
        price,
        false //NFT not yet transffered
    )

  // Now we will want to transfer the NFT
    _transfer(msg.sender, address(this), tokenId)

    emit idMarketItemCreated(tokenID, msg.sender, address(this), price, false)
    }

    // A user may also want to resell the token
    function reSellToken(uint256 tokenId, uint price) public payable {
        require(idMarketItem[tokenId].owner ==  msg.sender, "Only the item owner ccan perform this operation");
        require(msg.value == listingPrice, "The price must equal to the listing Price");

        idMarketItem[tokenId].sold = false;
        idMarketItem[tokenId].price = price;
        idMarketItem[tokenId].seller = msg.sender;
        idMarketItem[tokenId].owner = payable(address(this));

        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }

    // We will create a function called finalizeSale which will allow buyer to purchase item
    function finaliizeSale(uint256 tokenId) public payable {
        uint256 price =  idMarketItem[tokenId].price;
        require(msg.value == price, "Please Enter the correct price in order to complete the purchase");

        idMarketItem[tokenId].owner = payable(msg.sender);
        idMarketItem[tokenId].sold = true;
        idMarketItem[tokenId].owner = payable(address(0));

        _itemsSold.increment();

        _transfer(address(this), msg.sender,, tokenId);

        // Now the owner of the market place will get his commission from the sale 
        payable(owner).transfer(listingPrice);
        payable(idMarketItem[tokenId].seller).transfer(msg.value);
    }

    // Getting remaining/unsold items at a point in time(Current time)
    function getUnsoldMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 noOfUnsoldItems = _tokenIds.current() - _itemsSold.current();
        uint256 currentIndex = 0; // We will loop over the entire NFT and store inside currentIndex

    // We will call the array(MarketItem) and use it to create a "new" array(called items) where we are going to store all 
    // the unsold NFTs, and we also specify the length(which is noOfUnsoldItems) so as to use it on the frontend
    // Then we will loop over it using the "For statement". This helps us to track them
    MarketItem[] memory items = new MarketItem[](noOfUnsoldItems);
    for (uint256 i = 0; i < itemCount; i++) {
        if (idMarketItem[i + 1].owner == address(this)) {
            uint256 currentId = i + 1;
            MarketItem storage currentItem = idMarketItem[currentId];
            items[currentIndex] = currentItem;
            currentItem += 1;
        }
    }
        return items;
    }

    // We will write a function which will display/show all NFT purchased/belonging to a buyer in his collection
    function fetchBuyersNFT() public view returns (MarketItem[] memory) {
        uint256 buyerCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < buyerCount; i++) {
            if(idMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1 
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < buyerCount; i++) {
            if (idMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
            MarketItem storage currentItem = idMarketItem[currentId];
            items[currentIndex] = currentItem;
            currentIndex +=1;
            }
        }
        return items;
    } 

    // Displaying single NFT properties/information from the buyer/address
    function fetchitemListed() public view returns (MarketItem[] memory) {
        uint256 buyerCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint currentIndex = 0;

        for (uint256 i = 0; i < buyerCount; i++) {
            if(idMarketItem[i + 1].seller == msg.sender) {
                itemCount +=1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < buyerCount; i++) {
            if(MarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
