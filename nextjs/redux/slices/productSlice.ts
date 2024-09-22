import { Product } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  items: Product[];
}

const initialState: ProductState = {
  items: []
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>): void => {
      state.items.push(action.payload);
    },
    removeArchivedItem: (state, action: PayloadAction<number>): void => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  },
});

export const { addProduct, removeArchivedItem } = productSlice.actions;
export default productSlice.reducer;