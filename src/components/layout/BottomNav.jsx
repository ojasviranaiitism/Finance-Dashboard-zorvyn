import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
    { name: 'Dashboard', path: '/', icon: 'grid_view' },
    { name: 'Transaction', path: '/transactions', icon: 'sync_alt' },
    { name: 'Analytics', path: '/analytics', icon: 'bar_chart' },
];

const BottomNav = () => {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 px-6 py-2 pb-safe transition-colors duration-200 dark:bg-gray-900 dark:border-gray-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.2)]">
            <div className="flex justify-between items-center">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        // Use exact matching for the dashboard root route
                        end={item.path === '/'}
                        className={({ isActive }) => `
                            flex flex-col items-center justify-center w-full py-1 gap-1 transition-colors
                            ${isActive
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
                            }
                        `}
                    >
                        <span className="material-symbols-outlined text-[24px]">
                            {item.icon}
                        </span>
                        <span className="text-[10px] font-medium tracking-wide">
                            {item.name}
                        </span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default BottomNav;