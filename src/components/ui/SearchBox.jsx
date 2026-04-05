import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SearchBox = ({ value, onChange, placeholder }) => {
    const [isFocused, setIsFocused] = useState(false);
    const glowColor = '#10b981'; // Emerald

    return (
        <div className="relative isolate w-full rounded-xl overflow-hidden group transition-all duration-300">
            {/* 1. OUTER BORDER LAYER */}
            <div className={`absolute inset-0 z-0 transition-colors duration-300 ${isFocused ? 'bg-emerald-500/50' : 'bg-gray-200 dark:bg-gray-800'
                }`} />

            {/* 2. THE BORDER GLOW 
                - Subtle on group-hover (opacity-40)
                - Intense on focus (opacity-100 + larger scale)
            */}
            <motion.div
                initial={false}
                animate={{
                    opacity: isFocused ? 0.8 : 0,
                    scale: isFocused ? 1.2 : 1,
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none z-0 group-hover:opacity-40 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle closest-side at center, ${glowColor}, transparent)` }}
            />

            {/* 3. THE SURFACE (1px Inset) */}
            <div className={`absolute inset-[1px] rounded-[11px] z-10 pointer-events-none transition-colors duration-300 ${isFocused ? 'bg-white dark:bg-[#061214]' : 'bg-white dark:bg-[#0b0f19]'
                }`} />

            {/* 4. THE CONTENT (Icon + Input) */}
            <div className="relative z-20 flex items-center">
                <span className={`material-symbols-outlined absolute left-3 transition-colors duration-300 text-[20px] ${isFocused ? 'text-emerald-500' : 'text-gray-400 dark:text-gray-500'
                    }`}>
                    search
                </span>
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-4 py-2 bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />
            </div>
        </div>
    );
};

export default SearchBox;