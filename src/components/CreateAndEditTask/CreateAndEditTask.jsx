import styles from './CreateAndEditTask.module.css';
import React, { useState, useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import { Title, DueDate, CheckListAdd, PrioritySelect, SearchUser } from './subComponents/index';
import { apiRequest } from '../../Apis';

function CreateAndEditTask() {
  const { closeModal, token, item, setItem, setTaskData } = useContext(AppContext);
  const [error, setError] = useState({});
  const isEdit = !!item?._id;
  const [title, setTitle] = useState(item?.title || '');
  const [priority, setPriority] = useState(item?.priority || 0);
  const [checklist, setChecklist] = useState(Array.isArray(item?.checklist) ? item.checklist : []);
  const [selectedDate, setSelectedDate] = useState(item?.dueDate || '');
  const [selectedUser, setSelectedUser] = useState(item?.assignedTo?.[0] || "");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!priority) {
      newErrors.priority = "Priority must be selected.";
    }

    if (!checklist.length) {
      newErrors.checklist = "At least one checklist item is required.";
    } else {
      checklist.forEach((item, index) => {
        if (!item.task.trim()) {
          newErrors[`checklist_${index}`] = `Checklist item ${index + 1} cannot be empty.`;
        }
      });
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const onSubmit = async () => {
    if (!validateForm()) {
      return; 
    }

    const endpoint = isEdit ? `/secure/editTask/${item._id}` : "/secure/createTask";
    const method = isEdit ? "put" : "post";

    const data = {
      title,
      priority,
      checklist,
      dueDate: selectedDate,
    };
    
    if (selectedUser?._id) {
      data.assignedTo = [selectedUser._id];
    }

    const response = await apiRequest({
      endpoint,
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data,
    });

    const TaskData = response.data.response;

    if (isEdit) {
      setTaskData(prevTasks =>
        prevTasks.map(task => (task._id === TaskData._id ? TaskData : task))
      );
    } else {
      setTaskData(prevTasks => [TaskData, ...prevTasks]);
    }

    setItem(null);
    closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <Title title={title} setTitle={setTitle} />
        {error.title && <span className={styles.error}>{error.title}</span>}
        
        <PrioritySelect priority={priority} setPriority={setPriority} />
        {error.priority && <span className={styles.error}>{error.priority}</span>}
        
        <div className={styles.SearchUser}>
          <span>Assign to</span>
          <SearchUser selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        </div>
        
        <CheckListAdd checklist={checklist} setChecklist={setChecklist} />
        {error.checklist && <span className={styles.error}>{error.checklist}</span>}
        {checklist.map((item, index) => 
          error[`checklist_${index}`] && (
            <span className={styles.error} key={index}>
              {error[`checklist_${index}`]}
            </span>
          )
        )}
      </div>
      
      <div className={styles.footer}>
        <DueDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        
        <div className={styles.controlbuttons}>
          <button
            className={styles.cancelbutton}
            onClick={() => {
              setItem(null);
              closeModal();
            }}
            type='button'
          >
            Cancel
          </button>
          
          <button className={styles.submitbutton} type='submit' onClick={onSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateAndEditTask;
