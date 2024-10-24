import styles from './AddPeopleToBoard.module.css';
import React, { useContext, useState } from 'react';
import SearchUser from './../MiniComponents/SearchUser/SearchUser';
import { AppContext } from '../../Context/AppContext';
import { apiRequest } from '../../Apis';

function AddPeopleToBoard() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [error,setError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to track submission
  const { closeModal, token } = useContext(AppContext);

  const SubmitClk = async () => {
    if(!selectedUser){
      setError(true);
    }
    try {
      const response = await apiRequest({
        endpoint: '/secure/shareBoard',
        method: 'patch',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data: {
          'sharedWith': selectedUser._id
        }
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error sharing the board:", error);
    }
  };

  return (
    <div className={styles.container}>
      {isSubmitted ? ( 
        <div className={styles.successMessage}>
          <h3>{selectedUser.email} added to board!</h3>
          <button className={styles.submit} onClick={closeModal}>Okay, got it! </button>
        </div>
      ) : ( 
        <>
          <div className={styles.header}>
            <h3>Add people to the board</h3>
          </div>
          <div className={styles.body}>
            <SearchUser selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            {error && <p>Please Select a user</p>}
          </div>
          <div className={styles.footer}>
            <button className={styles.cancel} type='button' onClick={closeModal}>Cancel</button>
            <button className={styles.submit} type='submit' onClick={SubmitClk} disabled={!selectedUser}>Add Email</button> {/* Disable button if no user is selected */}
          </div>
        </>
      )}
    </div>
  );
}

export default AddPeopleToBoard;
