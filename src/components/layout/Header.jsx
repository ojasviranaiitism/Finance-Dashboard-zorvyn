import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import RoleDropdown from './RoleDropdown';
import useFinanceStore from '../../store/useFinanceStore';

const Header = ({ toggleSidebar }) => {
  const { userRole } = useFinanceStore();
  const location = useLocation();
  const isDashboard = location.pathname === '/';

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white border-b border-gray-100 px-6 py-4 flex items-center sticky top-0 z-30 transition-colors duration-200 dark:bg-gray-900 dark:border-gray-800"
    >
      {/* LEFT SECTION: Hamburger + Headings */}
      <div className="flex items-center gap-6 flex-1">
        {/* Mobile/Tablet Menu Button */}
        <button
          onClick={toggleSidebar}
          className="hidden md:flex lg:hidden items-center justify-center p-2 rounded-lg text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        {/* Mobile Logo Only */}
        <Link to="/" className="md:hidden flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold transition-transform group-hover:scale-110">
            Z
          </div>
        </Link>

        {/* --- MAIN PAGE HEADING --- */}
        {/* Shown only on Desktop (>= 1024px) */}
        {isDashboard && (
          <h1 className="hidden lg:block text-2xl font-bold text-gray-900 dark:text-white tracking-tight animate-in fade-in slide-in-from-left-4 duration-300">
            {userRole === 'admin' ? 'Admin Dashboard' : 'Financial Overview'}
          </h1>
        )}
      </div>

      {/* RIGHT SECTION: Actions & Profile */}
      <div className="flex items-center gap-4 ml-auto">
        <RoleDropdown />
        <ThemeToggle />

        {/* --- ENHANCED PROFILE ICON --- */}
        <button className="group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 cursor-pointer">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 opacity-0 blur-sm transition-opacity group-hover:opacity-100 dark:from-emerald-400/10 dark:to-blue-400/10" />
          <div className="relative flex h-full w-full items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm transition-all group-hover:border-emerald-500 group-hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:group-hover:border-emerald-400">
            <span className="material-symbols-outlined text-[22px] text-gray-500 transition-colors group-hover:text-emerald-600 dark:text-gray-400 dark:group-hover:text-emerald-400">
              person
            </span>
          </div>
          <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-gray-900"></span>
          </span>
        </button>
      </div>
    </motion.header>
  );
};

export default Header;