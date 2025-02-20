import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, removeOrder, removeProductFromOrder } from '@/store/slices/ordersSlice';
import { fetchProducts, removeProduct, removeProductsByOrderId } from '@/store/slices/productsSlice';
import { AppDispatch, RootState } from '@/store';
import Loader from '../UI/Loader';
import Order from './Order';
import { OrderProps, ProductProps } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { FaTrashAlt } from 'react-icons/fa';
import { formatDate, getDeclinedWord } from '@/utils';
import Modal from '../UI/Modal';
import LilText from '../UI/LilText';

const baseURL = process.env.NEXT_PUBLIC_BACK_URL;

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: () => void;
  deleteTarget: { type: 'order' | 'product'; order: OrderProps; product?: ProductProps } | null;
}

const CommonModal = ({ isOpen, onClose, onAction, deleteTarget }: CommonModalProps) => {
  return (
    <Modal
      title={`Вы уверены, что хотите удалить ${deleteTarget?.product ? 'продукт' : 'заказ'}?`}
      isOpen={isOpen}
      onAction={onAction}
      onClose={onClose}
    >
      {deleteTarget?.product ? (
        <div className="d-flex mt-2 gap-4">
          <img
            src={baseURL + deleteTarget.product.photo}
            alt={deleteTarget.product.title}
            width={60}
            height={60}
            loading="lazy"
          />
          <div>
            <p className="fw-bold">{deleteTarget.product.title}</p>
            <LilText>{deleteTarget.product.specification}</LilText>
            <LilText>{deleteTarget.product.serialNumber}</LilText>
          </div>
        </div>
      ) : (
        <div>
          <p className="h5">{deleteTarget?.order.title}</p>
          <p className="text-muted my-1">
            {deleteTarget?.order.products.length} {deleteTarget && getDeclinedWord('Продукт', deleteTarget.order.products.length)}
          </p>
          <LilText>{deleteTarget && formatDate(deleteTarget.order.date, 'word', ' / ')}</LilText>
        </div>
      )}
    </Modal>
  );
};

export default function Orders() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, isLoading } = useSelector((state: RootState) => state.orders);
  const [activeOrder, setActiveOrder] = useState<null | OrderProps>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'order' | 'product';
    order: OrderProps;
    product?: ProductProps;
  } | null>(null);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts());
  }, [dispatch, orders.length]);

  const openDeleteModal = (type: 'order' | 'product', order: OrderProps, product?: ProductProps) => {
    setDeleteTarget({ type, order, product });
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      if (deleteTarget.type === 'order') {
        dispatch(removeOrder(deleteTarget.order.id));
        dispatch(removeProductsByOrderId(deleteTarget.order.id));
      } else if (deleteTarget.type === 'product' && deleteTarget.product) {
        dispatch(removeProductFromOrder(deleteTarget.product.id));
        dispatch(removeProduct(deleteTarget.product.id));
        if (activeOrder && activeOrder.products) {
          setActiveOrder({
            ...activeOrder,
            products: activeOrder.products.filter((product) => product.id !== deleteTarget.product?.id)
          });
        }
      }
      setModalOpen(false);
    }
  };

  return (
    <>
      <div className="d-flex gap-4">
        <div style={Boolean(activeOrder) ? { width: 380 } : { width: '100%' }}>
          {isLoading && <Loader />}
          {orders.length === 0 && !isLoading ? (
            <p>Данных нет</p>
          ) : (
            <AnimatePresence>
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ minWidth: 220 }}
                >
                  <Order
                    order={order}
                    setOrder={(order) => setActiveOrder(order)}
                    isListOpen={Boolean(activeOrder)}
                    isActive={activeOrder?.id === order.id}
                    onDelete={openDeleteModal}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
        {activeOrder && (
          <div className="w-100 card" style={{ minWidth: 350 }}>
            <h2 className="m-4">{activeOrder.title}</h2>
            {!activeOrder.products.length && <p style={{ padding: 30 }}>Заказ пуст</p>}
            <AnimatePresence>
              {activeOrder.products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="d-flex justify-content-between align-items-center py-1 px-4 border-top"
                >
                  <div className="d-flex align-items-center gap-4">
                    <img src={baseURL + product.photo} alt={product.title} width={60} height={60} loading="lazy" />
                    <div>
                      <p>{product.title}</p>
                      <p className="text-muted">{product.serialNumber}</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-4">
                    {product.isNew ? <p className="text-success">Новинка</p> : <p className="text-warning">Б/У</p>}
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => openDeleteModal('product', activeOrder, product)}
                    >
                      <FaTrashAlt style={{ position: 'relative', bottom: '2px' }} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <CommonModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onAction={confirmDelete} deleteTarget={deleteTarget} />
    </>
  );
}
