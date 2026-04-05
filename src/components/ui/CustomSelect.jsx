import React, { useState, useRef, useEffect } from 'react';

const GLOW_COLORS = {
    blue: '#3b82f6',
    emerald: '#10b981',
    yellow: '#eab308',
    purple: '#8b5cf6',
    default: '#10b981'
};

const CustomSelect = ({ value, onChange, options, name, label, color = 'emerald' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const glowColor = GLOW_COLORS[color] || GLOW_COLORS.default;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue) => {
        onChange({ target: { name, value: optionValue } });
        setIsOpen(false);
    };

    const normalizedOptions = options.map(opt =>
        typeof opt === 'string' ? { label: opt, value: opt } : opt
    );

    const selectedOption = normalizedOptions.find(opt => opt.value === value) || {};

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {/* --- GLOW TRIGGER BUTTON --- */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer relative isolate w-full rounded-xl overflow-hidden group transition-all duration-300"
            >
                {/* 1. Outer Border Layer */}
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 z-0" />

                {/* 2. Border Glow */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none z-0"
                    style={{ background: `radial-gradient(circle closest-side at center, ${glowColor}, transparent)` }}
                />

                {/* 3. Surface Layer (1px Inset) */}
                <div className="absolute inset-[1px] rounded-[11px] bg-gray-50 dark:bg-[#0b0f19] z-10 pointer-events-none" />

                {/* 4. Content Layer */}
                <div className="relative z-20 flex items-center justify-between pl-3 pr-2 py-2 text-sm">
                    <span className="flex items-center gap-1.5 truncate">
                        {label && <span className="text-gray-400 dark:text-gray-500 font-medium">{label}:</span>}
                        <span className="font-semibold text-gray-700 dark:text-gray-100">
                            {selectedOption.label || "Select..."}
                        </span>
                    </span>
                    <span
                        className="material-symbols-outlined text-[18px] text-gray-400 dark:text-gray-500 transition-transform duration-200"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                        expand_more
                    </span>
                </div>
            </button>

            {/* --- DROPDOWN MENU --- */}
            {isOpen && (
                <div className="absolute z-[100] mt-2 w-full min-w-[160px] bg-white border border-gray-100 rounded-2xl shadow-xl p-1.5 dark:bg-gray-900 dark:border-gray-800 dark:shadow-2xl origin-top transition-all backdrop-blur-md dark:bg-gray-900/90">
                    <div className="max-h-60 overflow-y-auto thin-scrollbar flex flex-col gap-0.5">
                        {normalizedOptions.map((opt) => {
                            const isSelected = opt.value === value;
                            return (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => handleSelect(opt.value)}
                                    className={`cursor-pointer flex items-center justify-between w-full px-3 py-2.5 text-sm rounded-xl transition-colors ${isSelected
                                        ? 'bg-emerald-50 text-emerald-700 font-bold dark:bg-emerald-500/10 dark:text-emerald-400'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800/50 dark:hover:text-white'
                                        }`}
                                >
                                    {opt.label}
                                    {isSelected && (
                                        <span className="material-symbols-outlined text-[18px] font-bold">check</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomSelect;