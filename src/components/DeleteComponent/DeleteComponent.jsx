import { apiRequest } from '../../Apis';
import { AppContext } from '../../Context/AppContext';
import styles from './DeleteComponent.module.css';
import React, { useContext } from 'react';

function DeleteComponent() {
  const { deleteId, setDeleteId,token,closeModal,setTaskData } = useContext(AppContext);

  const handleDelete = async() => {
    setTaskData((prevTasks) => {
      return prevTasks.filter((item) => item._id !== deleteId);
    });
    
    const response = await apiRequest({endpoint:`/secure/deleteTask/${deleteId}`,method:"delete",headers:{
      'Authorization':`Bearer ${token}`
    }});
    console.log(response);
    
    setDeleteId(null); // Clear deleteId after deletion
    closeModal();
  };

  const handleCancel = () => {
    setDeleteId(null); // Clear deleteId on cancel
    closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Are you sure you want to Delete?</h3>
      </div>
      <div className={styles.body}>
        <button className={styles.submit} type='button' onClick={handleDelete}>Yes, Delete</button>
        <button className={styles.cancel} type='button' onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteComponent;
