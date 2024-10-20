import styles from './AddPeopleToBoard.module.css';
import React from 'react'

function AddPeopleToBoard() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h6>Add people to the board</h6>
      </div>
      <div className={styles.body}>
        <input type='text' placeholder='Enter the email'/>
          
      </div>  
      <div className={styles.footer}>
        <button type='button' ></button>
      </div>
    </div>
  )
}

export default AddPeopleToBoard
