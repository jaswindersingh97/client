import styles from './CardLayout.module.css';
import TaskLayout from './TaskLayout';
import { useContext, useState } from 'react';
import { CollapseAll } from '../../assets/DashboardPageComponents';
import CreateAndEditTask from '../CreateAndEditTask/CreateAndEditTask';
import React from 'react';
import { AppContext } from '../../Context/AppContext';

function CardLayout({ status, tasks, updateTaskStatus, updateTaskChecklist }) {
  const {openModal} = useContext(AppContext)
  const [collapseAll, setCollapseAll] = useState(true);
  const toggleCollapseAll = () => setCollapseAll(!collapseAll);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>{status}</h4>
        <div className={styles.button}>
          {status === 'To Do' && <button onClick={()=>openModal(CreateAndEditTask)}>+</button>}
          <button onClick={toggleCollapseAll}><img src={CollapseAll} alt='collapseAll' /></button>
        </div>
      </div>
      <div className={styles.body}>
        {tasks.map((task, index) => (
          <div key={index} className={styles.TaskContainer}>
            <TaskLayout
              task={task}
              collapseAll={collapseAll}
              updateTaskStatus={updateTaskStatus}
              updateTaskChecklist={updateTaskChecklist} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardLayout;
