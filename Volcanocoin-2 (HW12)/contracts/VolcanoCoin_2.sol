// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';

enum PaymentType {
  UNKNOWN,
  BASICPAYMENT,
  REFUND,
  DIVIDEND,
  GROUPPAYMENT
}

struct Payment {
    address recipient;
    uint256 transferAmount;
    uint256 paymentId;
    uint256 timestamp;
    PaymentType paymentType;
    string comment;
}

contract VolcanoCoinV2 is ERC20Upgradeable, UUPSUpgradeable, OwnableUpgradeable {

    address private adminAddress;
    uint256 private paymentId;
    uint256 public version;
    PaymentType defaultPaymentType;

    function initialize(address _adminAddress) public initializer {
      __ERC20_init('VolcanoCoin', 'VULC');
      __Ownable_init();
      __UUPSUpgradeable_init();
      _mint(msg.sender, 10000);
      adminAddress = _adminAddress;
      defaultPaymentType = PaymentType.UNKNOWN;
      version = 44;
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    function changeTokenSupply() public onlyOwner {
        _mint(msg.sender, 1000);
    }

    function getBalance() public view returns (uint256) {
        return balanceOf(msg.sender);
    }
    
    function mintTokensToOwner() public onlyOwner {
        _mint(msg.sender, 1000);
    }

    event PaymentRecord(uint256 _amount, address _recipient);
    mapping(address => Payment[]) private payments;

    function transferFrom(address _sender, address _receiver, uint256 _amountTokens) public override returns (bool) {
        require(_amountTokens > 0, "Amount must be > 0");
        require(_amountTokens <= balanceOf(_sender));

        transfer(_receiver, _amountTokens);
    
        createPaymentRecord(_sender, _receiver, _amountTokens, "");
        emit Transfer(_sender, _receiver, _amountTokens);
        emit PaymentRecord(_amountTokens, _receiver);

        return true;
    }

    function createPaymentRecord(address _sender, address _receiver, uint256 _input, string memory _comment) private returns (bool) {
        payments[_sender].push(Payment({
          recipient: _receiver,
          transferAmount: _input,
          paymentId: paymentId,
          timestamp: block.timestamp,
          paymentType: defaultPaymentType,
          comment: _comment
        }));
        paymentId++;
        return true;
    }

    function getPayments(address _user) public view returns (Payment[] memory) {
        return payments[_user];
    }

    function adminUpdatePayment(address _userAddress, uint256 _paymentId, PaymentType _paymentType, string memory _comment) public returns (bool) {
        require(msg.sender == adminAddress, "Only admin addres can execute this function");
        privateUpdatePayment(_userAddress, _paymentId, _paymentType, _comment);
        return true;
    }

    function updatePayment(uint256 _paymentId, PaymentType _paymentType, string memory _comment) public returns (bool) {
        privateUpdatePayment(msg.sender, _paymentId, _paymentType, _comment);
        return true;
    }

    function privateUpdatePayment(address _userAddress, uint256 _paymentId, PaymentType _paymentType, string memory _comment) private {
        // Compare hashes
        require(keccak256(abi.encodePacked(_comment)) != keccak256(abi.encodePacked("")), "Comment can not be empty");

        require(_paymentId <= paymentId, "Payment ID is wrong");
        require(uint8(_paymentType) <= 4, "Invalid Payment Type");

        for (uint i = 0; i < payments[_userAddress].length; i++) {
            if (payments[_userAddress][i].paymentId == _paymentId) {
                payments[_userAddress][i].paymentType = _paymentType;
                payments[_userAddress][i].comment = _comment;
            }
        }
    }
}
