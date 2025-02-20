'use client';
import { FaTimes } from 'react-icons/fa';
import cl from './styles.module.scss';
import AnimatedWrapper from '../AnimatedWrapper';

export default function Modal({
  title,
  isOpen,
  children,
  onAction,
  onClose
}: {
  title: string;
  isOpen: boolean;
  children?: React.ReactNode;
  onAction: () => void;
  onClose: () => void;
}) {
  const closeHandler = () => {
    onClose();
  };

  const actionHandler = () => {
    onAction();
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className={`${cl.modal} ${cl.visible}`} onClick={closeHandler}>
          <AnimatedWrapper>
            <div className={cl.content} onClick={(e) => e.stopPropagation()}>
              <FaTimes onClick={closeHandler} className={cl.closeButton + ' my-btn'} />
              <div className={cl.header}>
                <p className={'h6 mb-4'}>{title}</p>
                <div className={cl.childrenHolder}>{children}</div>
              </div>
              <div className={cl.buttonsHolder}>
                <button type="button" className="btn btn-link text-white" onClick={closeHandler}>
                  Отменить
                </button>
                <button type="button" className="btn btn-danger" onClick={actionHandler}>
                  Удалить
                </button>
              </div>
            </div>
          </AnimatedWrapper>
        </div>
      )}
    </>
  );
}
