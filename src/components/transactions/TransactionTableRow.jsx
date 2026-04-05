import React, { useState } from 'react';
import useFinanceStore from '../../store/useFinanceStore';
import CustomSelect from '../ui/CustomSelect';
import EditActionButton from './EditActionButton';

const CATEGORIES = ['Entertainment', 'Amazon Delivery', 'Groceries', 'Housing', 'Salary', 'Transport', 'Healthcare', 'Shopping', 'Utilities', 'Food', 'Bonus', 'Investment Return'];

// ==========================================
// 1. MAIN COMPONENT (Logic & Routing)
// ==========================================
const TransactionTableRow = ({ tx, userRole, onDelete }) => {
    const { updateTransaction } = useFinanceStore();
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ ...tx });

    const handleSave = (e) => {
        if (e && e.preventDefault) e.preventDefault();

        // 1. Convert the date from "YYYY-MM-DD" back to "Month DD, YYYY"
        const dateParts = editForm.date.split('-');
        let finalDate = editForm.date; // fallback

        // Only format if the date is in YYYY-MM-DD format (from the input)
        if (dateParts.length === 3) {
            const year = parseInt(dateParts[0]);
            const month = parseInt(dateParts[1]) - 1;
            const day = parseInt(dateParts[2]);

            const dateObj = new Date(year, month, day);
            finalDate = dateObj.toLocaleDateString('en-US', {
                month: 'long',
                day: '2-digit',
                year: 'numeric'
            });
        }

        // 2. Prepare the payload
        const updatedPayload = {
            ...editForm,
            date: finalDate
        };

        // 3. Send to store (Store handles re-sorting automatically now)
        if (updateTransaction) updateTransaction(editForm.id, updatedPayload);
        setIsEditing(false);
    };

    const handleCancel = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        setEditForm({ ...tx });
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <EditableRow
                editForm={editForm}
                setEditForm={setEditForm}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        );
    }

    return (
        <ReadOnlyRow
            tx={tx}
            userRole={userRole}
            onEdit={() => setIsEditing(true)}
            onDelete={onDelete}
        />
    );
};

export default TransactionTableRow;


// ==========================================
// 2. READ-ONLY UI COMPONENT
// ==========================================
const ReadOnlyRow = ({ tx, userRole, onEdit, onDelete }) => {
    const isIncome = tx.amount > 0;
    const isCompleted = tx.status === 'Done' || tx.status === 'Completed';

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <tr className="border-b border-gray-50 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50 relative">
            {/* Icon: Indicates Income vs Expense */}
            <td className="px-4 py-4 text-center w-16">
                <div className={`flex items-center justify-center w-9 h-9 rounded-xl transition-colors ${isIncome ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400'}`}>
                    <span className="material-symbols-outlined text-[20px] font-bold">{isIncome ? 'north_east' : 'south_west'}</span>
                </div>
            </td>

            {/* Description */}
            <td className="px-4 py-4 text-sm font-semibold text-gray-900 dark:text-white min-w-[200px] w-[200px] max-w-[200px] truncate" title={tx.description}>
                {tx.description}
            </td>

            {/* Category */}
            <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300 min-w-[160px] w-[160px]">{tx.category}</td>

            {/* Date */}
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400 min-w-[150px] w-[150px]">{tx.date}</td>

            {/* Status Badge */}
            <td className="px-4 py-4 min-w-[120px] w-[120px]">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isCompleted ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isCompleted ? 'bg-emerald-500' : 'bg-orange-500'}`}></span>
                    {tx.status}
                </span>
            </td>

            {/* Amount with sign color */}
            <td className={`px-4 py-4 text-sm font-semibold min-w-[150px] w-[150px] ${isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                {isIncome ? '+' : '-'}${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </td>

            {/* Admin Actions */}
            {userRole === 'admin' && (
                <td className="px-4 py-4 text-center w-24">
                    <div className="flex items-center justify-center gap-1">
                        {/* Edit Button */}
                        <EditActionButton mode="edit" onClick={onEdit} />

                        {/* Delete Button opens modal */}
                        <button
                            type="button"
                            onClick={() => setShowDeleteModal(true)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all dark:hover:bg-red-500/10 dark:hover:text-red-400 cursor-pointer"
                            title="Delete Transaction"
                        >
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                    </div>

                    {/* Delete Confirmation Modal */}
                    {showDeleteModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/20 dark:bg-black/50">
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 w-full max-w-sm p-6 text-left transform transition-all">
                                {/* Modal Header */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 dark:bg-red-500/10 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-[22px]">warning</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Delete Transaction</h3>
                                </div>

                                {/* Modal Body */}
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                                    Are you sure you want to permanently delete <span className="font-semibold text-gray-800 dark:text-gray-200">"{tx.description}"</span>? This action cannot be undone.
                                </p>

                                {/* Modal Actions */}
                                <div className="flex items-center justify-end gap-3 mt-2">
                                    <button onClick={() => setShowDeleteModal(false)} className="cursor-pointer px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                                    <button onClick={() => { onDelete(tx.id); setShowDeleteModal(false); }} className="cursor-pointer px-4 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors shadow-sm shadow-red-500/20">Yes, delete</button>
                                </div>
                            </div>
                        </div>
                    )}
                </td>
            )}
        </tr>
    );
};


// ==========================================
// 3. EDITABLE UI COMPONENT
// ==========================================
const EditableRow = ({ editForm, setEditForm, onSave, onCancel }) => {
    const isIncome = editForm.amount > 0;
    const isCompleted = editForm.status === 'Done' || editForm.status === 'Completed';

    const toggleType = (e) => {
        e.preventDefault();
        setEditForm(prev => ({ ...prev, amount: prev.amount * -1 }));
    };

    const toggleStatus = (e) => {
        e.preventDefault();
        setEditForm(prev => ({ ...prev, status: prev.status === 'Done' ? 'Pending' : 'Done' }));
    };

    const getInputValue = (dateStr) => {
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toISOString().split('T')[0];
        } catch {
            return dateStr;
        }
    };

    return (
        <tr className="border-b border-emerald-100 bg-emerald-50/30 transition-colors dark:border-emerald-900/30 dark:bg-emerald-900/10">
            {/* Toggle Type (Income/Expense) */}
            <td className="px-4 py-4 text-center w-16">
                <button type="button" onClick={toggleType} className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all ${isIncome ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-red-100 text-red-500 dark:bg-red-500/20 dark:text-red-400'} hover:ring-2 ring-offset-1 ring-emerald-500 dark:ring-offset-gray-900`} title="Toggle Income/Expense">
                    <span className="material-symbols-outlined text-[20px] font-bold">{isIncome ? 'north_east' : 'south_west'}</span>
                </button>
            </td>

            {/* Editable Description */}
            <td className="px-4 py-4 min-w-[200px] w-[200px] max-w-[200px]">
                <input
                    type="text"
                    value={editForm.description}
                    onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 text-sm font-semibold bg-white border border-gray-200 rounded-xl outline-none focus:border-emerald-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 transition-colors"
                />
            </td>

            {/* Editable Category */}
            <td className="px-4 py-4 min-w-[160px] w-[160px]">
                <CustomSelect name="category" value={editForm.category} onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))} options={CATEGORIES} />
            </td>

            {/* Editable Date */}
            <td className="px-4 py-4 min-w-[150px] w-[150px]">
                <input
                    type="date"
                    value={getInputValue(editForm.date)}
                    onChange={(e) => setEditForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-emerald-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 transition-colors"
                />
            </td>

            {/* Toggle Status */}
            <td className="px-4 py-4 min-w-[120px] w-[120px]">
                <button type="button" onClick={toggleStatus} className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:opacity-80 ${isCompleted ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400'}`}>
                    <span className="material-symbols-outlined text-[14px] mr-1">sync</span>{editForm.status}
                </button>
            </td>

            {/* Editable Amount */}
            <td className="px-4 py-4 min-w-[150px] w-[150px]">
                <div className="relative">
                    <span className={`absolute left-3 top-2 text-sm font-bold ${isIncome ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>{isIncome ? '+' : '-'}</span>
                    <input type="number" value={Math.abs(editForm.amount)} onChange={(e) => setEditForm(prev => ({ ...prev, amount: isIncome ? Math.abs(Number(e.target.value)) : -Math.abs(Number(e.target.value)) }))} className="w-full pl-7 pr-3 py-2 text-sm font-bold bg-white border border-gray-200 rounded-xl outline-none focus:border-emerald-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors" />
                </div>
            </td>

            {/* Save / Cancel Actions */}
            <td className="px-4 py-4 text-center w-24">
                <div className="flex items-center justify-center gap-1">
                    <EditActionButton mode="save" onClick={(e) => onSave(e)} />
                    <EditActionButton mode="cancel" onClick={(e) => onCancel(e)} />
                </div>
            </td>
        </tr>
    );
};