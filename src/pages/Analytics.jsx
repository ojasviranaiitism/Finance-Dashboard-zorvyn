import React from 'react';
import IncomeExpenseChart from '../components/analytics/IncomeExpenseChart';
import AIInsightsStack from '../components/analytics/AIInsightsStack';
import TopCategoriesChart from '../components/analytics/TopCategoriesChart';
import SavingsTrendChart from '../components/analytics/SavingsTrendChart';
import { useDashboardMetrics } from '../hooks/useDashboardMetrics';
import FadeIn from '../components/ui/FadeIn';

const Analytics = () => {
    const metricsData = useDashboardMetrics();
    // Note: savingsGoal is available here if you need to pass it to SavingsTrendChart
    const { savingsGoal } = metricsData;

    return (
        /* Added pb-10 for consistent bottom spacing across all views */
        <div className="space-y-6 pb-10 transition-colors duration-200">

            {/* HEADER */}
            <FadeIn delay={0}>
                <div className="px-1">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Financial Analytics</h1>
                    <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">Deep dive into your spending habits and trends</p>
                </div>
            </FadeIn>

            {/* TOP ROW: 70/30 Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Income vs Expenses Chart */}
                <FadeIn delay={0.1} className="lg:col-span-8 w-full">
                    <IncomeExpenseChart />
                </FadeIn>

                {/* AI Insights Stack (The 3 Cards) */}
                <FadeIn delay={0.2} className="lg:col-span-4 w-full">
                    <AIInsightsStack />
                </FadeIn>
            </div>

            {/* BOTTOM ROW: 50/50 Split */}
            {/* Added w-full to ensure the grid takes up the container width */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                {/* Savings Trend */}
                <FadeIn
                    delay={0.1}
                    className="w-full h-[350px]"
                    viewport={{ once: true, margin: "0px" }} // Trigger as soon as it touches the screen
                >
                    <SavingsTrendChart />
                </FadeIn>

                {/* Top Categories */}
                <FadeIn delay={0.4} className="w-full">
                    <TopCategoriesChart />
                </FadeIn>
            </div>
        </div>
    );
};

export default Analytics;