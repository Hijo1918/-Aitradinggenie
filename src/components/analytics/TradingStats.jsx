import React from 'react';

const TradingStats = () => {
  const stats = [
    {
      title: 'Total Trades',
      value: '1,247',
      change: '+23',
      changeType: 'positive',
      icon: 'Target',
      period: 'this month',
    },
    {
      title: 'Win Rate',
      value: '73.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: 'TrendingUp',
      period: 'vs last month',
    },
    {
      title: 'Avg Hold Time',
      value: '4.2h',
      change: '-0.8h',
      changeType: 'positive',
      icon: 'Clock',
      period: 'vs last month',
    },
    {
      title: 'Max Drawdown',
      value: '8.5%',
      change: '-1.2%',
      changeType: 'positive',
      icon: 'TrendingDown',
      period: 'improvement',
    },
    {
      title: 'Profit Factor',
      value: '2.34',
      change: '+0.12',
      changeType: 'positive',
      icon: 'TrendingUp',
      period: 'vs last month',
    },
    {
      title: 'Sharpe Ratio',
      value: '1.87',
      change: '+0.05',
      changeType: 'positive',
      icon: 'Target',
      period: 'vs last month',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="card bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div
              className={`p-3 rounded-lg ${
                stat.changeType === 'positive' ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <span
                className={`w-6 h-6 ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}
              >
                [{stat.icon}]
              </span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span
              className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {stat.change}
            </span>
            <span className="text-xs text-gray-500">{stat.period}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TradingStats;
