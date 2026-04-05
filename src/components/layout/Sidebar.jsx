import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', path: '/', icon: 'grid_view' },
  { name: 'Transaction', path: '/transactions', icon: 'sync_alt' },
  { name: 'Analytics', path: '/analytics', icon: 'bar_chart' },
];

const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <>
      {/* Tablet Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 lg:hidden hidden md:block dark:bg-gray-950/50"
          onClick={closeSidebar}
        />
      )}

      <aside className={`
                hidden md:flex flex-col w-64 h-full bg-white border-r border-gray-100 z-50 transition-all duration-300 ease-in-out
                dark:bg-gray-900 dark:border-gray-800/60
                lg:static lg:translate-x-0
                fixed inset-y-0 left-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>

        {/* LOGO SECTION */}
        <Link
          to="/"
          className="p-6 flex items-center gap-3 group cursor-pointer"
          onClick={() => window.innerWidth < 1024 && closeSidebar()}
        >
          {/* Subtle glow behind the logo */}
          <div className="relative flex h-10 w-10 items-center justify-center">
            <div className="absolute inset-0 rounded-xl bg-emerald-500 opacity-20 blur-md transition-opacity group-hover:opacity-40" />
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-lg font-bold text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
              Z
            </div>
          </div>
          <span className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">Zorvyn</span>
        </Link>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <p className="px-4 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Main Menu</p>

          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/'}
              onClick={() => window.innerWidth < 1024 && closeSidebar()}
              className={({ isActive }) => `
                  group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 relative overflow-hidden
                  ${isActive
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-100'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  {/* Active Indicator Line */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-500 rounded-r-full" />
                  )}

                  {/* Icon with Hover Animation */}
                  <span className={`
                    material-symbols-outlined text-[20px] transition-transform duration-300 ease-out
                    ${isActive ? 'scale-110' : 'group-hover:-translate-y-0.5 group-hover:scale-110'}
                  `}>
                    {item.icon}
                  </span>

                  {item.name}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;