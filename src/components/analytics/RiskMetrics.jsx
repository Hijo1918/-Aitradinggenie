import React from 'react';

const RiskMetrics = () => {
  const metrics = [
    {
      title: 'Value at Risk (VaR)',
      value: '$1,250',
      description: '95% confidence, 1-day horizon',
      status: 'good',
      icon: 'Shield',
    },
    {
      title: 'Maximum Drawdown',
      value: '8.5%',
      description: 'Peak to trough decline',
      status: 'warning',
      icon: 'TrendingDown',
    },
    {
      title: 'Volatility',
      value: '12.3%',
      description: 'Annualized standard deviation',
      status: 'good',
      icon: 'Activity',
    },
    {
      title: 'Beta',
      value: '0.85',
      description: 'Correlation with BTC',
      status: 'good',
      icon: 'AlertTriangle',
    },
  ];

  const riskLevels = [
    { label: 'Portfolio Risk', current: 65, max: 100, color: 'blue' },
    { label: 'Concentration Risk', current: 35, max: 100, color: 'green' },
    { label: 'Liquidity Risk', current: 20, max: 100, color: 'green' },
    { label: 'Market Risk', current: 80, max: 100, color: 'yellow' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'warning':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'danger':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="card bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Risk Metrics</h3>
        <div className="flex items-center space-x-2">
          <span className="w-5 h-5 text-primary-600">[Shield]</span>
          <span className="text-sm text-gray-600">Risk Assessment</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Risk Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className={`border rounded-lg p-4 ${getStatusColor(metric.status)}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="w-5 h-5">{`[${metric.icon}]`}</span>
                <span className="text-lg font-bold">{metric.value}</span>
              </div>
              <div className="text-sm font-medium mb-1">{metric.title}</div>
              <div className="text-xs opacity-75">{metric.description}</div>
            </div>
          ))}
        </div>

        {/* Risk Level Indicators */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Risk Level Indicators</h4>
          {riskLevels.map((risk, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{risk.label}</span>
                <span className="font-medium">{risk.current}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    risk.color === 'blue'
                      ? 'bg-blue-500'
                      : risk.color === 'green'
                      ? 'bg-green-500'
                      : risk.color === 'yellow'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${risk.current}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Risk Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <span className="w-5 h-5 text-blue-600 mt-0.5">[Shield]</span>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Risk Assessment Summary</p>
              <p>
                Your portfolio maintains a moderate risk profile with good diversification. Monitor
                market risk levels during volatile periods.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskMetrics;
