import React from 'react';

const GLOW_COLOR = '#10b981'; // Emerald

const TransactionPagination = ({ currentPage, totalPages, totalItems, startIndex, endIndex, onPageChange }) => {
    const currentStart = startIndex + 1;
    const currentEnd = Math.min(endIndex, totalItems);

    return (
        /* THE FIX: Changed bg-white to transparent/glass, removed top border to blend with table container */
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-transparent px-6 py-6 transition-colors duration-200">

            <span className="text-xs font-semibold text-gray-500 dark:text-gray-500">
                Showing <span className="text-gray-900 dark:text-gray-200">{currentStart}</span> to <span className="text-gray-900 dark:text-gray-200">{currentEnd}</span> of <span className="text-gray-900 dark:text-gray-200">{totalItems}</span> results
            </span>

            <div className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`cursor-pointer flex items-center justify-center rounded-xl p-1.5 transition-all ${currentPage === 1
                        ? 'text-gray-300 dark:text-gray-800 cursor-not-allowed opacity-50'
                        : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                        }`}
                >
                    <span className="material-symbols-outlined text-[22px]">chevron_left</span>
                </button>

                {/* Page Numbers with Glow Logic */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                    const isActive = currentPage === page;

                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className="relative isolate cursor-pointer flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden group transition-all duration-300"
                        >
                            {/* 1. Outer Border / Background */}
                            <div className={`absolute inset-0 z-0 transition-colors ${isActive
                                ? 'bg-emerald-200 dark:bg-emerald-500/30'
                                : 'bg-gray-200 dark:bg-gray-800'
                                }`} />

                            {/* 2. Border Glow */}
                            <div
                                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 transition-opacity duration-500 pointer-events-none z-0 ${isActive ? 'opacity-60' : 'opacity-0 group-hover:opacity-40'
                                    }`}
                                style={{ background: `radial-gradient(circle closest-side at center, ${GLOW_COLOR}, transparent)` }}
                            />

                            {/* 3. Surface Layer */}
                            <div className={`absolute inset-[1px] rounded-[11px] z-10 pointer-events-none transition-colors ${isActive
                                ? 'bg-emerald-50 dark:bg-[#061214]'
                                : 'bg-white dark:bg-[#0b0f19]'
                                }`} />

                            {/* 4. Content Layer */}
                            <span className={`relative z-20 text-xs font-bold transition-colors ${isActive
                                ? 'text-emerald-700 dark:text-emerald-400'
                                : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100'
                                }`}>
                                {page}
                            </span>
                        </button>
                    );
                })}

                {/* Next Button */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`cursor-pointer flex items-center justify-center rounded-xl p-1.5 transition-all ${currentPage === totalPages
                        ? 'text-gray-300 dark:text-gray-800 cursor-not-allowed opacity-50'
                        : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                        }`}
                >
                    <span className="material-symbols-outlined text-[22px]">chevron_right</span>
                </button>
            </div>
        </div>
    );
};

export default TransactionPagination;