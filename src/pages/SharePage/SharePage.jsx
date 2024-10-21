import styles from './SharePage.module.css';
import React from 'react'
import {Link} from 'react-router-dom';
import {headerelements} from './../../ComponentUtils/LeftNavLst';
import TaskLayout from './../../components/CardLayout/TaskLayout';
function SharePage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
      <Link to={headerelements[0].link} ><img src={headerelements[0].icon} alt='icon'/>
      <h3>{headerelements[0].name}</h3></Link>
      {console.log(headerelements)}
      </div>
      <div className={styles.body}>
      </div>
    </div>
  )
}

export default SharePage
