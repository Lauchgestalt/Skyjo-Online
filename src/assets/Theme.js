import React, { createContext, useContext, useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'

const defaults = {
    name: 'default',
    colors: {
        background: '#fff',
        text: '#000',
        accentText: '#f39bd7',
        accentColors: {
            blue: '#3D6EAA',
            green: '#5DBB63',
            yellow: '#EBA834',
            red: '#CC4B4C',
        }
    },
    fonts: {
        body: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        heading: 'Parkinsans, sans-serif',
    },
    fontSizes: {
        xsmall: '0.8rem',
        small: '1rem',
        medium: '1.5rem',
        large: '3rem',
        xlarge: '4.5rem',
    },
    fontWeights: {
        light: 100,
        regular: 300,
        bold: 500,
    },
    neumorphism: {
        background: '#dedede',
        pressedBackground: 'linear-gradient(145deg, #c8c8c8, #eee)',
        boxShadow: '3px 3px 6px #bdbdbd, -3px -3px 6px #fff',
        inverseBoxShadow: 'inset 3px 3px 6px #bdbdbd, inset -3px -3px 6px #fff',
        borderRadius: '20px',
    },
}

const lightTheme = {
    ...defaults,
    name: 'light',
    colors: {
        ...defaults.colors,
        background: '#dedede',
        text: '#000',
        accentText: '#f39bd7',
    }
}

const darkTheme = {
    ...defaults,
    name: 'dark',
    colors: {
        ...defaults.colors,
        background: '#222',
        text: '#fff',
        accentText: '#f39bd7',
        accentColors: {
            blue: '#4A90E2',
            green: '#7ED321',
            yellow: '#F5A623',
            red: '#D0021B',
            moon: '#4A90E2',
        }
    },
    neumorphism: {
        background: '#222',
        pressedBackground: 'linear-gradient(145deg, #1f1f1f, #242424)',
        boxShadow: '3px 3px 6px #111, -3px -3px 6px #333; ',
        inverseBoxShadow: 'inset 3px 3px 6px #111, inset -3px -3px 6px #333; ',
        borderRadius: '20px',
    },
}

const colorfulTheme = {
    ...defaults,
    name: 'colorful',
    colors: {
        ...defaults.colors,
        background: '#f39bd7',
        text: '#373737',
        accentText: '#333',
        accentColors: {
            blue: '#769ECB',
            green: '#90C978',
            yellow: '#F9CC74',
            red: '#F07F78',
            moon: '#f39bd7',
        }
    },
    neumorphism: {
        background: '#f39bd7',
        pressedBackground: 'linear-gradient(145deg, #db8cc2, #ffa6e6);',
        boxShadow: '3px 3px 6px #cf84b7, -3px -3px 6px #ffb2f7',
        inverseBoxShadow: 'inset 3px 3px 6px #cf84b7, inset -3px -3px 6px #ffb2f7',
        borderRadius: '20px',
    },
}

const ThemeToggleContext = createContext()

export const useTheme = () => {
    return useContext(ThemeToggleContext)
}

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

const Theme = ({ children }) => {
    const [theme, setTheme] = useState(lightTheme)
    const [isThemeLoaded, setIsThemeLoaded] = useState(false)

    const toggleTheme = (selectedTheme) => {
        switch (selectedTheme) {
            case 'light':
                setTheme(lightTheme)
                localStorage.setItem('theme', 'light');
                break
            case 'dark':
                setTheme(darkTheme)
                localStorage.setItem('theme', 'dark');
                break
            case 'colorful':
                setTheme(colorfulTheme)
                localStorage.setItem('theme', 'colorful');
                break
            default:
                setTheme(lightTheme)
                localStorage.setItem('theme', 'light');
        }
    }

    useEffect(() => {
        const savedTheme = getSavedTheme();
        setTheme(savedTheme);
        setIsThemeLoaded(true);
    }, [])

    if (!isThemeLoaded || !theme || theme === null) {
        return null; 
    }

    return (
        <ThemeToggleContext.Provider value={{ theme, toggleTheme }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeToggleContext.Provider>
    )
}

export default Theme