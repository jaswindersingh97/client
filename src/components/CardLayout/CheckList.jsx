import styles from './CheckList.module.css';
import React, { useState } from 'react';
import { DownArrow, UpArrow } from '../../assets/DashboardPageComponents';
import axios from 'axios';  // Import axios for API calls

function CheckList({expandHandler,checklist,setChecklist,expanded}) {
  // const [expanded, setExpanded] = useState(false);
  // const [checklist, setChecklist] = useState([
  //   { id: 1, status: true, task: "Task to be done" },
  //   { id: 2, status: false, task: "Task to be done" },
  //   { id: 3, status: false, task: "Task to be done" },
  // ]);

  // // Toggles expanded state
  // const expandHandler = () => {
  //   setExpanded(!expanded);
  // };

  // API call to update task status
  const updateTaskStatus = async (taskId, newStatus) => {
    // try {
    //   await axios.put(`/api/tasks/${taskId}`, { status: newStatus });
    //   console.log("Task status updated successfully");
    // } catch (error) {
    //   console.error("Failed to update task status", error);
    // }
  };

  // Updates the status of a specific checklist item when checkbox is toggled
  const changeStatus = (index) => {
    const updatedChecklist = checklist.map((item, i) => 
      i === index ? { ...item, status: !item.status } : item
    );
    setChecklist(updatedChecklist);

    // Call the API to update the server
    const updatedItem = updatedChecklist[index];
    updateTaskStatus(updatedItem.id, updatedItem.status);
  };

  // Count completed tasks
  const completedCount = checklist.filter(item => item.status).length;

  return (
    <div className={styles.container}>
      <div
          onClick={expandHandler} 
      className={styles.header}>
        <p>Checklist ({completedCount}/{checklist.length})</p>
        <img 
          src={expanded ? UpArrow : DownArrow} 
          alt={expanded ? 'Collapse checklist' : 'Expand checklist'}
          className={styles.expanded} 
        />
      </div>

      {expanded && (
        <div className={styles.body}>
          {checklist.map((item, index) => (
            <div
                onClick={() => changeStatus(index)} 
            key={index} className={styles.item}>
              <input 
                type="checkbox" 
                checked={item.status} 
                onChange={() => changeStatus(index)} 
                className={styles.checkbox}
              />
              <p>{item.task}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CheckList;
