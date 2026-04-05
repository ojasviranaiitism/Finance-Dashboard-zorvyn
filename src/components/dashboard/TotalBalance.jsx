import React from 'react';
import GlowCard from '../ui/GlowCard';

const TotalBalance = ({ amount, change, percent }) => {
  const formatCurrency = (val) => '$' + (val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formatChange = (val) => (val >= 0 ? '+' : '-') + '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const isPositive = percent >= 0;

  return (
    /* Wrap everything in GlowCard. Pass the color and height classes here */
    <GlowCard color="blue" className="h-full shadow-sm">

      {/* Move your padding (p-6) and flex layouts to this inner container */}
      <div className="p-6 flex flex-col justify-between h-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Balance</h3>
          <button className="text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer">
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2 dark:text-white tracking-tight">
            {formatCurrency(amount)}
          </h2>

          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-emerald-600 dark:text-emerald-400">
              {formatChange(change)}
            </span>

            <span className={`flex items-center gap-0.5 px-2 py-0.5 rounded text-xs font-bold ${isPositive
              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
              : 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'
              }`}>
              {isPositive ? '+' : ''}{Math.round(percent || 0)}%
              <span className="material-symbols-outlined text-[14px] font-bold">
                {isPositive ? 'north_east' : 'south_west'}
              </span>
            </span>
          </div>
        </div>
      </div>

    </GlowCard>
  );
};

export default TotalBalance;