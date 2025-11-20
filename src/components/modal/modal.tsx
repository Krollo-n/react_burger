import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modalOverlay/modalOverlay';
import modalStyles from './modal.module.css';
import {createPortal} from 'react-dom';
import {useEffect} from 'react';
import {FC, ReactNode} from 'react';

interface IModalProps {
  id: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose: () => void;
}

const Modal: FC<IModalProps> = ({children, id, isOpen=true, onClose}) => {
  const close = (e: any) => {
      if (e.target.id === id || e.key === 'Escape') {
        onClose();
      }
  };

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('click',  close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('click',  close);
      document.removeEventListener('keydown', close);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return createPortal(
    <ModalOverlay id={id} isOpen={isOpen}>
      <div className={modalStyles.main}>
        <CloseIcon type="primary" onClick={onClose} className={modalStyles.image}/>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById('modal')
  );
}

export default Modal;
