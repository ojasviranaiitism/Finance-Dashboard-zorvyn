import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useExpenseBreakdownData } from '../../hooks/useExpenseBreakdownData';
import GlowCard from '../ui/GlowCard';

// Color palette for pie chart segments
const COLORS = ['#10b981', '#3b82f6', '#fb923c', '#065f46', '#8b5cf6', '#f43f5e'];

// Custom tooltip for displaying category name and formatted value
const CustomTooltip = ({ active, payload }) => {
  // Render only when tooltip is active and has data
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
        <p className="text-xs font-bold text-gray-700 dark:text-gray-100">
          {payload[0].name}
        </p>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          ${payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
      </div>
    );
  }
  return null;
};

const ExpenseBreakdown = () => {
  // Fetch processed expense data (category-wise)
  const data = useExpenseBreakdownData();

  return (
    /* 
       Responsive height handling:
       - h-auto for mobile (content defines height)
       - sm:h-full for proper grid alignment on larger screens
    */
    <GlowCard color="default" className="h-auto sm:h-full w-full flex-shrink-0">
      <div className="p-6 flex flex-col h-full">

        {/* Header section */}
        <div className="flex justify-between items-start mb-6 shrink-0">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Expense Breakdown
          </span>

          {/* Action button (e.g., more options) */}
          <button className="text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer">
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>

        {/* Main content: chart + legend */}
        <div className="flex-1 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-8 w-full min-h-fit">

          {/* Pie chart container */}
          <div className="relative w-48 h-48 flex-shrink-0">
            <ResponsiveContainer width="99%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}   // donut hole size
                  outerRadius={85}   // overall size
                  paddingAngle={4}   // spacing between slices
                  dataKey="value"
                  stroke="none"
                >
                  {/* Render each slice with cyclic colors */}
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                {/* Tooltip on hover */}
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend list */}
          {/* 
             Responsive scroll behavior:
             - No max height on mobile
             - Limited height with scroll on larger screens
          */}
          <div className="w-full sm:flex-1 space-y-3 max-h-none sm:max-h-48 overflow-y-auto pr-2 thin-scrollbar">
            {data.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-3">

                {/* Color indicator */}
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>

                {/* Category name + value */}
                <div className="flex-1 flex justify-between items-center text-sm min-w-0 gap-2">
                  <span
                    className="text-gray-500 truncate dark:text-gray-400"
                    title={entry.name}
                  >
                    {entry.name}
                  </span>

                  <span className="font-semibold text-gray-700 dark:text-gray-200 shrink-0">
                    ${Math.round(entry.value).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </GlowCard>
  );
};

export default ExpenseBreakdown;