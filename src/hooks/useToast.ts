import { useContext } from 'react';
import { ToastContext } from '../contexts/ToastContext';
import { ToastContextType } from '../types/toast';

export const useToast = (): ToastContextType => useContext(ToastContext);
