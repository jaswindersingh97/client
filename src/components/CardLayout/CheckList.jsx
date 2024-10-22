import styles from './CheckList.module.css';
import React, { useContext } from 'react'; 
import { DownArrow, UpArrow } from '../../assets/DashboardPageComponents';
import apiRequest from './../../Apis/apiRequest'
import { AppContext } from './../../Context/AppContext';

function CheckList({  expandHandler, checklist, setChecklist, expanded }) {
  const { token } = useContext(AppContext);

  const updateTaskStatus = async (itemId, newStatus) => {
    await apiRequest({
      endpoint: `/secure/tickChecklist`,
      method: 'patch',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: {
        checklistItemId: itemId,
        status: newStatus,
      },
    });
  };

  const changeStatus = (index) => {
    const updatedChecklist = checklist.map((item, i) => 
      i === index ? { ...item, completed: !item.completed } : item
    );
    setChecklist(updatedChecklist);
    updateTaskStatus(updatedChecklist[index]._id, updatedChecklist[index].completed);
  };

  const completedCount = checklist.filter(item => item.completed).length;

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
            <div key={index} className={styles.item}>
              <input 
                type="checkbox" 
                checked={item.completed ?? false}
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
