//SPDX-License-Identifier: UNLICENSED

contract VolcanoCoin {
    
    uint totalSupply = 10000;
    address owner;
    
    event SupplyIncreased(uint _newSupply);
    
    constructor(){
        owner = msg.sender;
    }
    
    modifier onlyOwner {
        if (msg.sender == owner) {
            _;
        }
    }
    
    function getSupply() public view returns (uint) {
        return totalSupply;
    }
    
    function increaseSupply() public onlyOwner {
        totalSupply += 1000;
        emit SupplyIncreased(totalSupply);
    }
}