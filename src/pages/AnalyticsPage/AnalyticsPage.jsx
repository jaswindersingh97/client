import styles from './AnalyticsPage.module.css';
import React, { useContext, useState, useEffect } from 'react';
import { apiRequest } from '../../Apis';
import { AppContext } from '../../Context/AppContext';

function Item({ item }) {
  const { name, count, color } = item;
  return (
    <div className={styles.Item}>
      <span style={{ background: color }}></span>
      <p>{name}</p>
      <h4>{count}</h4>
    </div>
  );
}

function AnalyticsPage() {
  const { token } = useContext(AppContext);
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true); 

  const initialTasks = [
    { name: "Backlog Tasks", color: "#90C4CC", count: 0, key: 'statusCount', value: 3 },
    { name: "Low Priority", color: "#63C05B", count: 0, key: 'priorityCount', value: 1 },
    { name: "To-do Tasks", color: "#1E90FF", count: 0, key: 'statusCount', value: 1 },
    { name: "Moderate Priority", color: "#18B0FF", count: 0, key: 'priorityCount', value: 2 },
    { name: "In-Progress Tasks", color: "#FFA500", count: 0, key: 'statusCount', value: 2 },
    { name: "High Priority", color: "#FF2473", count: 0, key: 'priorityCount', value: 3 },
    { name: "Completed Tasks", color: "#32CD32", count: 0, key: 'statusCount', value: 4 },
    { name: "Due Date Tasks", color: "#CF3636", count: 0, key: 'dueDateCount', value: 'hasDueDate' }
  ];

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    setLoading(true); // Start loading
    try {
      const response = await apiRequest({
        endpoint: `/secure/Analytics`,
        method: 'get',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const counts = response.data.counts[0];  // Fetch the counts object

      // Map the API response to update the counts in initialTasks
      const updatedTasks = initialTasks.map(task => {
        const countData = counts[task.key]?.find(item => item._id === task.value);
        return {
          ...task,
          count: countData ? countData.count : 0,  // Set the count or default to 0
        };
      });

      setTaskList(updatedTasks);  // Update taskList with new values
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Analytics</h3>
      </div>
      <div className={styles.body}>
        {loading ? ( // Conditional rendering based on loading state
          <p>Loading...</p>
        ) : (
          taskList.map((item, index) => (
            <Item item={item} key={index} />
          ))
        )}
      </div>
    </div>
  );
}

export default AnalyticsPage;
