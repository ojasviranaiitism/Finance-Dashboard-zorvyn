import React from 'react';

// Pre-defined color dictionary for your specific card requirements
const GLOW_COLORS = {
    blue: '#5093ffff',     // Tailwind blue-500
    emerald: '#10b981',  // Tailwind emerald-500
    yellow: '#eab308',   // Tailwind yellow-500
    default: '#64eee7ff',   // White fallback
    purple: '#8b5cf6'
};

const GlowCard = ({ children, color = 'default', className = '' }) => {
    const glowColor = GLOW_COLORS[color] || GLOW_COLORS.default;

    return (
        <div className={`relative isolate rounded-2xl overflow-hidden group transition-transform duration-300 hover:-translate-y-1 ${className}`}>

            {/* 1. OUTER BORDER LAYER (Visible when not glowing) */}
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 z-0" />

            {/* 2. THE BORDER GLOW (Shines through the 1px gap) */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24rem] h-[24rem] opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none z-0"
                style={{ background: `radial-gradient(circle closest-side at center, ${glowColor}, transparent)` }}
            />

            {/* 3. THE CARD SURFACE (Inset by 1px to create the border) */}
            <div className="absolute inset-[1px] rounded-[15px] bg-white dark:bg-[#0b0f19] z-10 pointer-events-none" />

            {/* 4. THE INNER GLOW (Soft wash over the surface) */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55rem] h-[55rem] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none z-20"
                style={{ background: `radial-gradient(circle closest-side at center, ${glowColor}, transparent)` }}
            />

            {/* 5. THE CONTENT */}
            <div className="relative z-30 h-full">
                {children}
            </div>

        </div>
    );
};

export default GlowCard;