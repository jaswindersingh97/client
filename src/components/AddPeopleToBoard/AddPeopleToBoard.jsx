import styles from './AddPeopleToBoard.module.css';
import React, { useContext, useState } from 'react';
import SearchUser from './../MiniComponents/SearchUser/SearchUser';
import { AppContext } from '../../Context/AppContext';
import { apiRequest } from '../../Apis';

function AddPeopleToBoard() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to track submission
  const { closeModal, token } = useContext(AppContext);

  const SubmitClk = async () => {
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
          <h6>{selectedUser.email} added to board!</h6>
          <button onClick={closeModal}>Okay, got it! </button>
        </div>
      ) : ( 
        <>
          <div className={styles.header}>
            <h6>Add people to the board</h6>
          </div>
          <div className={styles.body}>
            <SearchUser selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
          </div>
          <div className={styles.footer}>
            <button type='button' onClick={closeModal}>Cancel</button>
            <button type='submit' onClick={SubmitClk} disabled={!selectedUser}>Add Email</button> {/* Disable button if no user is selected */}
          </div>
        </>
      )}
    </div>
  );
}

export default AddPeopleToBoard;
