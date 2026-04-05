import React from 'react';

const ExportButton = ({ onClick, icon, label }) => {
    const glowColor = '#10b981';

    return (
        <button
            onClick={onClick}
            className="relative isolate rounded-xl overflow-hidden group transition-transform duration-300 hover:-translate-y-0.5 cursor-pointer flex-shrink-0"
        >
            {/* 1. OUTER BORDER LAYER */}
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 z-0 transition-colors" />

            {/* 2. THE BORDER GLOW (Scaled down to w-32 for button size) */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none z-0"
                style={{ background: `radial-gradient(circle closest-side at center, ${glowColor}, transparent)` }}
            />

            {/* 3. THE BUTTON SURFACE (1px inset with rounded-[11px] to match rounded-xl) */}
            <div className="absolute inset-[1px] rounded-[11px] bg-white dark:bg-[#0b0f19] z-10 pointer-events-none transition-colors" />

            {/* 4. THE INNER GLOW */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none z-20"
                style={{ background: `radial-gradient(circle closest-side at center, ${glowColor}, transparent)` }}
            />

            {/* 5. THE CONTENT */}
            <div className="relative z-30 flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                <span className="material-symbols-outlined text-[18px]">{icon}</span>
                {label}
            </div>
        </button>
    );
};

export default ExportButton;