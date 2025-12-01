/**
 * Componente molecular: Modal
 * Modal reutilizable con overlay y manejo de cierre
 */
import PropTypes from 'prop-types';
import Button from '../atoms/Button';

function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children,
  footer,
  size = 'medium'
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={`modal-content modal-${size}`}
        onClick={e => e.stopPropagation()}
      >
        {title && (
          <div className="modal-header">
            <h2>{title}</h2>
            <Button 
              variant="icon" 
              onClick={onClose}
              className="modal-close"
            >
              ✕
            </Button>
          </div>
        )}
        <div className="modal-body">
          {children}
        </div>
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

export default Modal;
