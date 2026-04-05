import React from 'react';

const EditActionButton = ({
    onClick,
    mode = 'edit', // 'edit', 'save', or 'cancel'
    title = '',
    className = ''
}) => {
    // Config map for different modes to keep the JSX clean
    const configs = {
        edit: {
            icon: 'edit',
            colors: 'text-gray-400 hover:bg-blue-50 hover:text-blue-500 dark:text-gray-500 dark:hover:bg-blue-500/10 dark:hover:text-blue-400',
            defaultTitle: 'Edit Transaction'
        },
        save: {
            icon: 'check_circle',
            colors: 'text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-500/10',
            defaultTitle: 'Save Changes'
        },
        cancel: {
            icon: 'cancel',
            colors: 'text-gray-400 hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-gray-800',
            defaultTitle: 'Cancel'
        }
    };

    const config = configs[mode];

    return (
        <button
            type="button"
            onClick={onClick}
            className={`cursor-pointer rounded-lg p-1.5 transition-all duration-200 flex items-center justify-center ${config.colors} ${className}`}
            title={title || config.defaultTitle}
        >
            <span className="material-symbols-outlined text-[20px]">
                {config.icon}
            </span>
        </button>
    );
};

export default EditActionButton;