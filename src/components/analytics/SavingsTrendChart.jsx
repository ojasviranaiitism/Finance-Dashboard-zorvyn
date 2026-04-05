import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useFinanceStore from '../../store/useFinanceStore';
import GlowCard from '../ui/GlowCard';

// Custom tooltip component for displaying formatted currency values on hover
const CurrencyTooltip = ({ active, payload, label }) => {
    // Only render tooltip if it's active and has data
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 transition-colors dark:bg-gray-800 dark:border-gray-700">
                {/* Label (month) */}
                <p className="text-xs font-bold text-gray-700 mb-2 dark:text-gray-100">{label}</p>

                {/* Display each data point in tooltip */}
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

const SavingsTrendChart = () => {
    // Get transactions from global store
    const { transactions } = useFinanceStore();

    // Memoize chart data to avoid unnecessary recalculations
    const chartData = useMemo(() => {
        const last6Months = [];
        const now = new Date();

        // Generate last 6 months structure
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            last6Months.push({
                month: d.toLocaleString('default', { month: 'short' }), // e.g., Jan, Feb
                monthIndex: d.getMonth(),
                year: d.getFullYear(),
                income: 0,
                expenses: 0,
                amount: 0 // net savings (computed later)
            });
        }

        // Aggregate transactions into respective months
        transactions.forEach(tx => {
            const txDate = new Date(tx.date);

            // Find matching month slot
            const slot = last6Months.find(s =>
                s.monthIndex === txDate.getMonth() && s.year === txDate.getFullYear()
            );

            if (slot) {
                if (tx.amount > 0) {
                    // Positive amounts are treated as income
                    slot.income += tx.amount;
                } else {
                    // Negative amounts are treated as expenses
                    slot.expenses += Math.abs(tx.amount);
                }
            }
        });

        // Compute net savings for each month
        return last6Months.map(slot => ({
            ...slot,
            amount: Math.max(0, slot.income - slot.expenses) // ensure non-negative
        }));
    }, [transactions]);

    return (
        <GlowCard color="purple" className="h-full w-full">
            <div className="p-6 h-full w-full flex flex-col">
                {/* Chart title */}
                <h3 className="text-sm font-bold text-gray-900 mb-6 dark:text-white">
                    Monthly Savings Trend
                </h3>

                <div className="flex-1 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={chartData}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                            {/* Background grid */}
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                className="stroke-gray-100 dark:stroke-gray-800"
                            />

                            {/* X-axis (months) */}
                            <XAxis
                                dataKey="month"
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
                                tickFormatter={(val) =>
                                    `$${val >= 1000 ? (val / 1000).toFixed(1) + 'k' : val}`
                                }
                            />

                            {/* Custom tooltip */}
                            <Tooltip content={<CurrencyTooltip />} />

                            {/* Line representing net savings */}
                            <Line
                                type="monotone"
                                dataKey="amount"
                                name="Net Savings"
                                stroke="#8b5cf6"
                                strokeWidth={3}
                                dot={{
                                    r: 4,
                                    fill: '#8b5cf6',
                                    strokeWidth: 2,
                                    stroke: 'white',
                                    className: "stroke-white dark:stroke-gray-900"
                                }}
                                activeDot={{ r: 8, strokeWidth: 0 }}
                                animationDuration={1000}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </GlowCard>
    );
};

export default SavingsTrendChart;