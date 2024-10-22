import styles from './DeleteComponent.module.css';
import React from 'react'

function DeleteComponent() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>Are you sure you want to Delete?</h4>
      </div>
      <div className={styles.body}>
        <button type='submit'>Yes, Delete</button>
        <button type='button'>Cancel</button>
      </div>
    </div>
  )
}

export default DeleteComponent
