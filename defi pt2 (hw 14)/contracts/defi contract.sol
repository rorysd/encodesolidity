// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

interface Erc20 {
    function approve(address, uint256) external returns (bool);
    function transfer(address, uint256) external returns (bool);
}

interface CErc20 {
    function mint(uint256) external returns (uint256);
    function exchangeRateCurrent() external returns (uint256);
    function supplyRatePerBlock() external returns (uint256);
    function redeem(uint) external returns (uint);
    function redeemUnderlying(uint) external returns (uint);
}

contract DeFi {
    Erc20 public immutable token;
    CErc20 public immutable cToken;
    AggregatorV3Interface private priceFeed;
    
    address public constant DAI = ADDR1;
    address public constant cDAI = ADDR2;
    address public constant ETHPriceContract = ADDR3;

    constructor() {
        token = Erc20(address(DAI));
        cToken = CErc20(address(cDAI));
        priceFeed = AggregatorV3Interface(ETHPriceContract);
    }

    function addToCompound(uint256 amount) public {
        require(amount > 0, "Amount cannot be less 0 or less");
        
        token.approve(address(cDAI), amount);
        cToken.mint(amount);
    }

    function getEthPrice() public view returns(int) {
        (, int price,,,) = priceFeed.latestRoundData();
        return price;
    }
}
