import React, { useState, useEffect } from 'react';
import AnimatedThemeSwitch from '../ui/AnimatedThemeSwitch';

const ThemeToggle = () => {
    // Check local storage or system preference on initial load
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                return savedTheme === 'dark';
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    // Apply the class to the <html> tag whenever the state changes
    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <AnimatedThemeSwitch
            isDark={isDark}
            onToggle={() => setIsDark(!isDark)}
        />
    );
};

export default ThemeToggle;