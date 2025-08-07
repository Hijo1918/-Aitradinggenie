import React from 'react';

const PerformanceBreakdown = () => {
  const monthlyData = [
    { month: 'Jan', profit: 1250, trades: 45 },
    { month: 'Feb', profit: 890, trades: 38 },
    { month: 'Mar', profit: 1680, trades: 52 },
    { month: 'Apr', profit: 2100, trades: 61 },
    { month: 'May', profit: 1450, trades: 47 },
    { month: 'Jun', profit: 1920, trades: 55 },
  ];

  const assetData = [
    { name: 'BTC', value: 45, profit: 3200 },
    { name: 'ETH', value: 30, profit: 2100 },
    { name: 'ADA', value: 15, profit: 890 },
    { name: 'SOL', value: 10, profit: 650 },
  ];

  const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Performance</h3>
        <div className="h-64">
          ```chartjs
          {
            "type": "bar",
            "data": {
              "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              "datasets": [{
                "label": "Profit",
                "data": [1250, 890, 1680, 2100, 1450, 1920],
                "backgroundColor": "#3b82f6",
                "borderColor": "#3b82f6",
                "borderWidth": 1,
                "borderRadius": 4
              }]
            },
            "options": {
              "responsive": true,
              "maintainAspectRatio": false,
              "scales": {
                "x": {
                  "grid": {
                    "display": false
                  },
                  "ticks": {
                    "color": "#6b7280",
                    "font": {
                      "size": 12
                    }
                  }
                },
                "y": {
                  "grid": {
                    "color": "#f0f0f0",
                    "borderDash": [3, 3]
                  },
                  "ticks": {
                    "color": "#6b7280",
                    "font": {
                      "size": 12
                    },
                    "callback": function(value) {
                      return "$" + value;
                    }
                  }
                }
              },
              "plugins": {
                "tooltip": {
                  "backgroundColor": "#ffffff",
                  "titleColor": "#374151",
                  "bodyColor": "#374151",
                  "borderColor": "#e5e7eb",
                  "borderWidth": 1,
                  "cornerRadius": 8,
                  "boxShadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  "callbacks": {
                    "label": function(context) {
                      return "Profit: $" + context.parsed.y;
                    }
                  }
                }
              }
            }
          }
          ```
        </div>
      </div>

      <div className="card bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Asset Distribution</h3>
        <div className="h-64">
          ```chartjs
          {
            "type": "pie",
            "data": {
              "labels": ["BTC", "ETH", "ADA", "SOL"],
              "datasets": [{
                "data": [45, 30, 15, 10],
                "backgroundColor": ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"],
                "borderColor": ["#ffffff", "#ffffff", "#ffffff", "#ffffff"],
                "borderWidth": 2
              }]
            },
            "options": {
              "responsive": true,
              "maintainAspectRatio": false,
              "plugins": {
                "tooltip": {
                  "backgroundColor": "#ffffff",
                  "titleColor": "#374151",
                  "bodyColor": "#374151",
                  "borderColor": "#e5e7eb",
                  "borderWidth": 1,
                  "cornerRadius": 8,
                  "boxShadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  "callbacks": {
                    "label": function(context) {
                      const index = context.dataIndex;
                      const profit = [3200, 2100, 890, 650][index];
                      return `${context.label}: ${context.parsed}% ($${profit})`;
                    }
                  }
                }
              }
            }
          }
          ```
        </div>
        <div className="mt-4 space-y-2">
          {assetData.map((asset, index) => (
            <div key={asset.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                ></div>
                <span className="text-sm font-medium text-gray-900">{asset.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{asset.value}%</div>
                <div className="text-xs text-gray-600">${asset.profit}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceBreakdown;
