// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract VolcanoToken is Ownable, ERC721 {
    uint256 private tokenId = 1;
    
    constructor() ERC721("VulcanoToken", "VULT") {}

    struct TokenMetadata {
        address tokenOwner;
        uint256 tokenId;
        string tokenUri;
    }
    
    mapping(address => TokenMetadata[]) private tokensOwned;

    function getTokenId() public view returns(uint256) {
        return tokenId;
    }
    
    function getTokensOwned() public view returns(TokenMetadata[] memory) {
        return tokensOwned[msg.sender];
    }

    function mintToken(address tokenOwner, string memory tokenURI) public {
        TokenMetadata memory newTokenData = TokenMetadata(tokenOwner, tokenId, tokenURI);
        tokensOwned[tokenOwner].push(newTokenData);
        _safeMint(tokenOwner, tokenId);
        tokenId++;
    }
    
    function _validateUser(address _userAddress, uint256 _tokenId) private view returns (bool) {
        for (uint i=0; i < tokensOwned[_userAddress].length; i++) {
            if (tokensOwned[_userAddress][i].tokenId == _tokenId) {
                return true;
            }
        }
        return false;
    }

    function burnToken(uint256 _tokenId) public {
        require(_validateUser(msg.sender, _tokenId), "User is not the token owner!");

        _burn(_tokenId);
        _removeToken(_tokenId, msg.sender);
    }

    function _removeToken(uint256 _tokenId, address _userAddress) private {
        TokenMetadata[] memory tokensMetadata = tokensOwned[_userAddress];

        for (uint i=0; i < tokensMetadata.length; i++) {
            if (tokensMetadata[i].tokenId == _tokenId) {
                delete tokensOwned[_userAddress][i];
            }
        }
    }
}
