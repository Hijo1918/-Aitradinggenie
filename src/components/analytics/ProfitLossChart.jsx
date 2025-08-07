import React from 'react';

const ProfitLossChart = () => {
  const data = [
    { date: '2024-01-01', cumulative: 0, daily: 0 },
    { date: '2024-01-02', cumulative: 150, daily: 150 },
    { date: '2024-01-03', cumulative: 280, daily: 130 },
    { date: '2024-01-04', cumulative: 220, daily: -60 },
    { date: '2024-01-05', cumulative: 380, daily: 160 },
    { date: '2024-01-06', cumulative: 450, daily: 70 },
    { date: '2024-01-07', cumulative: 520, daily: 70 },
    { date: '2024-01-08', cumulative: 680, daily: 160 },
    { date: '2024-01-09', cumulative: 620, daily: -60 },
    { date: '2024-01-10', cumulative: 780, daily: 160 },
  ];

  return (
    <div className="card bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Profit & Loss Chart</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
            <span className="text-sm text-gray-600">Cumulative P&L</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Daily P&L</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        ```chartjs
        {
          "type": "line",
          "data": {
            "labels": ["Jan 1", "Jan 2", "Jan 3", "Jan 4", "Jan 5", "Jan 6", "Jan 7", "Jan 8", "Jan 9", "Jan 10"],
            "datasets": [
              {
                "label": "Cumulative P&L",
                "data": [0, 150, 280, 220, 380, 450, 520, 680, 620, 780],
                "borderColor": "#3b82f6",
                "backgroundColor": "#3b82f6",
                "borderWidth": 3,
                "pointRadius": 0,
                "pointHoverRadius": 4,
                "pointHoverBackgroundColor": "#3b82f6",
                "tension": 0.4
              },
              {
                "label": "Daily P&L",
                "data": [0, 150, 130, -60, 160, 70, 70, 160, -60, 160],
                "borderColor": "#22c55e",
                "backgroundColor": "#22c55e",
                "borderWidth": 2,
                "pointRadius": 0,
                "pointHoverRadius": 3,
                "pointHoverBackgroundColor": "#22c55e",
                "tension": 0.4
              }
            ]
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
                  "title": function(tooltipItems) {
                    return new Date("2024-01-" + (tooltipItems[0].dataIndex + 1).toString().padStart(2, "0")).toLocaleDateString();
                  },
                  "label": function(context) {
                    return `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`;
                  }
                }
              }
            }
          }
        }
        ```
      </div>
    </div>
  );
};

export default ProfitLossChart;
