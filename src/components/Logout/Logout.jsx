import styles from './Logout.module.css';
import React, { useContext } from 'react'
import {AppContext} from './../../Context/AppContext';
import {useNavigate} from 'react-router-dom'
function Logout() {
  const navigate = useNavigate();
  const{setToken,closeModal}= useContext(AppContext);
  const oncancel = () =>{
    closeModal();
  }
  const onsubmit = ()=>{
    setToken("");
    navigate("/signin")
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>Are you sure you want to Logout?</h4>
      </div>
      <div className={styles.body}>
        <button className={styles.submit} type='button' onClick={onsubmit}>Yes, Logout</button>
        <button className={styles.cancel} type='button' onClick={oncancel}>Cancel</button>
      </div>
    </div>
  );
}

export default Logout
