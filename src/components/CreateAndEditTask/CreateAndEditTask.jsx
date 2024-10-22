import styles from './CreateAndEditTask.module.css';
import React, { useState ,useContext} from 'react';
import { AppContext } from '../../Context/AppContext';
import {Title,DueDate,CheckListAdd,PrioritySelect,SearchUser} from './subComponents/index';
import { apiRequest } from '../../Apis';
function CreateAndEditTask() {
  const {closeModal,token} = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(1);
  const [checklist, setChecklist] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const onsubmit = async()=>{
    const response =await apiRequest({
      endpoint:"/secure/createTask",
      method:'post',
      headers:{
        'Authorization':`Bearer ${token}`
      },
      data:{
        title:title, priority:priority, assignedTo:[selectedUser._id], checklist:checklist, dueDate:selectedDate
      }
    });
    console.log(response);
  }
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        
        <Title title={title} setTitle={setTitle}/>
        <PrioritySelect priority={priority} setPriority={setPriority}/>  
        <SearchUser selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>    
        <CheckListAdd checklist={checklist} setChecklist={setChecklist}/>
      </div>
      <div className={styles.footer}>
        <DueDate selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
        <button onClick={closeModal} type='button'>Cancel</button>
        <button type='submit' onClick={onsubmit}>Save</button>
      </div>  

      
    </div>
  );
}

export default CreateAndEditTask;
