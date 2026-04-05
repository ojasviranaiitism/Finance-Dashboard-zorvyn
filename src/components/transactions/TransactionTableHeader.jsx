import React from 'react';

const TransactionTableHeader = ({ userRole, requestSort, sortConfig }) => {

    // Reusable sortable column header
    const SortableHeader = ({ label, sortKey, className = "" }) => {
        const isActive = sortConfig?.key === sortKey; // Check if this column is currently sorted
        const isAsc = isActive && sortConfig.direction === 'asc'; // Check if sort direction is ascending

        return (
            <th
                className={`px-6 py-4 border-b border-gray-100 dark:border-gray-800/50 text-[12px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ${className}`}
            >
                <button
                    onClick={() => requestSort(sortKey)} // Trigger sort on click
                    className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group cursor-pointer outline-none"
                >
                    {label}
                    {/* Sort icon:
                        - Hidden by default (opacity-0)
                        - Subtle hint on hover (group-hover:opacity-40)
                        - Fully visible if active (opacity-100)
                        - Rotates based on ascending/descending
                    */}
                    <span
                        className={`material-symbols-outlined text-[16px] transition-all duration-300 ${isActive
                            ? 'text-emerald-500 opacity-100'
                            : 'opacity-0 group-hover:opacity-40'
                            }`}
                        style={{
                            transform: isAsc ? 'rotate(180deg)' : 'rotate(0deg)', // Flip arrow for ascending
                        }}
                    >
                        arrow_downward
                    </span>
                </button>
            </th>
        );
    };

    return (
        <thead>
            <tr className="bg-gray-50/50 dark:bg-gray-800/20">
                {/* Table headers */}
                <SortableHeader label="Type" sortKey="type" />
                <SortableHeader label="Description" sortKey="description" />
                <SortableHeader label="Category" sortKey="category" />
                <SortableHeader label="Date" sortKey="date" />
                <SortableHeader label="Status" sortKey="status" />
                <SortableHeader label="Amount" sortKey="amount" />

                {/* Admin-only Action column */}
                {userRole === 'admin' && (
                    <th className="px-6 py-4 border-b border-gray-100 dark:border-gray-800/50 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
                        Action
                    </th>
                )}
            </tr>
        </thead>
    );
};

export default TransactionTableHeader;