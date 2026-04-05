import React from 'react';

const TransactionEmptyState = ({ userRole }) => {
    const colSpan = userRole === 'admin' ? 6 : 5;

    return (
        <tr>
            <td colSpan={colSpan} className="py-16 text-center transition-colors duration-200">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-4xl text-gray-300 dark:text-gray-600">search_off</span>
                    </div>
                    <p className="font-semibold text-gray-600 dark:text-gray-300">No matching transactions found</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 max-w-[200px] mx-auto">
                        Try adjusting your search or filters to find what you're looking for.
                    </p>
                </div>
            </td>
        </tr>
    );
};

export default TransactionEmptyState;