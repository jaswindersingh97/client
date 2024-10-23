import styles from './CreateAndEditTask.module.css';
import React, { useState, useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import { Title, DueDate, CheckListAdd, PrioritySelect, SearchUser } from './subComponents/index';
import { apiRequest } from '../../Apis';

function CreateAndEditTask() {
  const { closeModal, token, item, setItem, setTaskData ,taskData} = useContext(AppContext);
  
  // Check if it's an edit mode by checking if item exists with an _id
  const isEdit = !!item?._id;

  // Initialize state with values from `item`, or default values for a new task
  const [title, setTitle] = useState(item?.title || '');
  const [priority, setPriority] = useState(item?.priority || 0);
  const [checklist, setChecklist] = useState(Array.isArray(item?.checklist) ? item.checklist : []);
  const [selectedDate, setSelectedDate] = useState(item?.dueDate || '');
  const [selectedUser, setSelectedUser] = useState(item?.assignedTo?.[0] || "");

  // Function to handle form submission (either create or edit)
  const onSubmit = async () => {
    const endpoint = isEdit ? `/secure/editTask/${item._id}` : "/secure/createTask";
    const method = isEdit ? "put" : "post";

    const data = {
      title,
      priority,
      checklist,
      dueDate: selectedDate,
    };
    if (selectedUser?._id) {
      data.assignedTo = [selectedUser._id]; // Safely access _id
    }

    // Send API request with appropriate method
    const response = await apiRequest({
      endpoint,
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data,
    });
    
    const TaskData = response.data.response;
    
    // Update tasks in context
    if (isEdit) {
      // Update the existing task
      setTaskData(prevTasks =>
        prevTasks.map(task => (task._id === TaskData._id ? TaskData : task))
      );

    } else {
      // Add the new task
      setTaskData(prevTasks => [ TaskData,...prevTasks]);
    }


    // Clear the item in context after creation/editing
    setItem(null);
    closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <Title title={title} setTitle={setTitle} />
        <PrioritySelect priority={priority} setPriority={setPriority} />
        <div className={styles.SearchUser}><span>Assign to</span><SearchUser selectedUser={selectedUser} setSelectedUser={setSelectedUser} /></div>
        <CheckListAdd checklist={checklist} setChecklist={setChecklist} />
      </div>
      <div className={styles.footer}>
        <DueDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <button onClick={
          ()=>{
          setItem(null);
          closeModal()}} type='button'>Cancel</button>
        <button type='submit' onClick={onSubmit}>
          {isEdit ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </div>
    
  );
}

export default CreateAndEditTask;
