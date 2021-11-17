//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";   

contract VolcanoToken is ERC721, Ownable {
    
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    constructor() ERC721("VolcanoToken", "VLT") {}
    
    struct Token {
        uint256 tokenID;
        uint timestamp;
        string tokenURI;
    }
    
    Token[] tokens;
    mapping(address => Token[]) public _addressToToken;
    mapping(uint => address) public _tokenToOwner;
    
    
    function mintNewToken(address to) public onlyOwner returns (bool) {
        
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
            
        //Mint the token using OZ function
        _safeMint(to, newItemId);
        
        Token memory myNewToken = Token({
            tokenID: newItemId,
            timestamp: block.timestamp,
            tokenURI: tokenURI(newItemId)
        });
        
        //Store in array of all tokens
        tokens.push(myNewToken);
        
        //Store in struct of Owner in tokens array
        _addressToToken[to].push(myNewToken);
        
        //Store in mapper of tokenID to owner address
        _tokenToOwner[newItemId] = to;
        
        return true;
    }
    
    function returnMyTokens() public view returns (Token[] memory) {
        return _addressToToken[msg.sender];
    }
    
    function removeToken(uint _tokenID) internal {
        for (uint i = 0; i < tokens.length; i++) {
            if (tokens[i].tokenID == _tokenID){
                delete tokens[i];
            }
        }
    }
    
    function removeTokenFromOwner(uint _tokenID, address _address) internal {
        for (uint i = 0; i < _addressToToken[_address].length; i++) {
            if (_addressToToken[_address][i].tokenID == _tokenID){
                delete _addressToToken[_address][i];
            }
        }
    }
    
    function _baseURI() internal view virtual override returns (string memory) {
        return "VolcanoToken-";
    }
    
    function burnToken(uint256 tokenID) public onlyOwner returns (bool) {
        
        //Check if sender is the owner of token to be deleted using mapper of tokenID to owner address
        require(_tokenToOwner[tokenID] == msg.sender);
        
        //Burn the token using OZ function
        _burn(tokenID);
        
        //Remove from general tokens Array
        removeToken(tokenID);
        
        //Remove from struct of Owner in tokens array
        removeTokenFromOwner(tokenID, msg.sender);
        return true;
    }
}