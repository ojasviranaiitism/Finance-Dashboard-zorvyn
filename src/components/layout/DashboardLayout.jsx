import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

const DashboardLayout = () => {
  // State to manage the tablet sidebar drawer
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200 overflow-hidden">

      {/* Sidebar handles its own responsive behavior (hidden/floating/static) */}
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">

        {/* Header gets the toggle function */}
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Main Scrollable Area
                  Notice the pb-24 on mobile: This prevents content from hiding behind the Bottom Nav!
                */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 pb-24 md:pb-6 thin-scrollbar">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>

      </div>

      {/* The new Mobile Navigation */}
      <BottomNav />

    </div>
  );
};

export default DashboardLayout;