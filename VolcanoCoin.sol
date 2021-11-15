//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract VolcanoCoin is ERC20, Ownable {
    
    constructor() ERC20("VolcanoCoin", "VLCC") {
        _mint(msg.sender, 10000);
    }
    
    mapping(address => Payment[]) public _payments;
    
    struct Payment {
        address paymentSender;
        address paymentRecipient;
        uint paymentAmount;
    }
    
    event SupplyIncreased(uint _newSupply);
    event TransactionSuccess(uint transactionAmount, address transactionAddress);
    
    function transfer(address recipient, uint amount) public override returns (bool) {
        recordPayment(msg.sender, recipient, amount);
        super.transfer(recipient, amount);
        return true;
    }
    
    function getPayments (address account) public view virtual returns (Payment[] memory) {
        return _payments[account];
    }
    
    function recordPayment(address _sender, address _recipient, uint _amount) private returns (bool) {
        _payments[msg.sender].push(
                Payment({
                    paymentSender: _sender,
                    paymentRecipient: _recipient,
                    paymentAmount: _amount
            }));
        return true;
    }
    
    function increaseSupply() public onlyOwner {
        _mint(msg.sender, 1000);
        emit SupplyIncreased(totalSupply());
    }
    
}