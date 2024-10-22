import styles from './SharePage.module.css';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import apiRequest from './../../Apis/apiRequest';
import { headerelements } from './../../ComponentUtils/LeftNavLst';
import { toast, ToastContainer } from 'react-toastify';
import { shortDate } from './../../Utils/formatDate';
import priorityArray from './../../ComponentUtils/Prioritylist';

function SharePage() {
  const { TaskId } = useParams();
  const [task, setTask] = useState(null);

  const getTask = async () => {
    const { data } = await apiRequest({ endpoint: `/public/shareTask/${TaskId}` });
    const { message, response } = data;
    if (message) {
      toast.success(message);
      setTask(response);
    } else {
      toast.error("Please check the link again");
      setTask(null); // Set to null if no task is found
    }
  };

  useEffect(() => {
    getTask();
  }, [TaskId]);

  const { title, priority, dueDate, checklist = [] } = task || {};
  const { priorityname, prioritycolor } = priorityArray[priority-1] || {};
  const formattedDate = dueDate ? shortDate(new Date(dueDate)) : 'No due date';
  const completedCount = checklist.filter(item => item.completed).length;

  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className={styles.header}>
        <Link to={headerelements[0].link}>
        <div className={styles.icon}>
        <img src={headerelements[0].icon} alt='icon' />
        <h3>{headerelements[0].name}</h3>
        </div>
        </Link>
      </div>

      {task ? (
        <div className={styles.body}>
          <div className={styles.TaskLayout}>
            <div className={styles.Taskheader}>
              {priorityname && (
                <div className={styles.priority}>
                  <span style={{ background: prioritycolor }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <p>{priorityname}</p>
                </div>
              )}
            </div>
            <div className={styles.Taskbody}>
              <h2>{title}</h2>
              <div className={styles.checklist}>
                <p>CheckList ({completedCount}/{checklist.length})</p>
                <div className={styles.checklistItems}>
                  {checklist.map((item, index) => (
                    <div key={index} className={styles.item}>
                      <input 
                        type="checkbox" 
                        checked={item.completed}
                        className={styles.checkbox}
                        disabled={true}
                      />
                      <p>{item.task}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.TaskFooter}>
              <span>Due Date</span>
              <div>{formattedDate}</div>
            </div>
          </div>
        </div>
      ) : (
        <p>Task not found or unavailable.</p>
      )}
    </div>
  );
}

export default SharePage;
