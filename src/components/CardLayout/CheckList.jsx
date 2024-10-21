import styles from './CheckList.module.css';
import React from 'react'; // No need for useState as it's in TaskLayout
import { DownArrow, UpArrow } from '../../assets/DashboardPageComponents';
import axios from 'axios';  // Import axios for API calls

function CheckList({ taskId, expandHandler, checklist, setChecklist, expanded }) {
  
  const updateTaskStatus = async (itemId, newStatus) => {
    // try {
    //   await axios.put(`/api/tasks/${taskId}/checklist/${itemId}`, { status: newStatus });
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
      <div onClick={expandHandler} className={styles.header}>
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
            key={index} 
            className={styles.item}
            >
              <input 
                type="checkbox" 
                checked={item.status ?? false} 
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
