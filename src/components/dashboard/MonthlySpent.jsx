import React, { useMemo } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import useFinanceStore from '../../store/useFinanceStore';
import GlowCard from '../ui/GlowCard';

const MonthlySpent = ({ amount, change, percent }) => {
  const { transactions } = useFinanceStore();
  const formatCurrency = (val) => '$' + (val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formatChange = (val) => (val >= 0 ? '+' : '-') + '$' + Math.abs(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const isPositive = percent >= 0;

  // Calculate chronological trend data for the sparkline
  const trendData = useMemo(() => {
    const expenses = transactions.filter(tx => tx.amount < 0).sort((a, b) => new Date(a.date) - new Date(b.date));
    let cumulative = 0;
    return expenses.map(tx => {
      cumulative += Math.abs(tx.amount);
      return { value: cumulative };
    });
  }, [transactions]);

  return (
    <GlowCard color="yellow" className="h-full shadow-sm">
      {/* Content Layer with Padding */}
      <div className="p-6 flex flex-col justify-between h-full relative z-10 pointer-events-none">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Spent</h3>
        </div>

        <div className="mb-2">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white tracking-tight">{formatCurrency(amount)}</h2>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-emerald-600 font-medium dark:text-emerald-400">{formatChange(change)}</span>

            <span className={`flex items-center gap-0.5 px-2 py-0.5 rounded text-xs font-bold ${isPositive
              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
              : 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'
              }`}>
              {isPositive ? '+' : ''}{Math.round(percent || 0)}%
              <span className="material-symbols-outlined text-[14px] font-bold">{isPositive ? 'north_east' : 'south_east'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Background Sparkline Layer */}
      <div className="absolute bottom-0 right-0 w-[55%] h-[60%] pointer-events-none z-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="colorYellow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#eab308" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="value" stroke="#eab308" strokeWidth={2} fill="url(#colorYellow)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlowCard>
  );
};

export default MonthlySpent;