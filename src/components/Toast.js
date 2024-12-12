import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheckCircle, faTimesCircle, faExclamationTriangle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "../hooks/useToast";

const toastTypes = {
    success: {
        icon: faCheckCircle,
        iconClass: 'text-green-400',
        progressBarClass: 'bg-green-400',
    },
    error: {
        icon: faTimesCircle,
        iconClass: 'text-red-400',
        progressBarClass: 'bg-red-400',
    },
    warning: {
        icon: faExclamationTriangle,
        iconClass: 'text-yellow-400',
        progressBarClass: 'bg-yellow-400',
    },
    info: {
        icon: faInfoCircle,
        iconClass: 'text-blue-400',
        progressBarClass: 'bg-blue-400',
    },
    default: {
        icon: faInfoCircle,
        iconClass: 'text-blue-400',
        progressBarClass: 'bg-blue-400',
    },
}

const progress = keyframes`
    0% {
        width: 100%;
    }
    100% {
        width: 0%;
    }
`;

const slideIn = keyframes`
    0% {
        opacity: 0;
        transform: translateX(100%);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
`;

const slideOut = keyframes`
    0% {
        opacity: 1;
        transform: translateX(0);
    }
    100% {
        opacity: 0;
        transform: translateX(100%);
    }
`;

const ToastIcon = styled(FontAwesomeIcon)`
    color: ${props => props.theme.colors.text};
    `;

const ToastComponent = styled.div`
    display: flex;
    align-items: center;
    background-color: ${props => props.theme.colors.background};
    box-shadow: ${props => props.theme.neumorphism.boxShadow};
    border-radius: 8px;
    padding: 16px;
    position: relative;
    width: 320px;
    overflow: hidden;
    user-select: none;
    animation: ${slideIn} 0.4s ease-in-out forwards;

    &.dismissed {
        animation: ${slideOut} 0.4s ease-in-out forwards;
    }
`;

const ToastMessage = styled.p`
    color: ${props => props.theme.colors.text};
    font-size: 14px;
    font-weight: 500;
    margin: 0;
    margin-left: 12px;
    `;

const ToastProgress = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: rgba(0, 0, 0, 0.1);
    `;

const ToastProgressBar = styled.div`
    height: 100%;
    animation: ${progress} 4s linear forwards;
    
    &.success {
        background-color: ${props => props.theme.colors.accentColors.green};
    }

    &.error {
        background-color: ${props => props.theme.colors.accentColors.red};
    }

    &.warning {
        background-color: ${props => props.theme.colors.accentColors.yellow};
    }

    &.info {
        background-color: ${props => props.theme.colors.accentColors.blue};
    }
    `;

const ToastDismissButton = styled.button`
    border: none;
    background: none;
    margin-left: auto;
    cursor: pointer;
    `;

const Toast = ({ message, type, id }) => {
    const [dismissed, setDismissed] = useState(false);

    const { icon, iconClass, progressBarClass } = toastTypes[type];
    const toast = useToast();

    const timerID = useRef(null);
    const progressRef = useRef(null);

    const handleDismiss = () => {
        setDismissed(true);
        setTimeout(() => {
            toast.remove(id);
        }, 400);
    }

    const handleMouseEnter = () => {
        clearTimeout(timerID.current);
        progressRef.current.style.animationPlayState = 'paused';
    }

    const handleMouseLeave = () => {
        const remainingTime = (progressRef.current.offsetWidth / progressRef.current.parentElement.offsetWidth) * 4000;

        progressRef.current.style.animationPlayState = 'running';

        timerID.current = setTimeout(() => {
            handleDismiss();
        }, remainingTime);
    }

    useEffect(() => {
        timerID.current = setTimeout(() => {
            handleDismiss();
        }, 4000);

        return () => clearTimeout(timerID.current);
    }, [])

    return (
        <ToastComponent
            className={`${dismissed ? 'dismissed' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span className={iconClass}><ToastIcon icon={icon} /></span>
            <ToastMessage>{message}</ToastMessage>
            <ToastDismissButton onClick={handleDismiss}>
                <ToastIcon icon={faTimes} />
            </ToastDismissButton>

            <ToastProgress>
                <ToastProgressBar ref={progressRef} className={`${type}`}></ToastProgressBar>
            </ToastProgress>
        </ToastComponent>
    )
}

export default Toast