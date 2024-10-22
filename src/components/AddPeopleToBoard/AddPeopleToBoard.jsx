import styles from './AddPeopleToBoard.module.css';
import React from 'react'
import SearchUser from './../MiniComponents/SearchUser/SearchUser';
import { useState } from 'react';
function AddPeopleToBoard() {
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h6>Add people to the board</h6>
      </div>
      <div className={styles.body}>
        <SearchUser selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
        <p>{selectedUser?selectedUser.name:""}</p>
      </div>  
      <div className={styles.footer}>
        <button type='button'>Cancel</button>
        <button type='submit'>Add Email</button>
      </div>
    </div>
  )
}

export default AddPeopleToBoard
