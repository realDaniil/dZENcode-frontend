import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import myAxios from '@/myAxios';
import { ProductProps } from '@/types';
import { RootState } from '@/store';

interface ProductsState {
  products: ProductProps[];
  isLoading: boolean;
  fetched: boolean;
}

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  fetched: false,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { getState }) => {
  const state = getState() as RootState;
  if (state.products.fetched) return state.products.products;

  const { data } = await myAxios.get('api/products');
  return data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    removeProductsByOrderId: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.order !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
        state.fetched = true;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { removeProduct, removeProductsByOrderId } = productsSlice.actions;
export default productsSlice.reducer;
