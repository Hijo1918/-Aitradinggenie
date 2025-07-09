import React from 'react';

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle?: string;
  valueColor?: string;
  trend?: string;
  trendColor?: string;
}
const DashboardCard: React.FC<DashboardCardProps> = ({
  icon, title, value, subtitle, valueColor, trend, trendColor
}) => (
  <div className="bg-[#202838] rounded-xl p-4 flex flex-col gap-2 min-w-[200px]">
    <div className="flex items-center gap-2">
      <span className="text-2xl">{icon}</span>
      <span className="text-base font-medium text-gray-300">{title}</span>
    </div>
    <div className="text-2xl font-bold" style={{ color: valueColor }}>{value}</div>
    {trend && <div className="text-sm" style={{ color: trendColor }}>{trend}</div>}
    {subtitle && <div className="text-xs text-gray-400">{subtitle}</div>}
  </div>
);
export default DashboardCard;
