import modalOverlayStyles from './modalOverlay.module.css';
import {ReactNode} from 'react';

interface IModalOverlayProps {
  id: string;
  isOpen?: boolean;
	children: ReactNode | null
}

const ModalOverlay = ({id, isOpen, children}: IModalOverlayProps) => {
  const openClass = isOpen ? ` ${modalOverlayStyles.open}` : '';
  return (
    <div id={id} className={`${modalOverlayStyles.main}${openClass}`}>
      {children}
    </div>
  );
}

export default ModalOverlay;
