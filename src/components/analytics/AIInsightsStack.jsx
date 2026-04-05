import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { useSavingsData } from '../../hooks/useSavingsData';
import { useDashboardMetrics } from '../../hooks/useDashboardMetrics';
import GlowCard from '../ui/GlowCard';

// Main component rendering AI insights, alerts, and savings progress
const AIInsightsStack = () => {
    // Fetch savings goal from dashboard metrics
    const { savingsGoal } = useDashboardMetrics();

    // Fetch savings-related data based on goal target
    const { current, target, percent, insight, sparklineData } = useSavingsData(savingsGoal?.target);

    // Helper: format percentage safely
    const formatPercentage = (val) => `${Math.round(val || 0)}%`;

    // Helper: convert large currency values into compact "k" format
    const formatCurrencyShort = (val) => `$${Math.round((val || 0) / 1000).toLocaleString()}k`;

    return (
        <div className="flex flex-col gap-5 h-full">

            {/* Container for top cards (AI Insight + Budget Alert)
                NOTE: Uses responsive stacking:
                - column on small screens
                - row on medium
                - back to column on large (>=1024px) */}
            <div className="flex flex-col md:flex-row lg:flex-col gap-5">

                {/* 1. AI Insight Card */}
                <GlowCard color="emerald" className="flex-1 transition-all">
                    <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                            {/* Icon */}
                            <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[20px]">auto_awesome</span>
                            {/* Title */}
                            <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-100 tracking-tight">AI Insight</h3>
                        </div>
                        {/* Static insight text (can be made dynamic later) */}
                        <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
                            Your <strong>"Food & Dining"</strong> spending is <span className="font-bold text-emerald-600 dark:text-emerald-400">15% lower</span> than last month.
                        </p>
                    </div>
                </GlowCard>

                {/* 2. Budget Alert Card */}
                <GlowCard color="yellow" className="flex-1 transition-all">
                    <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                            {/* Warning icon */}
                            <span className="material-symbols-outlined text-orange-500 dark:text-orange-400 text-[20px]">warning</span>
                            {/* Title */}
                            <h3 className="text-xl font-bold text-orange-900 dark:text-orange-100 tracking-tight">Budget Alert</h3>
                        </div>
                        {/* Static alert text */}
                        <p className="text-xs text-orange-800 dark:text-orange-300 leading-relaxed">
                            You've reached <span className="font-bold text-orange-600 dark:text-orange-400">92%</span> of your shopping budget.
                        </p>
                    </div>
                </GlowCard>
            </div>

            {/* 3. Savings Goal Card
                - Takes more space on smaller screens (flex-[2])
                - Normalizes on large screens (lg:flex-1) */}
            <GlowCard color="blue" className="flex-[2] lg:flex-1 relative overflow-hidden transition-all">
                <div className="p-5 h-full flex flex-col justify-between">

                    {/* Background sparkline chart (faded, non-interactive) */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 opacity-40 dark:opacity-20 translate-y-4 pointer-events-none z-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={sparklineData}>
                                <Area
                                    type="monotone"
                                    dataKey="v"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    fill="#3b82f6"
                                    fillOpacity={0.1}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Header */}
                    <div className="flex items-center gap-2 mb-3 relative z-10">
                        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[20px]">target</span>
                        <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 tracking-tight">Savings Goal</h3>
                    </div>

                    {/* Main content: progress circle + details */}
                    <div className="flex items-center justify-between gap-6 relative z-10">

                        {/* Circular progress indicator */}
                        <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0 transition-all">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                {/* Background circle */}
                                <circle
                                    className="text-gray-100 dark:text-gray-800"
                                    cx="50"
                                    cy="50"
                                    fill="transparent"
                                    r="40"
                                    stroke="currentColor"
                                    strokeWidth="10"
                                />
                                {/* Progress circle */}
                                <circle
                                    className="text-blue-500 dark:text-blue-400 transition-all duration-1000 ease-out"
                                    cx="50"
                                    cy="50"
                                    fill="transparent"
                                    r="40"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeWidth="10"
                                    strokeDasharray="251.2"
                                    // Dynamically adjust stroke offset based on percentage
                                    style={{ strokeDashoffset: `${251.2 - (251.2 * (percent / 100))}` }}
                                />
                            </svg>

                            {/* Center percentage label */}
                            <span className="absolute text-xl font-extrabold text-blue-950 dark:text-white">
                                {formatPercentage(percent)}
                            </span>
                        </div>

                        {/* Savings details */}
                        <div className="flex-1 text-right min-w-0">
                            {/* Goal label */}
                            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest truncate block">
                                House Down Payment
                            </span>

                            {/* Current vs target */}
                            <div className="flex items-baseline justify-end gap-1 flex-wrap">
                                <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                                    {formatCurrencyShort(current)}
                                </span>
                                <span className="text-xs font-medium text-gray-400">
                                    / {formatCurrencyShort(target)}
                                </span>
                            </div>

                            {/* AI-generated insight */}
                            <p className="text-[12px] font-bold text-blue-700 dark:text-blue-300 mt-2 leading-tight">
                                {insight}
                            </p>
                        </div>
                    </div>
                </div>
            </GlowCard>
        </div>
    );
};

export default AIInsightsStack;