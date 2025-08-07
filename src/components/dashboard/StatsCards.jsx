import React from 'react';
import Card from '../components/Card'; // Assuming Card is in src/components/Card.js

const StatsCards = () => {
  const stats = [
    {
      title: 'Total Profit',
      value: '$8,432.50',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'DollarSign',
    },
    {
      title: 'Win Rate',
      value: '73.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: 'TrendingUp',
    },
    {
      title: 'Active Positions',
      value: '5',
      change: '+1',
      changeType: 'positive',
      icon: 'Activity',
    },
    {
      title: 'Daily P&L',
      value: '$245.80',
      change: '-5.2%',
      changeType: 'negative',
      icon: 'TrendingDown',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <p
                className={`text-sm mt-1 ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change} from yesterday
              </p>
            </div>
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
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
