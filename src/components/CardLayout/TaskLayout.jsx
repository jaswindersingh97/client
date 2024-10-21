import styles from './TaskLayout.module.css';
import { useState } from 'react';
import Options from './Options';
import CheckList from './CheckList';
import otherStatus from '../../ComponentUtils/Statuses';
import priorityArray from './../../ComponentUtils/Prioritylist';
import generateInitials from './../../Utils/generateInitials';
function TaskLayout({task}) {
    const {_id,title,priority,assignedTo,status} = task;
    const initials = generateInitials(assignedTo[0]);
    const {priorityname,prioritycolor} = priorityArray[priority];
    const [expanded,setExpanded] = useState(false);
    const DueDate = "feb 10th";
    const changeStatus = () =>{
      alert(_id)
    }
    const possibleStatus = otherStatus(status);
    const [checklist, setChecklist] = useState([
      { id: 1, status: true, task: "Task to be done" },
    ]);
    const expandHandler = () =>{
      setExpanded(!expanded);
    }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.upperheader}>
          <div className={styles.left_upperheader}>
              <div style={{background:prioritycolor}}></div>
              <p>{priorityname}</p>
            {initials && <span>{initials}</span>}
          </div>
            <div className={styles.Options}>
            <Options _id={_id}/>
            </div>
        </div>
        <div className={styles.lowerheader}>
          <h2>{title}</h2>
        </div>
      </div>
      <div className={styles.body}>
      <CheckList 
        expandHandler = {expandHandler} 
        checklist ={checklist}
        setChecklist={setChecklist}
        expanded = {expanded}
        />
      </div>
      <div className={styles.footer}>
      {DueDate && <button className={`${styles.footerButtons} ${styles.DueDate}`}>{DueDate}</button>}
      <div>{
          possibleStatus.map((item,index)=>(
            <button onClick={changeStatus} key={index} className={styles.footerButtons}>{item.name}</button>
          ))
        }</div>
      </div>
    </div>
  )
}

export default TaskLayout
