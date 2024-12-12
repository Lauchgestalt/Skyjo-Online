import { ToastType } from '../types/toast';

interface State {
  toasts: ToastType[];
}

interface AddToastAction {
  type: 'ADD_TOAST';
  payload: ToastType;
}

interface DeleteToastAction {
  type: 'DELETE_TOAST';
  payload: string;
}

type Action = AddToastAction | DeleteToastAction;

const initialState: State = { toasts: [] };

export const toastReducer = (
  state: State = initialState,
  action: Action
): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    case 'DELETE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload),
      };
    default:
      return state;
  }
};
