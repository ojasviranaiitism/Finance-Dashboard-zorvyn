import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const API_URL = 'http://localhost:5000/transactions';

// Our robust sorting helper (Date + ID Tiebreaker)
const sortTransactionsChrono = (data) => {
  return [...data].sort((a, b) => {
    const dateA = Date.parse(a.date);
    const dateB = Date.parse(b.date);

    if (dateA !== dateB) {
      return dateB - dateA;
    }
    return b.id.localeCompare(a.id);
  });
};

const useFinanceStore = create(
  persist(
    (set, get) => ({
      // 1. DATA STATE
      transactions: [],
      isLoading: false,
      error: null,

      // 2. ROLE STATE
      userRole: 'admin',

      // 3. ACTIONS
      setRole: (role) => set({ userRole: role }),

      // FETCH: Pulls from DB. Overwrites local storage cache with fresh data.
      fetchTransactions: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(API_URL);
          if (!response.ok) throw new Error('Failed to fetch transactions');
          const data = await response.json();

          set({
            transactions: sortTransactionsChrono(data),
            isLoading: false
          });
        } catch (err) {
          set({ error: err.message, isLoading: false });
        }
      },

      // ADD: Posts to DB first, then updates local state (and local storage)
      addTransaction: async (newTx) => {
        set({ isLoading: true });
        try {
          const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTx),
          });

          if (!response.ok) throw new Error('Failed to add transaction');
          const savedTx = await response.json();

          set((state) => ({
            transactions: sortTransactionsChrono([savedTx, ...state.transactions]),
            isLoading: false
          }));
        } catch (err) {
          set({ error: err.message, isLoading: false });
        }
      },

      // UPDATE: Patches DB, then updates local state
      updateTransaction: async (id, updatedData) => {
        try {
          const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
          });

          if (!response.ok) throw new Error('Failed to update transaction');
          const updatedTx = await response.json();

          set((state) => {
            const updatedList = state.transactions.map((tx) =>
              tx.id === id ? updatedTx : tx
            );
            return { transactions: sortTransactionsChrono(updatedList) };
          });
        } catch (err) {
          set({ error: err.message });
        }
      },

      // DELETE: Removes from DB, then local state
      deleteTransaction: async (id) => {
        try {
          const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
          });

          if (!response.ok) throw new Error('Failed to delete transaction');

          set((state) => ({
            transactions: state.transactions.filter((tx) => tx.id !== id),
          }));
        } catch (err) {
          set({ error: err.message });
        }
      },
    }),
    {
      name: 'zorvyn-finance-storage',

      // --- THE LOCAL STORAGE MAGIC ---
      // This saves both the role AND the API data to local storage automatically.
      partialize: (state) => ({
        userRole: state.userRole,
        transactions: state.transactions
      }),
    }
  )
);

export default useFinanceStore;