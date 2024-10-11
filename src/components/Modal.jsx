import styles from "./Modal.module.css";
import PropTypes from "prop-types";

function Modal({ children, onClose }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired, // Validate the children prop
  onClose: PropTypes.func.isRequired, // Validate the onClose function
};

export default Modal;
