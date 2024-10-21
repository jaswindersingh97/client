import styles from './CardGrid.module.css';
import React, { useContext, useEffect, useState } from 'react';
import CardLayout from './CardLayout';
import { AppContext } from '../../Context/AppContext';
import { apiRequest } from '../../Apis';
import { statuses } from '../../ComponentUtils/Statuses';

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
          status={status.title} // Pass the status title to the card
          tasks={tasksByStatus[status.id] || []}  // Pass segregated tasks to CardLayout
        />
      ))}
    </div>
  );
}

export default CardGrid;
