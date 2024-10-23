import React, { useContext, useEffect, useMemo } from 'react';
import CardLayout from './CardLayout';
import { AppContext } from '../../Context/AppContext';
import { apiRequest } from '../../Apis';
import { statuses } from '../../ComponentUtils/Statuses';
import styles from './CardGrid.module.css';

function CardGrid() {
  const { selectedValue, token, taskData, setTaskData } = useContext(AppContext);

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
    setTaskData(prevTasks => 
      prevTasks.map(task => 
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const updateTaskChecklist = (taskId, updatedChecklist) => {
    setTaskData(prevTasks =>
      prevTasks.map(task =>
        task._id === taskId ? { ...task, checklist: updatedChecklist } : task
      )
    );
  };

  // Memoize tasksByStatus to recalculate only when taskData changes
  const tasksByStatus = useMemo(() => {
    return statuses.reduce((acc, status) => {
      acc[status.id] = taskData.filter(task => task.status === status.id);
      return acc;
    }, {});
  }, [taskData]);

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
