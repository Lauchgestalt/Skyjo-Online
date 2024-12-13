import { useState, useEffect} from 'react';
import { DefaultTheme } from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { ThemeToggleContext } from '../contexts/ThemeContext';

import { lightTheme, darkTheme, colorfulTheme } from '../assets/Themes';

interface ShouldRenderThemeProps {
    isThemeLoaded: boolean;
    theme: DefaultTheme;
}

const shouldRenderTheme = ({
    isThemeLoaded,
    theme,
}: ShouldRenderThemeProps): boolean => {
    return isThemeLoaded && theme !== null;
};

const getSavedTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        switch (savedTheme) {
            case 'light':
                return lightTheme;
            case 'dark':
                return darkTheme;
            case 'colorful':
                return colorfulTheme;
            default:
                return lightTheme;
        }
    }
    return lightTheme;
};

const Theme = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState(lightTheme);
    const [isThemeLoaded, setIsThemeLoaded] = useState(false);

    const toggleTheme = (selectedTheme: 'light' | 'dark' | 'colorful') => {
        switch (selectedTheme) {
            case 'light':
                setTheme(lightTheme);
                localStorage.setItem('theme', 'light');
                break;
            case 'dark':
                setTheme(darkTheme);
                localStorage.setItem('theme', 'dark');
                break;
            case 'colorful':
                setTheme(colorfulTheme);
                localStorage.setItem('theme', 'colorful');
                break;
            default:
                setTheme(lightTheme);
                localStorage.setItem('theme', 'light');
        }
    };

    useEffect(() => {
        const savedTheme = getSavedTheme();
        setTheme(savedTheme);
        setIsThemeLoaded(true);
    }, []);

    const shouldRender = shouldRenderTheme({ isThemeLoaded, theme });

    if (!shouldRender) {
        return null;
    }

    return (
        <ThemeToggleContext.Provider value={{ theme, toggleTheme }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeToggleContext.Provider>
    );
};

export default Theme;