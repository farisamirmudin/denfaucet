// contracts/Den.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract Den is ERC20Capped {
    address payable owner;
    uint256 blockReward;
    constructor(uint256 _cap, uint _blockReward) ERC20("Den", "DEN") ERC20Capped(_cap * (10 ** decimals())) {
        owner = payable(msg.sender);
        blockReward = _blockReward * (10 ** decimals());
        _mint(owner, 7000000 * (10 ** decimals()));
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function setBlockReward(uint256 _blockReward) public onlyOwner {
        blockReward = _blockReward * (10 ** decimals());
    }

    function _mintMinerReward() internal {
        _mint(block.coinbase, blockReward);
    }

    function _beforeTokenTransfer(address from, address to, uint256 value) internal virtual override {
        if (from != address(0) && block.coinbase != address(0) && to != block.coinbase) {
            _mintMinerReward();
        }
        super._beforeTokenTransfer(from, to, value);
    }

    function destroy() public onlyOwner {
        selfdestruct(owner);
    }

    function getOwner() public view returns (address payable) {
        return owner;
    }

    function getBlockReward() public view returns (uint256) {
        return blockReward;
    }
}

