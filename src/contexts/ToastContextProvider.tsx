import { useReducer, ReactNode } from 'react';
import ToastsContainer from '../components/ToastsContainer';
import { toastReducer } from '../reducers/toastReducer';
import { ToastType } from '../types/toast';
import { ToastContext } from '../contexts/ToastContext';

const initialState = {
    toasts: [] as ToastType[],
};

export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(toastReducer, initialState);

    const addToast = (type: string, message: string): void => {
        const id: string = Math.floor(Math.random() * 100000000).toString();
        dispatch({
            type: 'ADD_TOAST',
            payload: { id, type, message } as ToastType,
        });
    };

    const success = (message: string) => addToast('success', message);
    const error = (message: string) => addToast('error', message);
    const warning = (message: string) => addToast('warning', message);
    const info = (message: string) => addToast('info', message);

    const remove = (id: string) => {
        dispatch({
            type: 'DELETE_TOAST',
            payload: id,
        });
    };

    const value = { success, warning, info, error, remove };

    return (
        <ToastContext.Provider value={value}>
            <ToastsContainer toasts={state.toasts} />
            {children}
        </ToastContext.Provider>
    );
};
