import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faIceCream, faMoon } from '@fortawesome/free-solid-svg-icons';

import { useTheme } from '../assets/Theme';

const ThemeToggleContainer = styled.div`
    display: inline-block;
    padding: 0px 3px;
    border-radius: 20px;
    position: relative;
    border: 2px solid #95a5a6;
    `;

const ThemeToggleLabel = styled.label`
    text-align: center;
    display: inline-block;
    color: #95a5a6;
    position: relative;
    z-index: 2;
    margin: 0;
    padding: 2px 3px;
    font-size: 15px;
    `;

const ThemeToggleInput = styled.input`
    position: absolute;
    z-index: 3;
    opacity: 0;
    cursor: pointer;
    height: 100%;

    &[value="light"]:checked ~ span {
        background: #bbbb11;
        left: 3px;
    }
    
    &[value="color"]:checked ~ span {
        background: #ee5599;
        left: 23px;
    }
    
    &[value="dark"]:checked ~ span {
        background: #555;
        left: 41px;
    }

    &[value="light"]:checked + ${ThemeToggleLabel},
    &[value="color"]:checked + ${ThemeToggleLabel},
    &[value="dark"]:checked + ${ThemeToggleLabel} {
        color: #dedede;
    }
    `;

const ThemeToggleSpan = styled.span`
    height: 21px;
    width: 21px;
    line-height: 21px;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    left: 23px;
    top: 3px;
    transition: all 0.3s ease-in-out;
    `;

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <ThemeToggleContainer>
            <ThemeToggleInput type="radio" name="toggle" checked={theme.name === 'light'} value="light" onChange={(e) => { toggleTheme('light') }} />
            <ThemeToggleLabel><FontAwesomeIcon icon={faSun} /></ThemeToggleLabel>
            <ThemeToggleInput type="radio" name="toggle" checked={theme.name === 'colorful'} value="color" onChange={(e) => { toggleTheme('colorful') }} />
            <ThemeToggleLabel><FontAwesomeIcon icon={faIceCream} /></ThemeToggleLabel>
            <ThemeToggleInput type="radio" name="toggle" checked={theme.name === 'dark'} value="dark" onChange={(e) => { toggleTheme('dark') }} />
            <ThemeToggleLabel><FontAwesomeIcon icon={faMoon} /></ThemeToggleLabel>
            <ThemeToggleSpan />
        </ThemeToggleContainer>
    )
}

export default ThemeToggle