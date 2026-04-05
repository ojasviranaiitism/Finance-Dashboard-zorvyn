import React from 'react';
import useFinanceStore from '../store/useFinanceStore';
import { useDashboardMetrics } from '../hooks/useDashboardMetrics';
import RecentTransactions from '../components/dashboard/RecentTransactions';

// Top Cards
import TotalBalance from '../components/dashboard/TotalBalance';
import MonthlySpent from '../components/dashboard/MonthlySpent';
import MonthlyIncome from '../components/dashboard/MonthlyIncome';

// Charts & Insights
import TransactionsChart from '../components/dashboard/TransactionsChart';
import ExpenseBreakdown from '../components/dashboard/ExpenseBreakdown';
import Insights from '../components/dashboard/Insights';

import FadeIn from '../components/ui/FadeIn';

const Dashboard = () => {
  const { userRole } = useFinanceStore();
  const { totalBalance, monthlyIncome, monthlySpent } = useDashboardMetrics();

  return (
    <div className="space-y-6 transition-colors duration-200 pb-10">

      {/* Welcome Header: Now hidden on Desktop (lg) because it moved to the global Header */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight lg:hidden">
        {userRole === 'admin' ? 'Admin Dashboard' : 'Financial Overview'}
      </h1>

      {/* TOP 3 CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Fade-in effect with staggered delay for smooth entrance */}
        <FadeIn delay={0.1} className="h-full"><TotalBalance {...totalBalance} /></FadeIn>
        <FadeIn delay={0.2} className="h-full"><MonthlySpent {...monthlySpent} /></FadeIn>
        <FadeIn delay={0.3} className="h-full"><MonthlyIncome {...monthlyIncome} /></FadeIn>
      </div>

      {/* ROW 2: Expense Breakdown & Transactions Chart */}
      {/* Responsive heights: auto on mobile, fixed on larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        <FadeIn delay={0.1} className="lg:col-span-5 h-auto lg:h-[450px] flex flex-col">
          <ExpenseBreakdown />
        </FadeIn>
        <FadeIn delay={0.2} className="lg:col-span-7 h-auto lg:h-[450px] flex flex-col">
          <TransactionsChart />
        </FadeIn>
      </div>

      {/* ROW 3: Insights & Recent Transactions */}
      {/* Ensures vertical breathing room and consistent responsive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <FadeIn delay={0.1} className="h-auto lg:h-[400px] flex flex-col">
          <Insights />
        </FadeIn>
        <FadeIn delay={0.2} className="h-auto lg:h-[400px] flex flex-col">
          <RecentTransactions />
        </FadeIn>
      </div>

    </div>
  );
};

export default Dashboard;