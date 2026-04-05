import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // For smooth dropdown animations
import useFinanceStore from '../../store/useFinanceStore';

// Define glow colors based on user roles
const GLOW_COLORS = {
    admin: '#10b981', // Emerald for admin
    viewer: '#3b82f6', // Blue for viewer
};

const RoleDropdown = () => {
    // Get current role and setter from global store
    const { userRole, setRole } = useFinanceStore();

    // Local state to control dropdown visibility
    const [isOpen, setIsOpen] = useState(false);

    // Determine glow color based on active role
    const activeColor = GLOW_COLORS[userRole] || GLOW_COLORS.viewer;

    // Handle role selection
    const handleRoleChange = (role) => {
        setRole(role); // Update global state
        setIsOpen(false); // Close dropdown
    };

    return (
        <div className="relative">
            {/* --- GLOW TRIGGER BUTTON --- */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative isolate cursor-pointer flex items-center rounded-full overflow-hidden group transition-all duration-300"
            >
                {/* Base background */}
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 z-0" />

                {/* Radial glow effect on hover */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none z-0"
                    style={{ background: `radial-gradient(circle closest-side at center, ${activeColor}, transparent)` }}
                />

                {/* Inner solid circle to overlay glow */}
                <div className="absolute inset-[1px] rounded-full bg-white dark:bg-[#0b0f19] z-10 pointer-events-none" />

                {/* Button content */}
                <div className="relative z-20 flex items-center gap-2 px-3 py-2.5 text-sm font-semibold">
                    {/* Role icon */}
                    <span className={`material-symbols-outlined text-[18px] transition-colors ${userRole === 'admin'
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-blue-600 dark:text-blue-400'
                        }`}>
                        {userRole === 'admin' ? 'shield' : 'visibility'}
                    </span>

                    {/* Role label */}
                    <span className="capitalize text-gray-700 dark:text-gray-200">{userRole}</span>

                    {/* Dropdown arrow */}
                    <span
                        className="material-symbols-outlined text-[18px] text-gray-400 dark:text-gray-500 transition-transform duration-200"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                        expand_more
                    </span>
                </div>
            </button>

            {/* --- FLOATING MENU --- */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Clickable overlay to close dropdown */}
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 top-full mt-2 w-48 rounded-2xl bg-white/90 p-2 shadow-xl z-50 border border-gray-100 backdrop-blur-xl dark:bg-gray-900/95 dark:border-gray-800"
                        >
                            {/* ADMIN OPTION */}
                            <button
                                onClick={() => handleRoleChange('admin')}
                                className={`cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-all ${userRole === 'admin'
                                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400'
                                        : 'text-gray-500 hover:bg-emerald-50/50 hover:text-emerald-600 dark:text-gray-400 dark:hover:bg-emerald-500/5 dark:hover:text-emerald-300'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-[20px]">shield</span>
                                Admin
                                {userRole === 'admin' && (
                                    <span className="material-symbols-outlined ml-auto text-[18px]">check</span>
                                )}
                            </button>

                            {/* VIEWER OPTION */}
                            <button
                                onClick={() => handleRoleChange('viewer')}
                                className={`cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-all ${userRole === 'viewer'
                                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400'
                                        : 'text-gray-500 hover:bg-blue-50/50 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-blue-500/5 dark:hover:text-blue-300'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-[20px]">visibility</span>
                                Viewer
                                {userRole === 'viewer' && (
                                    <span className="material-symbols-outlined ml-auto text-[18px]">check</span>
                                )}
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RoleDropdown;