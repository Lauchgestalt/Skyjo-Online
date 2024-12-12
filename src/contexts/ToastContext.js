import React, { createContext, useReducer } from 'react'
import ToastsContainer from '../components/ToastsContainer'
import { toastReducer } from '../reducers/toastReducer'

export const ToastContext = createContext()

const initialState = {
    toasts: [],
}

export const ToastContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(toastReducer, initialState)

    const addToast = (type, message) => {
        const id = Math.floor(Math.random() * 100000000)
        dispatch({
            type: 'ADD_TOAST',
            payload: { id, type, message }
        })
    }

    const success = (message) => addToast('success', message);
    const error = (message) => addToast('error', message);
    const warning = (message) => addToast('warning', message);
    const info = (message) => addToast('info', message);

    const remove = (id) => {
        dispatch({
            type: 'DELETE_TOAST',
            payload: id
        })
    }

    const value = { success, warning, info, error, remove }

    return (
        <ToastContext.Provider value={value}>
            <ToastsContainer toasts={state.toasts} />
            {children}
        </ToastContext.Provider>
    )
}