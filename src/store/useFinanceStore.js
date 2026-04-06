import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialTransactions } from '../data/mockData';

// Our robust sorting helper (Date + ID Tiebreaker)
const sortTransactionsChrono = (data) => {
  return [...data].sort((a, b) => {
    const dateA = Date.parse(a.date);
    const dateB = Date.parse(b.date);

    if (dateA !== dateB) {
      return dateB - dateA;
    }
    // Fallback to ID sorting if dates are identical
    return String(b.id).localeCompare(String(a.id));
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

      /**
       * INITIAL FETCH / SEEDING
       * Instead of calling localhost, we check if we have data.
       * If the store is empty, we "seed" it with mockData.
       */
      fetchTransactions: async () => {
        set({ isLoading: true });

        const currentData = get().transactions;

        // Simulation of network delay for a professional feel
        await new Promise(resolve => setTimeout(resolve, 500));

        if (currentData.length === 0) {
          set({
            transactions: sortTransactionsChrono(initialTransactions),
            isLoading: false
          });
        } else {
          // Just re-sort what we have in storage
          set({
            transactions: sortTransactionsChrono(currentData),
            isLoading: false
          });
        }
      },

      /**
       * ADD: Generates a unique ID and saves directly to state/localStorage
       */
      addTransaction: async (newTx) => {
        set({ isLoading: true });
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 300));

          // Generate a unique ID since we don't have a backend to do it
          const savedTx = {
            ...newTx,
            id: Date.now().toString()
          };

          set((state) => ({
            transactions: sortTransactionsChrono([savedTx, ...state.transactions]),
            isLoading: false
          }));
        } catch (err) {
          set({ error: "Failed to add transaction", isLoading: false });
        }
      },

      /**
       * UPDATE: Replaces the item in the local array
       */
      updateTransaction: async (id, updatedData) => {
        set({ isLoading: true });
        try {
          await new Promise(resolve => setTimeout(resolve, 300));

          set((state) => {
            const updatedList = state.transactions.map((tx) =>
              tx.id === id ? { ...tx, ...updatedData } : tx
            );
            return {
              transactions: sortTransactionsChrono(updatedList),
              isLoading: false
            };
          });
        } catch (err) {
          set({ error: "Failed to update transaction", isLoading: false });
        }
      },

      /**
       * DELETE: Filters out the item from the local array
       */
      deleteTransaction: async (id) => {
        set({ isLoading: true });
        try {
          await new Promise(resolve => setTimeout(resolve, 300));

          set((state) => ({
            transactions: state.transactions.filter((tx) => tx.id !== id),
            isLoading: false
          }));
        } catch (err) {
          set({ error: "Failed to delete transaction", isLoading: false });
        }
      },
    }),
    {
      name: 'zorvyn-finance-storage',
      // Selective persistence: Only save the data, not the loading/error flags
      partialize: (state) => ({
        userRole: state.userRole,
        transactions: state.transactions
      }),
    }
  )
);

export default useFinanceStore;