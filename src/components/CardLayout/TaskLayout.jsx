import styles from './TaskLayout.module.css';
import { useState } from 'react';
import Options from './Options';
import CheckList from './CheckList';
import otherStatus from '../../ComponentUtils/Statuses';
function TaskLayout() {
    const Task = {}
    const background = '#FF2473';
    const priority = 'HIGH PRIORITY';
    const initials = 'AK';
    const [expanded,setExpanded] = useState(true);
    const title = "Title";
    const DueDate = "feb 10th";
    const currentStatusId =3; 
    const changeStatus = () =>{
      alert("button clked")
    }
    const possibleStatus = otherStatus(currentStatusId);
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
              <div style={{background:background}}></div>
              <p>{priority}</p>
            <span>{initials}</span>
          </div>
            <div className={styles.Options}>
            <Options/>
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
