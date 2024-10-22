import styles from './AddPeopleToBoard.module.css';
import React from 'react'
import SearchUser from './../MiniComponents/SearchUser/SearchUser';
function AddPeopleToBoard() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h6>Add people to the board</h6>
      </div>
      <div className={styles.body}>
        <SearchUser/>
      </div>  
      <div className={styles.footer}>
        <button type='button'>Cancel</button>
        <button type='submit'>Add Email</button>
      </div>
    </div>
  )
}

export default AddPeopleToBoard
