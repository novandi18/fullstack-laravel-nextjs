import { ApiResponse, Product, ProductForm } from "@/types";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api"
});

export const getAllProducts = async (): Promise<ApiResponse<Product[]>> => {
  try {
    const response = await api.get('/products');
    return response.data
  } catch (error) {
    console.error('Error fetching all products:', error);
    return { success: false, error: 'Error fetching all products' };
  }
};

export const getProductById = async (id: number): Promise<ApiResponse<Product>> => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return { success: false, error: `Error fetching product with ID ${id}` };
  }
};

export const createProduct = async (data: ProductForm): Promise<ApiResponse<Product>> => {
  try {
    const response = await api.post('/products', data);
    return response.data
  } catch (error) {
    console.error('Error creating product:', error);
    return { success: false, error: 'Error creating product' };
  }
};

export const updateProduct = async (id: number, data: ProductForm): Promise<ApiResponse<Product>> => {
  try {
    const response = await api.put(`/products/${id}`, data);
    return response.data
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    return { success: false, error: `Error updating product with ID ${id}` };
  }
};

export const deleteProductById = async (id: number): Promise<ApiResponse<void>> => {
  try {
    await api.delete(`/products/${id}`);
    return { success: true };
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    return { success: false, error: `Error deleting product with ID ${id}` };
  }
};
