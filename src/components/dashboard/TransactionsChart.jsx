import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTransactionChartData } from '../../hooks/useTransactionChartData';
import ChartFilter from './ChartFilter';
import GlowCard from '../ui/GlowCard';

// Custom tooltip to display formatted income and expense values
const CustomTooltip = ({ active, payload, label }) => {
  // Render only when tooltip is active and has data
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
        {/* Date label */}
        <p className="text-xs font-medium text-gray-500 mb-2 dark:text-gray-400">
          {label}
        </p>

        {/* Render income and expense values */}
        {payload.map((entry, index) => (
          <p
            key={index}
            className={`text-sm font-bold ${entry.dataKey === 'income'
                ? 'text-blue-500 dark:text-blue-400'
                : 'text-red-500 dark:text-red-400'
              }`}
          >
            {entry.dataKey === 'income' ? 'Income' : 'Expense'}: $
            {entry.value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const TransactionsChart = () => {
  // State for selected timeframe (default: last 90 days)
  const [timeframe, setTimeframe] = useState(90);

  // Fetch processed chart data based on timeframe
  const chartData = useTransactionChartData(timeframe);

  return (
    <GlowCard color="blue" className="h-auto sm:h-full w-full flex-shrink-0">
      <div className="p-6 flex flex-col h-full">

        {/* Header with title and filter */}
        <div className="flex justify-between items-center mb-8 shrink-0">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Transactions
          </span>

          {/* Timeframe selector */}
          <ChartFilter timeframe={timeframe} setTimeframe={setTimeframe} />
        </div>

        {/* Chart container */}
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="99%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              {/* Gradient definitions for area fills */}
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>

                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>

              {/* Background grid */}
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                className="stroke-gray-200 dark:stroke-gray-800"
              />

              {/* X-axis (dates) */}
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                dy={10}
              />

              {/* Y-axis (currency values) */}
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                dx={-10}
              />

              {/* Tooltip on hover */}
              <Tooltip content={<CustomTooltip />} />

              {/* Income area */}
              <Area
                type="monotone"
                dataKey="income"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorIncome)"
              />

              {/* Expense area */}
              <Area
                type="monotone"
                dataKey="expense"
                stroke="#ef4444"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorExpense)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </GlowCard>
  );
};

export default TransactionsChart;