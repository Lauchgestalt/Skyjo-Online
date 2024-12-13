import { createContext, useContext } from 'react';
import { DefaultTheme } from 'styled-components';

interface ThemeContextType {
  theme: DefaultTheme;
  toggleTheme: (selectedTheme: 'light' | 'dark' | 'colorful') => void;
}

export const ThemeToggleContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const useTheme = () => {
    const context = useContext(ThemeToggleContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};