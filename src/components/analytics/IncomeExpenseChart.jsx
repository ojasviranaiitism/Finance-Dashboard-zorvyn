import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import useFinanceStore from '../../store/useFinanceStore';
import GlowCard from '../ui/GlowCard';

// Custom tooltip to display formatted currency values on hover
const CurrencyTooltip = ({ active, payload, label }) => {
    // Only render tooltip when active and data is available
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700 transition-colors">
                {/* Month label */}
                <p className="text-xs font-bold text-gray-700 mb-2 dark:text-gray-100">{label}</p>

                {/* Render each data entry (income/expenses) */}
                {payload.map((entry, index) => (
                    <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
                        {entry.name}: ${entry.value.toLocaleString()}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const IncomeExpenseChart = () => {
    // Get transactions from global store
    const { transactions } = useFinanceStore();

    // Memoized transformation of transaction data into chart format
    const chartData = useMemo(() => {
        const last6Months = [];
        const now = new Date();

        // Initialize last 6 months with default values
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            last6Months.push({
                month: d.toLocaleString('default', { month: 'short' }), // e.g., Jan, Feb
                monthIndex: d.getMonth(),
                year: d.getFullYear(),
                income: 0,
                expenses: 0
            });
        }

        // Aggregate transactions into corresponding month buckets
        transactions.forEach(tx => {
            const txDate = new Date(tx.date);

            // Find matching month slot
            const monthSlot = last6Months.find(slot =>
                slot.monthIndex === txDate.getMonth() && slot.year === txDate.getFullYear()
            );

            if (monthSlot) {
                // Positive = income, Negative = expense
                if (tx.amount > 0) {
                    monthSlot.income += tx.amount;
                } else {
                    monthSlot.expenses += Math.abs(tx.amount);
                }
            }
        });

        return last6Months;
    }, [transactions]);

    return (
        <GlowCard color="default" className="w-full h-full min-h-[350px]">
            <div className="p-6 h-full w-full flex flex-col">
                {/* Chart title */}
                <h3 className="text-sm font-bold text-gray-900 mb-6 dark:text-white">
                    Income vs Expenses (Live Data)
                </h3>

                {/* Ensures chart never collapses on small screens */}
                <div className="flex-1 w-full min-h-[250px]">

                    {/* Responsive container fixes width/height issues in Recharts */}
                    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                        <BarChart data={chartData} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>

                            {/* Background grid */}
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                className="stroke-gray-100 dark:stroke-gray-800"
                            />

                            {/* X-axis: months */}
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: '#9ca3af' }}
                                dy={10}
                            />

                            {/* Y-axis: formatted currency */}
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: '#9ca3af' }}
                                tickFormatter={(val) =>
                                    `$${val >= 1000 ? (val / 1000).toFixed(1) + 'k' : val}`
                                }
                            />

                            {/* Tooltip with custom component */}
                            <Tooltip
                                content={<CurrencyTooltip />}
                                cursor={{ fill: 'currentColor', className: 'text-gray-50/50 dark:text-gray-800/40' }}
                            />

                            {/* Legend for Income vs Expenses */}
                            <Legend
                                verticalAlign="top"
                                align="right"
                                iconType="circle"
                                wrapperStyle={{ fontSize: '11px', paddingBottom: '20px', right: 0 }}
                            />

                            {/* Income bars */}
                            <Bar
                                dataKey="income"
                                name="Income"
                                fill="#10b981"
                                radius={[4, 4, 0, 0]}
                                maxBarSize={30}
                            />

                            {/* Expense bars */}
                            <Bar
                                dataKey="expenses"
                                name="Expenses"
                                fill="#ef4444"
                                radius={[4, 4, 0, 0]}
                                maxBarSize={30}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </GlowCard>
    );
};

export default IncomeExpenseChart;