import React from 'react';
import ExportButton from '../ui/ExportButton';
import FadeIn from '../ui/FadeIn';

const TransactionHeader = ({ data }) => {

    const exportToJSON = () => {
        const fileName = `zorvyn_transactions_${new Date().toISOString().split('T')[0]}`;
        const jsonStr = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${fileName}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const exportToCSV = () => {
        if (data.length === 0) return;

        const fileName = `zorvyn_transactions_${new Date().toISOString().split('T')[0]}`;

        // Get headers from the first object keys
        const headers = Object.keys(data[0]).join(',');

        // Map rows
        const rows = data.map(tx => {
            return Object.values(tx).map(value => {
                // Handle commas or quotes in values
                const str = String(value).replace(/"/g, '""');
                return `"${str}"`;
            }).join(',');
        });

        const csvContent = [headers, ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${fileName}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 transition-colors duration-200">
            {/* 1. Animate Title */}
            <FadeIn delay={0.1}>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Transactions</h1>
                    <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">Manage and track your financial history</p>
                </div>
            </FadeIn>

            {/* 2. Animate Export Buttons */}
            <FadeIn delay={0.2} className="flex items-center gap-3">
                <ExportButton
                    onClick={exportToCSV}
                    icon="download"
                    label="Export CSV"
                />
                <ExportButton
                    onClick={exportToJSON}
                    icon="data_object"
                    label="Export JSON"
                />
            </FadeIn>
        </div>
    );
};

export default TransactionHeader;