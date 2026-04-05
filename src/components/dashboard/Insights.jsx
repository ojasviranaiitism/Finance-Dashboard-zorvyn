import React from 'react';
import GlowCard from '../ui/GlowCard';

const Insights = () => (
  <GlowCard color="emerald" className="col-span-12 lg:col-span-8">
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Financial Insights</h3>
        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-wider dark:bg-emerald-500/10 dark:text-emerald-400">
          Updated 1h ago
        </span>
      </div>

      <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 gap-6">

        {/* Column 1: Highest Spending */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500 dark:bg-red-500/10 dark:text-red-400">
              <span className="material-symbols-outlined text-lg">trending_up</span>
            </div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-tight dark:text-gray-400">Highest Spending</span>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">Rent & Living</p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">42% of total monthly expenses</p>
          </div>
        </div>

        {/* Column 2: Monthly Comparison */}
        <div className="space-y-3 min-[500px]:border-l md:border-x border-gray-100 min-[500px]:pl-6 md:px-6 transition-colors dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 dark:bg-blue-500/10 dark:text-blue-400">
              <span className="material-symbols-outlined text-lg">compare_arrows</span>
            </div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-tight dark:text-gray-400">Monthly Comparison</span>
          </div>
          <div>
            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">-12.5%</p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">Spent less than previous month</p>
          </div>
        </div>

        {/* Column 3: Savings Progress */}
        <div className="space-y-3 border-t border-gray-100 pt-6 min-[500px]:col-span-2 md:col-span-1 min-[500px]:pt-6 md:pt-0 md:border-t-0 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400">
              <span className="material-symbols-outlined text-lg">track_changes</span>
            </div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-tight dark:text-gray-400">Savings Progress</span>
          </div>
          <div>
            <div className="flex items-end justify-between mb-1">
              <p className="text-lg font-bold text-gray-900 dark:text-white">85%</p>
              <p className="text-[10px] font-bold text-emerald-500 dark:text-emerald-400">On track</p>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 dark:bg-emerald-400 h-full w-[85%] transition-all duration-700"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </GlowCard>
);

export default Insights;