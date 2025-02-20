import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import myAxios from '@/myAxios';
import { OrderProps } from '@/types';
import { RootState } from '@/store';
import { removeProductsByOrderId, removeProduct } from './productsSlice';

interface OrdersState {
  orders: OrderProps[];
  isLoading: boolean;
  fetched: boolean;
}

const initialState: OrdersState = {
  orders: [],
  isLoading: false,
  fetched: false,
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, { getState }) => {
  const state = getState() as RootState;
  if (state.orders.fetched) return state.orders.orders;

  const { data } = await myAxios.get('api/orders');
  return data;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    removeOrder: (state, action: PayloadAction<number>) => {
      state.orders = state.orders.filter((order) => order.id !== action.payload);
    },
    removeProductFromOrder: (state, action: PayloadAction<number>) => {
      state.orders.forEach((order) => {
        order.products = order.products.filter((product) => product.id !== action.payload);
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
        state.fetched = true;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { removeOrder, removeProductFromOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
