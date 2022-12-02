// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
interface IERC20 {
  function transfer(address to, uint256 amount) external returns (bool);
  function balanceOf(address account) external view returns (uint256);
  event Transfer(address indexed from, address indexed to, uint256 value);
}
contract DenFaucet {
  address payable owner;
  IERC20 token;
  uint256 public withdrawalAmount = 50 * (10 ** 18);
  uint256 public lockTime = 5 minutes;
  mapping(address => uint256) nextAllowedRequest;

  event Deposit(address indexed from, uint256 amount);
  event Withdraw(address account, uint256 amount);

  constructor(address _token) {
    token = IERC20(_token);
    owner = payable(msg.sender);
  }
  function requestToken() external {
    require(msg.sender != address(0), "Invalid address");
    require(token.balanceOf(address(this)) >= withdrawalAmount, "Insufficient token");
    require(block.timestamp >= nextAllowedRequest[msg.sender], "50 DEN/day");
    nextAllowedRequest[msg.sender] = block.timestamp + lockTime;
    token.transfer(msg.sender, withdrawalAmount);
  }
  receive() external payable {
    emit Deposit(msg.sender, msg.value);
  }
  function getBalance() external view returns (uint256) {
    return token.balanceOf(address(this));
  }
  function setWithdrawalAmount(uint256 _withdrawalAmount) external onlyOwner {
    withdrawalAmount = _withdrawalAmount * (10 ** 18);
  }
  function setLockTime(uint256 _lockTime) external onlyOwner {
    lockTime = _lockTime * 1 minutes;
  }
  function withdraw() external onlyOwner {
    emit Withdraw(msg.sender, token.balanceOf(address(this)));
    token.transfer(msg.sender, token.balanceOf(address(this)));
  }
  modifier onlyOwner {
    require(msg.sender == owner, "Only owner can call this function");
    _;
  }
}