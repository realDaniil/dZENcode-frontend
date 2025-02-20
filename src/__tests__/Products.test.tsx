import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import Products from '@/components/products/Products';
import { Provider } from 'react-redux';
import { fetchProducts } from '@/store/slices/productsSlice';
import { Store } from '@reduxjs/toolkit';
import { products } from './mocks';

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

describe('Products Component', () => {
  let store: Store;

  beforeEach(() => {
    store = mockStore({
      products: {
        products,
        isLoading: false
      }
    });
    store.dispatch = jest.fn();
  });

  test('renders products list', () => {
    render(
      <Provider store={store}>
        <Products />
      </Provider>
    );

    expect(screen.getByText('Gaming PC Alpha')).toBeInTheDocument();
  });

  test('dispatches fetchProducts on mount', () => {
    render(
      <Provider store={store}>
        <Products />
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledWith(fetchProducts());
  });
});
