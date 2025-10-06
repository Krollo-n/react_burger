import PropTypes from 'prop-types';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modalOverlay/modalOverlay';
import modalStyles from './modal.module.css';
import {createPortal} from 'react-dom';
import {useEffect} from 'react';

function Modal({children, id, isOpen, onClose}) {
  const close = (e) => {
      if (e.target.id === id || e.key === 'Escape') {
        onClose();
      }
  };

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('click',  close);
    return () => {
      document.removeEventListener('click',  close);
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

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
