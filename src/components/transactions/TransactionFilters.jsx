import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomSelect from '../ui/CustomSelect';
import FilterTrigger from '../ui/FilterTrigger';

const TransactionFilters = ({
    showFilters,
    setShowFilters,
    filters,
    handleFilterChange,
    clearFilters,
    uniqueCategories
}) => {
    const filterPanelRef = useRef(null);

    // Close the filter panel if user clicks outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterPanelRef.current && !filterPanelRef.current.contains(event.target)) {
                setShowFilters(false);
            }
        };

        if (showFilters) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showFilters, setShowFilters]);

    return (
        <div className="relative w-full sm:w-auto" ref={filterPanelRef}>

            {/* Filter button / trigger */}
            <FilterTrigger
                onClick={() => setShowFilters(!showFilters)}
                isActive={showFilters}
            >
                <span className="material-symbols-outlined text-[20px]">tune</span>
                Filters
            </FilterTrigger>

            {/* Filter dropdown wrapped with AnimatePresence for smooth mount/unmount animations */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-12 right-0 z-50 w-full sm:w-[360px] bg-white/90 border border-gray-100 shadow-2xl rounded-2xl mt-2 transform origin-top-right backdrop-blur-xl dark:bg-gray-900/95 dark:border-gray-800 dark:shadow-slate-950/50"
                    >
                        {/* Header with title and Clear All button */}
                        <div className="bg-gray-50/50 px-5 py-4 border-b border-gray-100 flex justify-between items-center rounded-t-2xl dark:bg-gray-800/30 dark:border-gray-800">
                            <div className="flex items-center gap-2 text-gray-900 font-bold dark:text-white">
                                <span className="material-symbols-outlined text-[20px] text-emerald-600 dark:text-emerald-400">tune</span>
                                Filter Transactions
                            </div>
                            <button
                                onClick={clearFilters}
                                className="cursor-pointer text-xs font-bold text-gray-500 hover:text-emerald-600 transition-colors dark:text-gray-400 dark:hover:text-emerald-400"
                            >
                                Clear All
                            </button>
                        </div>

                        {/* Filter body */}
                        <div className="p-5 space-y-5">
                            {/* Category & Status filters */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Category</label>
                                    <CustomSelect
                                        name="category"
                                        value={filters.category}
                                        onChange={handleFilterChange}
                                        options={uniqueCategories}
                                        color="emerald"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Status</label>
                                    <CustomSelect
                                        name="status"
                                        value={filters.status}
                                        onChange={handleFilterChange}
                                        options={['All', 'Done', 'Pending']}
                                        color="emerald"
                                    />
                                </div>
                            </div>

                            {/* Amount range filter */}
                            <div className="space-y-1.5">
                                <label className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Amount Range ($)</label>
                                <div className="flex items-center gap-3">
                                    {/* Minimum amount input */}
                                    <div className="relative w-full">
                                        <span className="absolute left-3 top-2.5 text-gray-400 text-xs">$</span>
                                        <input
                                            type="number"
                                            name="minAmount"
                                            placeholder="Min"
                                            value={filters.minAmount}
                                            onChange={handleFilterChange}
                                            className="w-full pl-7 pr-3 py-2 text-sm bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 focus:bg-white transition-all dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100 dark:focus:bg-gray-900"
                                        />
                                    </div>
                                    <span className="text-gray-300 dark:text-gray-700">-</span>
                                    {/* Maximum amount input */}
                                    <div className="relative w-full">
                                        <span className="absolute left-3 top-2.5 text-gray-400 text-xs">$</span>
                                        <input
                                            type="number"
                                            name="maxAmount"
                                            placeholder="Max"
                                            value={filters.maxAmount}
                                            onChange={handleFilterChange}
                                            className="w-full pl-7 pr-3 py-2 text-sm bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 focus:bg-white transition-all dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-100 dark:focus:bg-gray-900"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Timeframe filter */}
                            <div className="space-y-1.5">
                                <label className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Timeframe</label>
                                <CustomSelect
                                    name="dateRange"
                                    value={filters.dateRange}
                                    onChange={handleFilterChange}
                                    options={['All', 'This Week', 'Last 30 Days', 'Last 60 Days', 'Last 90 Days']}
                                    color="emerald"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TransactionFilters;