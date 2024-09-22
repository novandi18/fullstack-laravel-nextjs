export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface Product {
  id: number;
  product_name: string;
  category: string;
  price: number;
  discount?: number;
}

export interface ProductForm {
  product_name: string;
  category: string;
  price: string;
  discount?: string;
}

export interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
}
