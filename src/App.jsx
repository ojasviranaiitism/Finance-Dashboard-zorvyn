import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Analytics from './pages/Analytics';
import useFinanceStore from './store/useFinanceStore';

function App() {
  // Extract the fetch action from our store
  const fetchTransactions = useFinanceStore((state) => state.fetchTransactions);

  // Initial data fetch on mount
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;