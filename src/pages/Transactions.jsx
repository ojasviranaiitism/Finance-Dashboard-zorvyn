import React, { useState, useMemo } from 'react';
import useFinanceStore from '../store/useFinanceStore';
import TransactionTable from '../components/transactions/TransactionTable';
import TransactionHeader from '../components/transactions/TransactionHeader';
import TransactionToolbar from '../components/transactions/TransactionToolbar';
import FadeIn from '../components/ui/FadeIn';

const Transactions = () => {
    const { userRole, transactions } = useFinanceStore();

    // --- STATE ---
    const [searchQuery, setSearchQuery] = useState(''); // Search input value
    const [showFilters, setShowFilters] = useState(false); // Toggle filter panel visibility
    const [filters, setFilters] = useState({
        minAmount: '', maxAmount: '', status: 'All', dateRange: 'All', category: 'All'
    });

    // --- FILTER LOGIC ---
    const filteredTransactions = useMemo(() => {
        return transactions.filter((tx) => {
            // --- SEARCH MATCH ---
            const searchLower = searchQuery.toLowerCase().trim();
            const matchesSearch = !searchQuery ||
                tx.description.toLowerCase().includes(searchLower) ||
                tx.id.toLowerCase().includes(searchLower);
            if (!matchesSearch) return false;

            // --- CATEGORY & STATUS FILTER ---
            if (filters.category !== 'All' && tx.category !== filters.category) return false;
            if (filters.status !== 'All' && tx.status !== filters.status) return false;

            // --- AMOUNT RANGE FILTER ---
            const absAmount = Math.abs(tx.amount);
            if (filters.minAmount && absAmount < Number(filters.minAmount)) return false;
            if (filters.maxAmount && absAmount > Number(filters.maxAmount)) return false;

            // --- DATE RANGE FILTER ---
            if (filters.dateRange !== 'All') {
                const txDate = new Date(tx.date);
                const today = new Date();
                today.setHours(23, 59, 59, 999);

                // Helper for relative date ranges
                const startDateMap = {
                    'This Week': (() => { const d = new Date(today); d.setDate(today.getDate() - today.getDay()); d.setHours(0, 0, 0, 0); return d; })(),
                    'Last 30 Days': (() => { const d = new Date(today); d.setDate(today.getDate() - 30); d.setHours(0, 0, 0, 0); return d; })(),
                    'Last 60 Days': (() => { const d = new Date(today); d.setDate(today.getDate() - 60); d.setHours(0, 0, 0, 0); return d; })(),
                    'Last 90 Days': (() => { const d = new Date(today); d.setDate(today.getDate() - 90); d.setHours(0, 0, 0, 0); return d; })()
                };

                const startDate = startDateMap[filters.dateRange];
                if (startDate && (txDate < startDate || txDate > today)) return false;
            }

            return true;
        });
    }, [transactions, searchQuery, filters]);

    // --- HANDLERS ---
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const clearFilters = () => {
        setFilters({ minAmount: '', maxAmount: '', status: 'All', dateRange: 'All', category: 'All' });
        setSearchQuery(''); // Reset search as well
    };

    // --- DYNAMIC CATEGORY OPTIONS ---
    const uniqueCategories = ['All', ...new Set(transactions.map(tx => tx.category))];

    return (
        <div className="space-y-6 relative">

            {/* Header: Pass filtered data for exporting/summary */}
            <TransactionHeader data={filteredTransactions} />

            {/* Toolbar: Search, filters, and user actions */}
            <TransactionToolbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                filters={filters}
                handleFilterChange={handleFilterChange}
                clearFilters={clearFilters}
                uniqueCategories={uniqueCategories}
                userRole={userRole}
            />

            {/* Table: Display filtered transactions */}
            <TransactionTable data={filteredTransactions} />
        </div>
    );
};

export default Transactions;