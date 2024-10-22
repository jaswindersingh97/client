import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, Component =()=>(<div></div>) }) => {
  if (!isOpen) return null; 
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <Component />
      </div>
    </div>
  );
};

export default Modal;
