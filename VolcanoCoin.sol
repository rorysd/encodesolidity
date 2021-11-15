//SPDX-License-Identifier: UNLICENSED

contract VolcanoCoin {
    
    mapping(address => uint256) private _balances;
    mapping(address => Payment[]) private _payments;
    
    uint256 private _totalSupply = 10000;
    address owner;
    
    struct Payment {
        address paymentRecipient;
        uint paymentAmount;
    }
    
    event SupplyIncreased(uint _newSupply);
    event TransactionSuccess(uint transactionAmount, address transactionAddress);
    
    constructor(){
        owner = msg.sender;
        _balances[owner] = _totalSupply;
    }
    
    modifier onlyOwner {
        if (msg.sender == owner) {
            _;
        }
    }
    
    function getPayments (address account) public view virtual returns (Payment[] memory) {
        return _payments[account];
    }
    
    function balanceOf(address account) public view virtual returns (uint256) {
        return _balances[account];
    }
    
    function getSupply() public view returns (uint) {
        return _totalSupply;
    }
    
    function increaseSupply() public onlyOwner {
        _totalSupply += 1000;
        _balances[owner] = _totalSupply;
        emit SupplyIncreased(_totalSupply);
    }
    
    function transfer(address recipient, uint256 amount) public virtual returns (bool) {
        
        if (amount <= _balances[msg.sender]){
            _balances[msg.sender] = _balances[msg.sender] -= amount;
            _balances[recipient] = _balances[recipient] += amount;
            _payments[msg.sender].push(
                Payment({
                paymentRecipient: recipient,
                paymentAmount: amount
            }));
            emit TransactionSuccess(amount, recipient);
            return true;
        } else {
            return false;
        }
    }
}