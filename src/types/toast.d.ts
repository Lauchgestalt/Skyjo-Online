export interface ToastType {
  id: string;
  type: string;
  message: string;
}

export interface ToastContextType {
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
  remove: (id: string) => void;
}
