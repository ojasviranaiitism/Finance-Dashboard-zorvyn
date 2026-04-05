import React, { useState } from 'react';
import AddTransactionModal from './AddTransactionModal';
import TransactionFilters from './TransactionFilters';
import FadeIn from '../ui/FadeIn';
import SearchBox from '../ui/SearchBox';

const TransactionToolbar = ({
    searchQuery,
    setSearchQuery,
    showFilters,
    setShowFilters,
    filters,
    handleFilterChange,
    clearFilters,
    uniqueCategories,
    userRole
}) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4 transition-colors duration-200">

                {/* Animated Search Box Wrapper */}
                <FadeIn delay={0.3} className="w-full sm:w-96">
                    <SearchBox
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search transactions..."
                    />
                </FadeIn>

                {/* Filters & Add Button */}
                <FadeIn delay={0.4} className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto relative z-30">
                    <TransactionFilters
                        showFilters={showFilters}
                        setShowFilters={setShowFilters}
                        filters={filters}
                        handleFilterChange={handleFilterChange}
                        clearFilters={clearFilters}
                        uniqueCategories={uniqueCategories}
                    />

                    {userRole === 'admin' && (
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="cursor-pointer flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm w-full sm:w-auto shrink-0 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                        >
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            Add
                        </button>
                    )}
                </FadeIn>
            </div>

            <AddTransactionModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
        </>
    );
};

export default TransactionToolbar;