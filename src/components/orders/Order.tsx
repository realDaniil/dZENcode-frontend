import { OrderProps, ProductProps } from '@/types';
import Card from '../UI/Card';
import { FaChevronRight, FaList, FaTrashAlt } from 'react-icons/fa';
import { formatDate, formatPrice, getDeclinedWord, truncateString } from '@/utils';
import LilText from '../UI/LilText';
import cl from './styles.module.scss';

interface OrderInterface {
  order: OrderProps;
  setOrder: (order: OrderProps | null) => void;
  isActive: boolean;
  isListOpen: boolean;
  onDelete: (type: 'order' | 'product', order: OrderProps, product?: ProductProps) => void;
}

export default function Order({ order, setOrder, isActive, isListOpen, onDelete }: OrderInterface) {
  const totalUAH = order.products.reduce((sum, product) => {
    const priceUAH = product.price.find((p) => p.symbol === 'UAH')?.value || 0;
    return sum + priceUAH;
  }, 0);

  const totalUSD = order.products.reduce((sum, product) => {
    const priceUSD = product.price.find((p) => p.symbol === 'USD')?.value || 0;
    return sum + priceUSD;
  }, 0);

  return (
    <Card className="flex position-relative" style={{ width: '100%', padding: isListOpen ? '1rem 3rem 1rem 1rem' : '1rem' }}>
      {!isListOpen && (
        <p className="fw-bold" style={{ minWidth: 100 }}>
          {truncateString(order.title, 50)}
        </p>
      )}
      <div className="round-btn" onClick={() => setOrder(isActive ? null : order)}>
        <FaList color="grey" />
      </div>
      <div className="d-flex flex-column">
        <p className="text-center">{order.products.length}</p>
        <LilText style={{ fontSize: 'clamp(8px, 1vw, 12px)' }}>{getDeclinedWord('Продукт', order.products.length)}</LilText>
      </div>
      <p>{formatDate(order.date, 'word', ' / ')}</p>
      {!isListOpen && (
        <div>
          <LilText>{formatPrice(totalUSD)} $</LilText>
          <p className="fw-bold">{formatPrice(totalUAH)} UAH</p>
        </div>
      )}
      {!isListOpen && (
        <button type="button" className="btn btn-danger" onClick={() => onDelete('order', order)}>
          <FaTrashAlt />
        </button>
      )}
      {isListOpen && (
        <div className={`${cl.arrowHolder} ${isActive ? cl.active : ''}`} onClick={() => setOrder(isActive ? null : order)}>
          <FaChevronRight className={cl.arrow} color="white" />
        </div>
      )}
    </Card>
  );
}
