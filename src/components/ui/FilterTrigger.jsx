import React from 'react';

const GLOW_COLOR = '#10b981'; // Emerald

const FilterTrigger = ({ onClick, isActive, children }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="relative isolate w-full sm:w-auto rounded-xl overflow-hidden group transition-all duration-300 cursor-pointer"
        >
            {/* 1. Outer Border / Background */}
            <div className={`absolute inset-0 z-0 transition-colors ${isActive
                ? 'bg-emerald-200 dark:bg-emerald-500/30'
                : 'bg-gray-200 dark:bg-gray-800'
                }`} />

            {/* 2. Border Glow */}
            <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 transition-opacity duration-500 pointer-events-none z-0 ${isActive ? 'opacity-60' : 'opacity-0 group-hover:opacity-40'
                    }`}
                style={{ background: `radial-gradient(circle closest-side at center, ${GLOW_COLOR}, transparent)` }}
            />

            {/* 3. Surface Layer (1px Inset) */}
            <div className={`absolute inset-[1px] rounded-[11px] z-10 pointer-events-none transition-colors ${isActive
                ? 'bg-emerald-50 dark:bg-[#061214]'
                : 'bg-white dark:bg-[#0b0f19]'
                }`} />

            {/* 4. Content Layer */}
            <div className={`relative z-20 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold transition-colors ${isActive
                ? 'text-emerald-700 dark:text-emerald-400'
                : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100'
                }`}>
                {children}
            </div>
        </button>
    );
};

export default FilterTrigger;