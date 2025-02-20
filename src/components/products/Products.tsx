'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, removeProduct } from '@/store/slices/productsSlice';
import Product from './Product';
import Loader from '../UI/Loader';
import { ProductProps } from '@/types';
import Modal from '../UI/Modal';
import { AppDispatch, RootState } from '@/store';
import cl from './styles.module.scss';
import LilText from '../UI/LilText';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchOrders, removeProductFromOrder } from '@/store/slices/ordersSlice';

export default function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, isLoading, fetched } = useSelector((state: RootState) => state.products);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('none');
  const baseURL = process.env.NEXT_PUBLIC_BACK_URL;

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchOrders());
  }, [dispatch, products.length]);

  const handleDelete = async () => {
    if (selectedProduct) {
      dispatch(removeProduct(selectedProduct.id));
      dispatch(removeProductFromOrder(selectedProduct.id));
      setIsOpen(false);
    }
  };

  const openModal = (product: ProductProps) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  const filteredProducts = filterType === 'all' ? products : products.filter((product) => product.type === filterType);
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    if (sortOrder === 'oldest') return dateA - dateB;
    if (sortOrder === 'newest') return dateB - dateA;
    return 0;
  });

  return (
    <>
      <div className={`${cl.topHolder} d-flex justify-content-between align-items-center`}>
        <h2>Список продуктов / {sortedProducts.length}</h2>
        <div className="d-flex gap-3 mb-3">
          <select className="form-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">Все типы</option>
            <option value="Desktop">Компьютеры</option>
            <option value="Smartphone">Смартфоны</option>
            <option value="Other">Другое</option>
          </select>
          <select className="form-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="none">Без сортировки</option>
            <option value="oldest">От старого к новому</option>
            <option value="newest">От нового к старому</option>
          </select>
        </div>
      </div>
      {isLoading && <Loader />}
      {sortedProducts.length === 0 && !isLoading ? (
        <p>Продукты не найдены</p>
      ) : (
        <AnimatePresence>
          {sortedProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 1, scale: 1, height: 'auto' }}
              exit={{ opacity: 0, scale: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Product product={product} onOpen={() => openModal(product)} />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
      <Modal title="Вы уверены, что хотите удалить этот товар?" isOpen={isOpen} onAction={handleDelete} onClose={closeModal}>
        {selectedProduct && (
          <div className="d-flex mt-2 gap-4">
            <img src={baseURL + selectedProduct.photo} alt={selectedProduct.title} width={60} height={60} loading="lazy" />
            <div>
              <p className="fw-bold">{selectedProduct.title}</p>
              <LilText>{selectedProduct.specification}</LilText>
              <LilText>{selectedProduct.serialNumber}</LilText>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
