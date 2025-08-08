// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title AI Trading Genie Smart Contract
 * @dev Handles trading operations, profit sharing, and user funds management
 */
contract AITradingGenie is Ownable, ReentrancyGuard, Pausable {
    // Events
    event TradeExecuted(address indexed user, string symbol, uint256 amount, int256 profit, uint256 timestamp);
    event ProfitDistributed(address indexed user, uint256 amount, uint256 timestamp);
    event Deposit(address indexed user, uint256 amount, uint256 timestamp);
    event Withdrawal(address indexed user, uint256 amount, uint256 timestamp);

    // Structs
    struct UserBalance {
        uint256 totalBalance;
        uint256 availableBalance;
        uint256 lockedBalance;
        uint256 totalProfit;
        uint256 totalLoss;
        uint256 lastTradeTimestamp;
    }

    struct TradeRecord {
        string symbol;
        uint256 amount;
        int256 profit;
        uint256 timestamp;
        bool isActive;
    }

    // State variables
    mapping(address => UserBalance) public userBalances;
    mapping(address => TradeRecord[]) public userTrades;
    mapping(address => bool) public authorizedTraders;
    mapping(address => bool) internal hasDeposited;

    uint256 public totalValueLocked;
    uint256 public totalUsers;
    uint256 public platformFeePercentage = 100; // 1%
    uint256 public constant MAX_FEE = 1000; // 10%

    // Modifiers
    modifier onlyAuthorizedTrader() {
        require(authorizedTraders[msg.sender] || msg.sender == owner(), "Not authorized");
        _;
    }

    constructor() {
        authorizedTraders[msg.sender] = true;
    }

    /**
     * @dev Deposit ETH into the platform
     */
    function deposit() external payable nonReentrant whenNotPaused {
        require(msg.value > 0, "Deposit must be > 0");

        UserBalance storage balance = userBalances[msg.sender];
        balance.totalBalance += msg.value;
        balance.availableBalance += msg.value;

        totalValueLocked += msg.value;

        if (!hasDeposited[msg.sender]) {
            hasDeposited[msg.sender] = true;
            totalUsers += 1;
        }

        emit Deposit(msg.sender, msg.value, block.timestamp);
    }

    /**
     * @dev Withdraw available balance
     */
    function withdraw(uint256 amount) external nonReentrant whenNotPaused {
        UserBalance storage balance = userBalances[msg.sender];
        require(amount > 0, "Amount must be > 0");
        require(balance.availableBalance >= amount, "Insufficient balance");

        balance.availableBalance -= amount;
        balance.totalBalance -= amount;
        totalValueLocked -= amount;

        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Withdraw failed");

        emit Withdrawal(msg.sender, amount, block.timestamp);
    }

    /**
     * @dev Authorize a trade (only by trader)
     */
    function executeTrade(address user, string memory symbol, uint256 amount, int256 profit)
        external onlyAuthorizedTrader nonReentrant whenNotPaused
    {
        require(user != address(0), "Invalid user");
        require(amount > 0, "Amount must be > 0");

        UserBalance storage balance = userBalances[user];
        require(balance.availableBalance >= amount, "Insufficient funds");

        balance.availableBalance -= amount;
        balance.lockedBalance += amount;

        userTrades[user].push(TradeRecord({
            symbol: symbol,
            amount: amount,
            profit: profit,
            timestamp: block.timestamp,
            isActive: true
        }));

        emit TradeExecuted(user, symbol, amount, profit, block.timestamp);
    }

    /**
     * @dev Finalize a trade and distribute profit/loss
     */
    function settleTrade(address user, uint256 tradeIndex, int256 finalProfit)
        external onlyAuthorizedTrader nonReentrant whenNotPaused
    {
        require(user != address(0), "Invalid user");
        require(tradeIndex < userTrades[user].length, "Invalid index");

        TradeRecord storage trade = userTrades[user][tradeIndex];
        require(trade.isActive, "Already settled");

        UserBalance storage balance = userBalances[user];

        balance.lockedBalance -= trade.amount;

        if (finalProfit > 0) {
            uint256 profitAmount = uint256(finalProfit);
            uint256 platformFee = (profitAmount * platformFeePercentage) / 10000;
            uint256 userProfit = profitAmount - platformFee;

            balance.availableBalance += trade.amount + userProfit;
            balance.totalProfit += userProfit;

            emit ProfitDistributed(user, userProfit, block.timestamp);
        } else if (finalProfit < 0) {
            uint256 lossAmount = uint256(-finalProfit);
            if (lossAmount >= trade.amount) {
                balance.totalLoss += trade.amount;
                // nothing returned
            } else {
                balance.availableBalance += (trade.amount - lossAmount);
                balance.totalLoss += lossAmount;
            }
        } else {
            // Break-even
            balance.availableBalance += trade.amount;
        }

        trade.isActive = false;
        trade.profit = finalProfit;
        balance.lastTradeTimestamp = block.timestamp;
    }

    /**
     * @dev Owner can withdraw platform fees
     */
    function withdrawPlatformFees() external onlyOwner nonReentrant {
        uint256 contractBal = address(this).balance;
        require(contractBal > totalValueLocked, "No fees available");

        uint256 fees = contractBal - totalValueLocked;

        (bool success, ) = payable(owner()).call{value: fees}("");
        require(success, "Withdraw failed");
    }

    // Admin Functions
    function addAuthorizedTrader(address trader) external onlyOwner {
        require(trader != address(0), "Invalid address");
        authorizedTraders[trader] = true;
    }

    function removeAuthorizedTrader(address trader) external onlyOwner {
        authorizedTraders[trader] = false;
    }

    function setPlatformFee(uint256 newFee) external onlyOwner {
        require(newFee <= MAX_FEE, "Fee exceeds max");
        platformFeePercentage = newFee;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    // Read Functions
    function getUserBalance(address user) external view returns (UserBalance memory) {
        return userBalances[user];
    }

    function getUserTradeCount(address user) external view returns (uint256) {
        return userTrades[user].length;
    }

    function getUserTrade(address user, uint256 index) external view returns (TradeRecord memory) {
        require(index < userTrades[user].length, "Invalid index");
        return userTrades[user][index];
    }

    function getContractStats() external view returns (
        uint256 _totalValueLocked,
        uint256 _totalUsers,
        uint256 _platformFeePercentage
    ) {
        return (totalValueLocked, totalUsers, platformFeePercentage);
    }

    // Fallback
    receive() external payable {
        deposit();
    }
}
