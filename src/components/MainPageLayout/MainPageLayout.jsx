import styles from './MainPageLayout.module.css';
import React from 'react'
import { Link,Outlet } from 'react-router-dom';
import {logo,Board,Analytics,Logout,Setting}  from '../../assets/MainLayoutComponent';
function MainPageLayout() {

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.header}>
            <img src={logo} alt='logo'/>
            <h3>Pro Manage</h3>
        </div>
        <div className={styles.body}>

        </div>
        <div className={styles.footer}>

        </div>
      </div>
      <div className={styles.right}>
        <Outlet/>
      </div>
    </div>
  )
}

export default MainPageLayout
