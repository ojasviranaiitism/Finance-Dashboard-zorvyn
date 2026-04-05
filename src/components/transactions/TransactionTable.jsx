import React, { useState, useEffect, useMemo } from 'react';
import useFinanceStore from '../../store/useFinanceStore';
import TransactionTableHeader from './TransactionTableHeader';
import TransactionTableRow from './TransactionTableRow';
import TransactionEmptyState from './TransactionEmptyState';
import TransactionPagination from './TransactionPagination';
import FadeIn from '../ui/FadeIn';

const TransactionTable = ({ data }) => {
    const { userRole, deleteTransaction } = useFinanceStore();

    // --- SORTING STATE ---
    // Default to sorting by Date, newest first (desc)
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

    // --- PAGINATION STATE ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Reset to first page whenever data or sorting changes
    useEffect(() => {
        setCurrentPage(1);
    }, [data, sortConfig]);

    // --- SORTING LOGIC ---
    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = useMemo(() => {
        let sortableItems = [...data];

        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                // 1. Normalize values for comparison
                if (sortConfig.key === 'amount') {
                    aValue = parseFloat(a.amount);
                    bValue = parseFloat(b.amount);
                } else if (sortConfig.key === 'date') {
                    // Use Date.parse for efficiency
                    aValue = Date.parse(a.date);
                    bValue = Date.parse(b.date);
                } else if (sortConfig.key === 'type') {
                    aValue = parseFloat(a.amount) >= 0 ? 'Income' : 'Expense';
                    bValue = parseFloat(b.amount) >= 0 ? 'Income' : 'Expense';
                } else {
                    aValue = String(aValue || '').toLowerCase();
                    bValue = String(bValue || '').toLowerCase();
                }

                // 2. THE TIE-BREAKER: If primary values are equal, use ID
                // This ensures that two "April 05" entries are ordered by when they were added.
                if (aValue === bValue) {
                    // Sort by ID descending so newest ID is always on top
                    return b.id.localeCompare(a.id);
                }

                // 3. Primary Sort Direction
                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [data, sortConfig]);

    // --- CALCULATIONS ---
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = sortedData.slice(startIndex, endIndex);

    return (
        <FadeIn delay={0.5} className="w-full">
            <div className="w-full rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[480px] transition-all duration-200 dark:bg-gray-900/50 dark:border-gray-800 backdrop-blur-md">

                <div className="overflow-x-auto flex-1 thin-scrollbar">
                    <table className="w-full min-w-[800px] border-collapse text-left">
                        <TransactionTableHeader
                            userRole={userRole}
                            requestSort={requestSort}
                            sortConfig={sortConfig}
                        />

                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                            {sortedData.length === 0 ? (
                                <TransactionEmptyState userRole={userRole} />
                            ) : (
                                currentData.map((tx) => (
                                    <TransactionTableRow
                                        key={tx.id}
                                        tx={tx}
                                        userRole={userRole}
                                        onDelete={deleteTransaction}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-auto border-t border-gray-50 dark:border-gray-800/50">
                    {totalPages > 1 && (
                        <TransactionPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={sortedData.length}
                            startIndex={startIndex}
                            endIndex={endIndex}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </div>
            </div>
        </FadeIn>
    );
};

export default TransactionTable;