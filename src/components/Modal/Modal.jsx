import React from 'react';
import styles from './Modal.module.css'; // Assuming you create a CSS file for styling

const Modal = ({ isOpen, onClose, Component }) => {
  if (!isOpen) return null; // Return null if the modal is not open

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <Component /> {/* Render the passed component */}
      </div>
    </div>
  );
};

export default Modal;
