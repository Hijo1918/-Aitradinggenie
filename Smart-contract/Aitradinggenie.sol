//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Aitradinggenie {
    address public owner;

        event TradeExecuted(
        address indexed user,
        string symbol,
        string side,
        uint256 entry,
        uint256 stop,
        uint256 takeProfit,
        uint256 positionSize
    );

       event ProfitSplit(
        address indexed user,
        uint256 userProfit,
        uint256 adminProfit
    );

       .constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

function executeTrade(
        string memory symbol,
        string memory side,
        uint256 positionSize,
        uint256 entry,
        uint256 stop,
        uint256 takeProfit
    ) external onlyOwner {
        emit TradeExecuted(msg.sender, symbol, side, entry, stop, takeProfit, positionSize);
    }

    function distributeProfit(address user, uint256 totalProfit) external onlyOwner {
        require(totalProfit > 0, "No profit to split");
        uint256 adminShare = (totalProfit * 80) / 100;
        uint256 userShare = totalProfit - adminShare;
        emit ProfitSplit(user, userShare, adminShare);
    }
}
