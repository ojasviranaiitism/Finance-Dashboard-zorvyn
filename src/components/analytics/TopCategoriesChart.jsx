import React, { useMemo } from 'react';
import useFinanceStore from '../../store/useFinanceStore';
import GlowCard from '../ui/GlowCard';

// Configuration for category styles (icon + colors for UI consistency)
const CATEGORY_CONFIG = {
    'Housing': { icon: 'home', color: 'bg-blue-500', lightBg: 'bg-blue-50', textColor: 'text-blue-600', darkText: 'dark:text-blue-400', darkBg: 'dark:bg-blue-500/10' },
    'Food': { icon: 'local_cafe', color: 'bg-emerald-500', lightBg: 'bg-emerald-50', textColor: 'text-emerald-600', darkText: 'dark:text-emerald-400', darkBg: 'dark:bg-emerald-500/10' },
    'Groceries': { icon: 'shopping_cart', color: 'bg-emerald-500', lightBg: 'bg-emerald-50', textColor: 'text-emerald-600', darkText: 'dark:text-emerald-400', darkBg: 'dark:bg-emerald-500/10' },
    'Shopping': { icon: 'local_mall', color: 'bg-amber-500', lightBg: 'bg-amber-50', textColor: 'text-amber-600', darkText: 'dark:text-amber-400', darkBg: 'dark:bg-amber-500/10' },
    'Amazon Delivery': { icon: 'package_2', color: 'bg-amber-500', lightBg: 'bg-amber-50', textColor: 'text-amber-600', darkText: 'dark:text-amber-400', darkBg: 'dark:bg-amber-500/10' },
    'Transport': { icon: 'directions_car', color: 'bg-purple-500', lightBg: 'bg-purple-50', textColor: 'text-purple-600', darkText: 'dark:text-purple-400', darkBg: 'dark:bg-purple-500/10' },
    'Entertainment': { icon: 'movie', color: 'bg-rose-500', lightBg: 'bg-rose-50', textColor: 'text-rose-600', darkText: 'dark:text-rose-400', darkBg: 'dark:bg-rose-500/10' },
    'Healthcare': { icon: 'medical_services', color: 'bg-cyan-500', lightBg: 'bg-cyan-50', textColor: 'text-cyan-600', darkText: 'dark:text-cyan-400', darkBg: 'dark:bg-cyan-500/10' },
    'Other': { icon: 'payments', color: 'bg-gray-500', lightBg: 'bg-gray-50', textColor: 'text-gray-600', darkText: 'dark:text-gray-400', darkBg: 'dark:bg-gray-500/10' }
};

const TopCategoriesChart = () => {
    // Access transactions from global store
    const { transactions } = useFinanceStore();

    // Process and memoize category data
    const processedData = useMemo(() => {
        const categoryTotals = {};
        let totalExpenseAmount = 0;

        // Aggregate only expense transactions (negative amounts)
        transactions.forEach(tx => {
            if (tx.amount < 0) {
                const category = tx.category || 'Other';
                const amount = Math.abs(tx.amount);

                // Sum per category
                categoryTotals[category] = (categoryTotals[category] || 0) + amount;
                totalExpenseAmount += amount;
            }
        });

        // Convert aggregated object into array with UI config
        const categoriesArray = Object.keys(categoryTotals).map(name => {
            const config = CATEGORY_CONFIG[name] || CATEGORY_CONFIG['Other'];
            return {
                name,
                amount: categoryTotals[name],
                ...config
            };
        });

        // Sort by highest spending and keep top 5 categories
        const topFive = categoriesArray
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 5);

        // Add percentage share for each category
        return topFive.map(item => ({
            ...item,
            percentage: totalExpenseAmount > 0
                ? Math.round((item.amount / totalExpenseAmount) * 100)
                : 0
        }));
    }, [transactions]);

    return (
        <GlowCard color="default" className="h-full w-full">
            <div className="p-6 h-full w-full flex flex-col">
                {/* Card title */}
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
                    Spending by Category
                </h3>

                <div className="flex-1 flex flex-col justify-between mt-4 overflow-y-auto pr-1 thin-scrollbar">
                    {/* Empty state */}
                    {processedData.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-sm italic">
                            No expense data found
                        </div>
                    ) : (
                        // Render top categories
                        processedData.map((category) => (
                            <div key={category.name} className="flex flex-col gap-2.5">
                                <div className="flex items-center justify-between">
                                    {/* Left: icon + category name */}
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${category.lightBg} ${category.darkBg}`}>
                                            <span className={`material-symbols-outlined text-[20px] ${category.textColor} ${category.darkText}`}>
                                                {category.icon}
                                            </span>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            {category.name}
                                        </span>
                                    </div>

                                    {/* Right: amount + percentage */}
                                    <div className="text-right">
                                        <span className="text-xs text-gray-400 block dark:text-gray-500">
                                            ${category.amount.toLocaleString()}
                                        </span>
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                                            {category.percentage}%
                                        </span>
                                    </div>
                                </div>

                                {/* Progress bar representing percentage */}
                                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
                                    <div
                                        className={`${category.color} h-1.5 rounded-full transition-all duration-1000 ease-out`}
                                        style={{ width: `${category.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </GlowCard>
    );
};

export default TopCategoriesChart;