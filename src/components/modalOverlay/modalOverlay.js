import PropTypes from 'prop-types';
import modalOverlayStyles from './modalOverlay.module.css';

function ModalOverlay({id, isOpen, children}) {
  const openClass = isOpen ? ` ${modalOverlayStyles.open}` : '';
  return (
    <div id={id} className={`${modalOverlayStyles.main}${openClass}`}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default ModalOverlay;
