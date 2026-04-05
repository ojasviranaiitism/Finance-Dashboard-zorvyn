import { useMemo } from 'react';
import useFinanceStore from '../store/useFinanceStore';

export const useExpenseBreakdownData = () => {
    const { transactions } = useFinanceStore();

    return useMemo(() => {
        // 1. Filter out positive amounts (we only want expenses for this chart)
        const expenses = transactions.filter(tx => tx.amount < 0);

        // 2. Group by category and sum the absolute amounts
        const grouped = expenses.reduce((acc, tx) => {
            const category = tx.category;
            if (!acc[category]) acc[category] = 0;

            acc[category] += Math.abs(tx.amount);
            return acc;
        }, {});

        // 3. Format exactly how Recharts likes it: [{ name: 'Groceries', value: 300 }]
        const chartData = Object.keys(grouped).map(key => ({
            name: key,
            value: grouped[key]
        }));

        // 4. Sort from largest expense to smallest so the pie slices look organized
        return chartData.sort((a, b) => b.value - a.value);
    }, [transactions]);
};