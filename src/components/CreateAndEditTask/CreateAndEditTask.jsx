import styles from './CreateAndEditTask.module.css';
import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../Context/AppContext';
import { Title, DueDate, CheckListAdd, PrioritySelect, SearchUser } from './subComponents/index';
import { apiRequest } from '../../Apis';

function CreateAndEditTask() {
  const { closeModal, token, item, setItem } = useContext(AppContext);
  console.log(item)
  // Check if it's an edit mode by checking if item exists with an _id
  const isEdit = !!item?._id;

  // Initialize state with values from `item`, or default values for a new task
  const [title, setTitle] = useState(item?.title || ''); // Default to empty if no item
  const [priority, setPriority] = useState(item?.priority || 0);
  const [checklist, setChecklist] = useState(Array.isArray(item?.checklist) ? item.checklist : []); // Ensure checklist is an array
  const [selectedDate, setSelectedDate] = useState(item?.dueDate || '');
  const [selectedUser, setSelectedUser] = useState(item?.assignedTo?.[0] || "");
  // Function to handle form submission (either create or edit)
  const onSubmit = async () => {
    const endpoint = isEdit ? `/secure/editTask/${item._id}` : "/secure/createTask"; // Append task id for edit
    const method = isEdit ? "put" : "post"; // Use PUT for edit, POST for create

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

    // Clear the item in context after creation/editing
    setItem(null); // Clear item if a new task was created or editing is done
    closeModal(); // Close the modal
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <Title title={title} setTitle={setTitle} />
        <PrioritySelect priority={priority} setPriority={setPriority} />
        <SearchUser selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <CheckListAdd checklist={checklist} setChecklist={setChecklist} /> {/* Checklist component */}
      </div>
      <div className={styles.footer}>
        <DueDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <button onClick={closeModal} type='button'>Cancel</button>
        <button type='submit' onClick={onSubmit}>
          {isEdit ? 'Update Task' : 'Create Task'} {/* Button text based on mode */}
        </button>
      </div>
    </div>
  );
}

export default CreateAndEditTask;
