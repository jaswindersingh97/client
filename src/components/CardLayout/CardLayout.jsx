import styles from './CardLayout.module.css';
import TaskLayout from './TaskLayout';
import React from 'react'
import { CollapseAll } from '../../assets/DashboardPageComponents';
function CardLayout({status,tasks}) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>{status}</h4>
        <div className={styles.button}>
            {status == 'To Do' && <button>+</button>}
            <button><img src={CollapseAll} alt='collapseAll'/></button>
        </div>
      </div>
      <div className={styles.body}>
        {tasks.map((task,index)=>{
            return(
                <div key={index} className={styles.TaskContainer}>
                    <TaskLayout task={task}/>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default CardLayout;
