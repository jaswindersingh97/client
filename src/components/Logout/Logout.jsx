import styles from './Logout.module.css';
import React, { useContext } from 'react'
import {AppContext} from './../../Context/AppContext';
import {useNavigate} from 'react-router-dom'
function Logout() {
  const navigate = useNavigate();
  const{setToken}= useContext(AppContext);
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
        <button type='submit'>Yes</button>
        <button type='button'>Cancel</button>
      </div>
    </div>
  )
}

export default Logout
