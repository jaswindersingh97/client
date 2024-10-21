import React, { useContext, useEffect, useState } from 'react';
import CardLayout from './CardLayout';
import { AppContext } from '../../Context/AppContext';
import { apiRequest } from '../../Apis';
import { statuses } from '../../ComponentUtils/Statuses';
import styles from './CardGrid.module.css';

function CardGrid() {
  const { selectedValue, token } = useContext(AppContext);
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    getTasks();
  }, [selectedValue]);

  const getTasks = async () => {
    const response = await apiRequest({
      endpoint: `/secure/getTasks?filterBy=${selectedValue}`,
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    setTaskData(response.data.response || []); // Ensure taskData is an array
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    // Make API call to update the task's status
    await apiRequest({
      endpoint: `/secure/updateStatus`,
      method: 'patch',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: {
        TaskId: taskId,
        Status: newStatus,
      },
    });
    // Update local state after successful API call
    setTaskData(prevTasks => 
      prevTasks.map(task => 
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  // Update checklist in taskData
  const updateTaskChecklist = (taskId, updatedChecklist) => {
    setTaskData(prevTasks =>
      prevTasks.map(task =>
        task._id === taskId ? { ...task, checklist: updatedChecklist } : task
      )
    );
  };

  const tasksByStatus = statuses.reduce((acc, status) => {
    acc[status.id] = taskData.filter(task => task.status === status.id);
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      {statuses.map((status, index) => (
        <CardLayout
          key={index}
          className={styles.Card}
          status={status.title}
          tasks={tasksByStatus[status.id] || []}
          updateTaskStatus={updateTaskStatus}
          updateTaskChecklist={updateTaskChecklist}  
        />
      ))}
    </div>
  );
}

export default CardGrid;
