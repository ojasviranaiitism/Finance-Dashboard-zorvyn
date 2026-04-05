import { useMemo } from 'react';
import useFinanceStore from '../store/useFinanceStore';

export const useDashboardMetrics = () => {
    const { transactions } = useFinanceStore();

    return useMemo(() => {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        // Handle January edge case for previous month
        const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

        // --- CONSTANTS FOR GOAL TRACKING ---
        const STARTING_BALANCE = 12500; // Your base balance
        const HOUSE_GOAL = 200000;       // Target goal

        let currIncome = 0, currSpent = 0;
        let prevIncome = 0, prevSpent = 0;
        let total = STARTING_BALANCE; // Start tallying from the base balance

        transactions.forEach((tx) => {
            total += tx.amount;
            const txDate = new Date(tx.date);
            const txMonth = txDate.getMonth();
            const txYear = txDate.getFullYear();

            // Tally Current Month
            if (txYear === currentYear && txMonth === currentMonth) {
                if (tx.amount > 0) currIncome += tx.amount;
                else currSpent += Math.abs(tx.amount);
            }
            // Tally Previous Month
            else if (txYear === prevYear && txMonth === prevMonth) {
                if (tx.amount > 0) prevIncome += tx.amount;
                else prevSpent += Math.abs(tx.amount);
            }
        });

        // Helper to calculate percentage safely (avoids dividing by zero)
        const calcPercent = (curr, prev) => prev === 0 ? (curr > 0 ? 100 : 0) : ((curr - prev) / prev) * 100;

        // Current Month Net vs Previous Month Net for Balance Change
        const currNet = currIncome - currSpent;
        const prevNet = prevIncome - prevSpent;


        // --- NEW: SAVINGS GOAL CALCULATIONS ---

        // Use Math.max to prevent negative savings from breaking the UI
        const actualSavings = Math.max(0, total - STARTING_BALANCE);

        // Use Math.min to cap the progress ring at exactly 100%
        const savingsPercentage = Math.min(100, Math.round((actualSavings / HOUSE_GOAL) * 100));

        const remainingToGoal = HOUSE_GOAL - actualSavings;

        // Generate AI Insight Message based on current month's performance
        let insightMessage = "Keep track of your expenses to start saving toward your goal!";

        if (actualSavings >= HOUSE_GOAL) {
            insightMessage = "Congratulations! You've successfully hit your House Down Payment goal!";
        } else if (actualSavings > 0) {
            if (currNet > 0) {
                // If you are netting positive this month, predict the timeline
                const monthsLeft = Math.ceil(remainingToGoal / currNet);
                insightMessage = `At your current saving rate, you'll reach your goal in about ${monthsLeft} month${monthsLeft > 1 ? 's' : ''}!`;
            } else {
                // If you spent more than you earned this month
                insightMessage = "You spent more than you earned this month. Try to cut back to stay on track for your goal.";
            }
        }

        return {
            totalBalance: {
                amount: total,
                change: currNet, // How much the balance grew this month
                percent: calcPercent(currNet, prevNet)
            },
            monthlyIncome: {
                amount: currIncome,
                change: currIncome - prevIncome,
                percent: calcPercent(currIncome, prevIncome)
            },
            monthlySpent: {
                amount: currSpent,
                change: currSpent - prevSpent,
                percent: calcPercent(currSpent, prevSpent)
            },
            // --- NEW: EXPORT SAVINGS GOAL DATA ---
            savingsGoal: {
                current: actualSavings,
                target: HOUSE_GOAL,
                percent: savingsPercentage,
                insight: insightMessage
            }
        };
    }, [transactions]);
};