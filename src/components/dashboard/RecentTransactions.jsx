import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import useFinanceStore from '../../store/useFinanceStore';
import GlowCard from '../ui/GlowCard';

const RecentTransactions = () => {
    // Access transactions from global store
    const { transactions } = useFinanceStore();

    // Memoized sorting and slicing for performance
    const recent = useMemo(() => {
        return [...transactions]
            .sort((a, b) => {
                // 1. Sort by date (newest first)
                const dateA = Date.parse(a.date);
                const dateB = Date.parse(b.date);

                if (dateA !== dateB) {
                    return dateB - dateA;
                }

                // 2. Tie-breaker: sort by ID (useful if multiple entries share same date)
                return b.id.localeCompare(a.id);
            })
            .slice(0, 5); // keep only latest 5 transactions
    }, [transactions]);

    // Format currency with absolute value and 2 decimal places
    const formatCurrency = (val) =>
        '$' + Math.abs(val).toLocaleString('en-US', { minimumFractionDigits: 2 });

    return (
        <GlowCard color="default" className="h-full flex flex-col">
            <div className="p-6 flex flex-col h-full">

                {/* Header section */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Recent Transactions
                    </h3>

                    {/* Link to full transactions page */}
                    <Link
                        to="/transactions"
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors dark:text-emerald-400 dark:hover:text-emerald-300 uppercase tracking-wider"
                    >
                        View All
                    </Link>
                </div>

                {/* Transactions list */}
                <div className="flex-1 flex flex-col justify-between space-y-4">
                    {recent.map((tx) => {
                        const isIncome = tx.amount > 0; // determine transaction type

                        return (
                            <div key={tx.id} className="flex items-center justify-between group">

                                {/* Left: icon + details */}
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${isIncome
                                                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                : 'bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400'
                                            }`}
                                    >
                                        <span className="material-symbols-outlined text-[22px] font-bold">
                                            {isIncome ? 'north_east' : 'south_west'}
                                        </span>
                                    </div>

                                    <div>
                                        {/* Category name */}
                                        <p className="text-sm font-bold text-gray-900 dark:text-gray-100 leading-tight">
                                            {tx.category}
                                        </p>

                                        {/* Transaction date */}
                                        <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 mt-0.5">
                                            {tx.date}
                                        </p>
                                    </div>
                                </div>

                                {/* Right: amount */}
                                <span
                                    className={`text-sm font-bold tabular-nums ${isIncome
                                            ? 'text-emerald-600 dark:text-emerald-400'
                                            : 'text-gray-900 dark:text-white'
                                        }`}
                                >
                                    {isIncome ? '+' : '-'}
                                    {formatCurrency(tx.amount)}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </GlowCard>
    );
};

export default RecentTransactions;