// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

contract DeFi {
    address public constant DAI = ADDR_ONE;
    address public constant USDC = ADDR_TWO;

    ISwapRouter public immutable swapRouter;

    constructor() {
        swapRouter = ISwapRouter(ADDR_ONE);
    }

    function swapDAItoUSDC(uint256 amountIn) external returns (uint256) {
        require(amountIn > 0, "Amount cannot be less 0 or less");

        TransferHelper.safeApprove(DAI, address(swapRouter), amountIn);

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
            tokenIn: DAI,
            tokenOut: USDC,
            fee: 1000,
            recipient: msg.sender,
            deadline: block.timestamp,
            amountIn: amountIn,
            amountOutMinimum: 0,
            sqrtPriceLimitX96: 0
        });

        uint256 amountOut = swapRouter.exactInputSingle(params);
        return amountOut;
    }

    function swapDAItoToken(uint256 amountIn, address _tokenAddress) external returns (uint256) {

        TransferHelper.safeApprove(DAI, address(swapRouter), amountIn);

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
            tokenIn: DAI,
            tokenOut: _tokenAddress,
            fee: 1000,
            recipient: msg.sender,
            deadline: block.timestamp,
            amountIn: amountIn,
            amountOutMinimum: 0,
            sqrtPriceLimitX96: 0
        });

        uint256 amountOut = swapRouter.exactInputSingle(params);
        return amountOut;
    }
}
