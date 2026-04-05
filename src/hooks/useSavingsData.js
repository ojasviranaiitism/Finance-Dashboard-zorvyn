import { useMemo } from 'react';
import useFinanceStore from '../store/useFinanceStore';
import { useDashboardMetrics } from './useDashboardMetrics';

export const useSavingsData = () => {
    const { transactions } = useFinanceStore();
    const metrics = useDashboardMetrics();

    const targetGoal = metrics.savingsGoal.target;

    return useMemo(() => {
        // 1. Calculate Net Change from transactions
        const netChange = transactions.reduce((acc, tx) => acc + tx.amount, 0);

        const STARTING_BALANCE = 12500;
        const currentTotal = STARTING_BALANCE + netChange;

        // 2. Calculate Percentage based on the Total (not just the profit)
        const percent = Math.min(100, Math.max(0, (currentTotal / targetGoal) * 100));

        // 3. Generate Sparkline Trend (Starting from the Base Balance)
        let runningTotal = STARTING_BALANCE;
        const sparklineData = [...transactions]
            .reverse() // Oldest to newest
            .map(tx => {
                runningTotal += tx.amount;
                return { v: runningTotal };
            })
            .slice(-12);

        // 4. Insight Logic (Syncing with your Metrics file logic)
        const insight = metrics.savingsGoal.insight;

        return {
            current: currentTotal,
            target: targetGoal,
            percent,
            insight,
            sparklineData
        };
    }, [transactions, metrics.savingsGoal]);
};