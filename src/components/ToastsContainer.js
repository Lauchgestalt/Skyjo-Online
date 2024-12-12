import React from 'react'
import Toast from './Toast'
import styled from 'styled-components'

const ToastsContainerComponent = styled.div`
    position: fixed;
    top: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    z-index: 1000;
`;

const ToastsContainer = ({ toasts }) => {
    return (
        <ToastsContainerComponent>
            {toasts.map(toast => (
                <Toast
                    key={toast.id}
                    {...toast}
                />
            ))}
        </ToastsContainerComponent>
    )
}

export default ToastsContainer