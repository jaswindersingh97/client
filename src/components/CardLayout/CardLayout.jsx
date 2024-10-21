import styles from './CardLayout.module.css';
import TaskLayout from './TaskLayout';
import { useState } from 'react'
import { CollapseAll } from '../../assets/DashboardPageComponents';
import React from 'react';
function CardLayout({status,tasks}) {
  const [collapseAll, setCollapseAll] = useState(true);
  const toggleCollapseAll = () => {
    setCollapseAll(!collapseAll);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>{status}</h4>
        <div className={styles.button}>
            {status == 'To Do' && <button>+</button>}
            <button onClick={toggleCollapseAll}><img src={CollapseAll} alt='collapseAll'/></button>
        </div>
      </div>
      <div className={styles.body}>
        {tasks.map((task,index)=>{
            return(
                <div key={index} className={styles.TaskContainer}>
                    <TaskLayout task={task} collapseAll={collapseAll}/>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default CardLayout;
