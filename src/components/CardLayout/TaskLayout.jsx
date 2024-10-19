import styles from './TaskLayout.module.css';
import { useState } from 'react';
import Options from './Options';
import CheckList from './CheckList';
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
    const statuses = [
      {id:1 , name:'TO-DO' ,title:'To Do'},
      {id:2 , name:'PROGRESS' ,title:'Progress'},
      {id:3 , name:'BACKLOG' ,title:'Backlog'},
      {id:4 , name:'DONE' ,title:'Done'},
    ];
    const possibleStatus = statuses.filter((item)=> item.id !==currentStatusId);
    const [checklist,setCheckelist] = useState([
      {status:true,task:"Task to be done"},
      {status:false,task:"Task to be done"},
      {status:false,task:"Task to be done"},
    ]);
    const expandHandler = () =>{
      setExpanded(!expanded);
    }
    const handleclk = () => alert("button clicked");    // dummy function for the options button
    const OptionsLst = [
      { name: 'Share', onClick: handleclk },
      { name: 'Edit', onClick: handleclk },
      { name: 'Delete', color: '#CF3636', onClick: handleclk }
    ];
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
            <Options OptionsLst={OptionsLst}/>
            </div>
        </div>
        <div className={styles.lowerheader}>
          <h2>{title}</h2>
        </div>
      </div>
      <div className={styles.body}>
      <CheckList/>
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
