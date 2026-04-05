import { useMemo } from 'react';
import useFinanceStore from '../store/useFinanceStore';

export const useTransactionChartData = (days = 90) => {
    const { transactions } = useFinanceStore();

    return useMemo(() => {
        // Calculate the cutoff date based on the 'days' parameter
        const today = new Date();
        const cutoffDate = new Date();
        cutoffDate.setDate(today.getDate() - days);
        cutoffDate.setHours(0, 0, 0, 0);

        // 1. Filter out old transactions FIRST
        const recentTransactions = transactions.filter(tx => {
            return new Date(tx.date) >= cutoffDate;
        });

        // 2. Group the filtered transactions by date
        const groupedData = recentTransactions.reduce((acc, tx) => {
            const dateObj = new Date(tx.date);
            const formattedDate = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

            if (!acc[formattedDate]) {
                acc[formattedDate] = { date: formattedDate, income: 0, expense: 0, timestamp: dateObj.getTime() };
            }

            if (tx.amount > 0) {
                acc[formattedDate].income += tx.amount;
            } else {
                acc[formattedDate].expense += Math.abs(tx.amount);
            }

            return acc;
        }, {});

        // 3. Convert back to array and sort chronologically
        return Object.values(groupedData).sort((a, b) => a.timestamp - b.timestamp);
    }, [transactions, days]); // Added 'days' to the dependency array!
};