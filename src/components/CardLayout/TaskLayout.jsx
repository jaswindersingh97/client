import styles from './TaskLayout.module.css';
import { useState, useEffect } from 'react';
import Options from './Options';
import CheckList from './CheckList';
import otherStatus from '../../ComponentUtils/Statuses';
import priorityArray from './../../ComponentUtils/Prioritylist';
import generateInitials from './../../Utils/generateInitials';
import { shortDate } from '../../Utils/formatDate';

function TaskLayout({ task, collapseAll, updateTaskStatus, updateTaskChecklist }) {
  const { _id, title, priority, assignedTo, status, checklist: initialChecklist, dueDate } = task;
  const date = shortDate(new Date(dueDate));
  const initials = assignedTo.length > 0 && assignedTo[0]?.name ? generateInitials(assignedTo[0].name) : "";
  const { priorityname, prioritycolor } = priorityArray[priority];
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(!collapseAll);
  }, [collapseAll]);

  const expandHandler = () => {
    setExpanded(!expanded);
  };

  const handleStatusChange = (newStatus) => {
    updateTaskStatus(_id, newStatus);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.upperheader}>
          <div className={styles.left_upperheader}>
            <div style={{ background: prioritycolor }}></div>
            <p>{priorityname}</p>
            {initials && <span>{initials}</span>}
          </div>
          <div className={styles.Options}>
            <Options _id={_id} />
          </div>
        </div>
        <div className={styles.lowerheader}>
          <h2>{title}</h2>
        </div>
      </div>
      <div className={styles.body}>
        <CheckList 
          taskId={_id}
          expandHandler={expandHandler}
          checklist={initialChecklist}
          setChecklist={(updatedChecklist) => updateTaskChecklist(_id, updatedChecklist)}
          expanded={expanded}
        />
      </div>
      <div className={styles.footer}>
        {dueDate && (
          <button className={`${styles.footerButtons} ${
            status === 4
              ? styles.greenButton
              : (new Date(dueDate) < new Date() || priority === 4)
              ? styles.redButton
              : styles.silverButton
          }`}>
            {date}
          </button>
        )}
        <div>
          {otherStatus(status).map((item, index) => (
            <button key={index} className={styles.footerButtons} onClick={() => handleStatusChange(item.id)}>
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskLayout;
