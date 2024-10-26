import React from 'react'
import priorityArray from './../../../../ComponentUtils/Prioritylist';
import styles from './PrioritySelect.module.css';

function PrioritySelect({priority, setPriority}) {
  return (
    <div className={styles.priority}>
        <div className={styles.Heading}>
          <p>Select Priority</p>
          <span>*</span>
        </div>
        <div className={styles.field}>
          {priorityArray.map((item, index) => (
            <div
              key={index}
              onClick={() => setPriority(item.id)}
              className={`${styles.priorityItem} ${
                priority === item.id ? styles.Active : ''
              }`}
            >
              <span style={{ background: item.prioritycolor }}></span>
              <p>{item.priorityname}</p>
            </div>
          ))}
        </div>
    </div>
  )
}

export default PrioritySelect
