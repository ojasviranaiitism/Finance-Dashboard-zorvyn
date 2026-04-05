import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useFinanceStore from '../../store/useFinanceStore';
import CustomSelect from '../ui/CustomSelect';
import CustomInputBox from '../ui/CustomInputBox';

// Transaction categories and types
const CATEGORIES = [
    'Food', 'Groceries', 'Housing', 'Transport', 'Entertainment',
    'Shopping', 'Amazon Delivery', 'Healthcare', 'Utilities',
    'Salary', 'Bonus', 'Investment Return'
];

const TRANSACTION_TYPES = ['Expense', 'Income'];

const AddTransactionModal = ({ isOpen, onClose }) => {
    const { addTransaction } = useFinanceStore();

    // Form state
    const [form, setForm] = useState({
        date: new Date().toISOString().split('T')[0],
        type: 'Expense',
        description: '',
        amount: '',
        category: 'Food'
    });

    // Update form values
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    // Submit form and add transaction
    const handleSubmit = (e) => {
        e.preventDefault();

        // Convert amount to positive/negative based on type
        const rawAmount = parseFloat(form.amount) || 0;
        const finalAmount = form.type === 'Expense' ? -Math.abs(rawAmount) : Math.abs(rawAmount);

        // Format date to readable string
        const dateObj = new Date(form.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            month: 'long', day: '2-digit', year: 'numeric'
        });

        // Add transaction to store
        addTransaction({
            date: formattedDate,
            amount: finalAmount,
            description: form.description,
            category: form.category,
            createdAt: new Date().toISOString(),
            status: 'Done'
        });

        // Close modal and reset form
        onClose();
        setForm({
            date: new Date().toISOString().split('T')[0],
            type: 'Expense',
            description: '',
            amount: '',
            category: 'Food'
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    {/* Overlay background */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm"
                    />

                    {/* Modal container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[24px] shadow-2xl w-full max-w-[480px]"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-50 dark:border-gray-800 rounded-t-[24px]">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Add Transaction</h2>
                            <button
                                type="button"
                                onClick={onClose}
                                className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-5 relative z-50">
                            {/* Date & Type */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-1">Date *</label>
                                    <CustomInputBox>
                                        <input
                                            type="date"
                                            name="date"
                                            required
                                            value={form.date}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 bg-transparent text-sm font-semibold text-gray-700 dark:text-gray-100 outline-none cursor-pointer appearance-none"
                                        />
                                    </CustomInputBox>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Type *</label>
                                    <CustomSelect name="type" value={form.type} onChange={handleChange} options={TRANSACTION_TYPES} />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-1">Description *</label>
                                <CustomInputBox>
                                    <input
                                        type="text"
                                        name="description"
                                        required
                                        placeholder="e.g. Grocery shopping"
                                        value={form.description}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-transparent text-sm font-semibold text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none"
                                    />
                                </CustomInputBox>
                            </div>

                            {/* Amount & Category */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-1">
                                        Amount (USD) *
                                    </label>

                                    <CustomInputBox
                                        dynamicColor={form.type === 'Income' ? 'emerald' : 'red'}
                                        className="after:content-['']"
                                    >
                                        <div className="flex items-center w-full px-3 py-2">
                                            {/* Dollar sign color changes based on transaction type */}
                                            <span className={`text-sm font-bold mr-1.5 shrink-0 transition-colors duration-500 
                                                    ${form.type === 'Income' ? 'text-emerald-500/80 dark:text-emerald-400/90'
                                                    : 'text-red-500/80 dark:text-red-400/90'
                                                }`}
                                            > $ </span>

                                            <input
                                                type="number"
                                                name="amount"
                                                required
                                                step="0.01"
                                                placeholder="0.00"
                                                value={form.amount}
                                                onChange={handleChange}
                                                className="w-full bg-transparent text-sm font-bold text-gray-700 dark:text-gray-100 outline-none tabular-nums"
                                            />
                                        </div>
                                    </CustomInputBox>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                                        Category
                                    </label>
                                    <CustomSelect
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        options={CATEGORIES}
                                    />
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="pt-4 flex items-center justify-end gap-3">
                                <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer">
                                    Cancel
                                </button>
                                <button type="submit" className="px-6 py-2.5 rounded-xl text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 active:transform active:scale-95 transition-all shadow-lg shadow-emerald-600/20 cursor-pointer">
                                    Add Transaction
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AddTransactionModal;