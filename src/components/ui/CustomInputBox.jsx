import React from 'react';

const GLOW_COLORS = {
    blue: '#3b82f6',
    emerald: '#10b981',
    red: '#ef4444',
    yellow: '#eab308',
    purple: '#8b5cf6',
    default: '#10b981'
};

const CustomInputBox = ({ children, color = 'emerald', className = '' }) => {
    const glowColor = GLOW_COLORS[color] || GLOW_COLORS.default;

    return (
        // Changed from <button> to <div> so inputs can live inside safely
        <div className={`relative isolate w-full rounded-xl overflow-hidden group transition-all duration-300 ${className}`}>

            {/* 1. Outer Border Layer */}
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 z-0 pointer-events-none" />

            {/* 2. Border Glow (Activates on Hover AND when input is Focused) */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-0 group-hover:opacity-40 group-focus-within:opacity-50 transition-opacity duration-500 pointer-events-none z-0"
                style={{ background: `radial-gradient(circle closest-side at center, ${glowColor}, transparent)` }}
            />

            {/* 3. Surface Layer (1px Inset creates the fine border) */}
            <div className="absolute inset-[1px] rounded-[11px] bg-gray-50 dark:bg-[#0b0f19] z-10 pointer-events-none" />

            {/* 4. Content Layer */}
            <div className="relative z-20 w-full flex items-center h-full">
                {children}
            </div>

        </div>
    );
};

export default CustomInputBox;