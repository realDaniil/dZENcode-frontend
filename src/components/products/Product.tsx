import { ProductProps } from '@/types';
import { FaTrashAlt } from 'react-icons/fa';
import Card from '../UI/Card';
import { formatDate, formatPrice, truncateString } from '@/utils';
import cl from './styles.module.scss';

export default function Product({
  product,
  onOpen,
  isPreview = false
}: {
  product: ProductProps;
  onOpen?: () => void;
  isPreview?: boolean;
}) {
  const defaultPrice = product.price.find((p) => p.isDefault);
  const additionalPrice = product.price.find((p) => !p.isDefault);
  const baseURL = process.env.NEXT_PUBLIC_BACK_URL;

  return (
    <Card style={{ minWidth: 780 }} className={cl.card}>
      <div className="row w-100 align-items-center">
        <div className="col-auto">
          <img src={baseURL + product.photo} alt={product.title} width={60} height={60} loading="lazy" />
        </div>
        <div className="col">
          <p className="mb-1 fw-bold">{truncateString(product.title, 80)}</p>
          <p className="text-muted mb-0">{truncateString(product.specification, 80)}</p>
        </div>
        <div className="col-auto text-end">
          <p className="mb-1">с {formatDate(new Date(product.guarantee.start), 'number', ' / ')}</p>
          <p className="mb-0">по {formatDate(new Date(product.guarantee.end), 'number', ' / ')}</p>
        </div>
        <div className="col-auto text-center" style={{ minWidth: 90 }}>
          {product.isNew ? <p className="text-success mb-0">Новинка</p> : <p className="text-warning mb-0">Б/У</p>}
        </div>
        <div className="col-auto text-end">
          {additionalPrice && (
            <p className="mb-0">
              {formatPrice(additionalPrice.value)} {additionalPrice.symbol}
            </p>
          )}
          {defaultPrice && (
            <p className="fw-bold mb-0" style={{ minWidth: 60 }}>
              {formatPrice(defaultPrice.value)} {defaultPrice.symbol}
            </p>
          )}
        </div>
        <div className="col-auto text-end" style={{ minWidth: 100 }}>
          <p className="mb-0">{product.orderTitle}</p>
          <p className="fw-bold mb-0">#{product.serialNumber}</p>
        </div>
        <div className="col-auto" style={{ minWidth: 120 }}>
          <p className="mb-0">{formatDate(new Date(product.date), 'word', ' / ')}</p>
        </div>
        {!isPreview && (
          <div className="col-auto">
            <button type="button" className="btn btn-danger btn-sm" onClick={onOpen}>
              <FaTrashAlt style={{ position: 'relative', bottom: '2px' }} />
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}
