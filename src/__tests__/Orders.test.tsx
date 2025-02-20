import { render, screen, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import Orders from '@/components/orders/Orders';
import { Provider } from 'react-redux';
import { fetchOrders } from '@/store/slices/ordersSlice';
import { Store } from '@reduxjs/toolkit';
import { orders } from './mocks';

jest.mock('../store/slices/ordersSlice', () => ({
  fetchOrders: jest.fn(),
  removeOrder: jest.fn(),
  removeProductFromOrder: jest.fn()
}));

jest.mock('../store/slices/productsSlice', () => ({
  fetchProducts: jest.fn(),
  removeProduct: jest.fn()
}));

const mockStore = configureStore([]);

describe('Orders Component', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore({
      orders: { orders, isLoading: false },
      products: { products: [] }
    });
    store.dispatch = jest.fn();
  });

  test('renders orders list', () => {
    render(
      <Provider store={store}>
        <Orders />
      </Provider>
    );

    expect(screen.getByText('Компьютеры')).toBeInTheDocument();
  });

  test('dispatches fetchOrders on mount', () => {
    render(
      <Provider store={store}>
        <Orders />
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledWith(fetchOrders());
  });
});
