import styles from './AnalyticsPage.module.css';
import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { apiRequest } from '../../Apis';
import { AppContext } from '../../Context/AppContext';
function Item({item}){
  const {name,count,color} = item;
  return(
    <div className={styles.Item}>
      <span style={{background:color}}></span>
      <p>{name}</p>
      <h4>{count}</h4>
    </div>
  )
}

function AnalyticsPage() {
  const {token} = useContext(AppContext);
  const [taskList,setTaskList] = useState([]);
  const Tasks = [
    { name: "Backlog Tasks", color: "#90C4CC", count: 0 },
    { name: "Low Priority", color: "#63C05B", count: 0 },
    { name: "To-do Tasks", color: "#1E90FF", count: 0 },
    { name: "Moderate Priority", color: "#18B0FF", count: 0 },
    { name: "In-Progress Tasks", color: "#FFA500", count: 0 },
    { name: "High Priority", color: "#FF2473", count: 0 },
    { name: "Completed Tasks", color: "#32CD32", count: 0 },
    { name: "Due Date Tasks", color: "#CF3636", count: 0 }
  ];
  useEffect(() => {
    getTasks();
  }, []);

  taskList.forEach(task => {
    if (task.status === 1) {
      Tasks[2].count++;
    } else if (task.status === 2) {
      Tasks[4].count++; 
    } else if (task.status === 3) {
      Tasks[0].count++; // "Backlog Tasks"
    } else if (task.status === 4) {
      Tasks[6].count++; // "Completed Tasks"
    }
  
    // Based on task.priority
    if (task.priority === 1) {
      Tasks[1].count++; // "Low Priority"
    } else if (task.priority === 2) {
      Tasks[3].count++; // "Moderate Priority"
    } else if (task.priority === 3) {
      Tasks[5].count++; // "High Priority"
    }
  
    if (task.dueDate) {
      Tasks[7].count++; // "Due Date Tasks"
    }    
  });

  const getTasks = async () => {
    const response = await apiRequest({
      endpoint: `/secure/getTasks`,
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    setTaskList(response.data.response);
    // setTaskData(response.data.response || []); // Ensure taskData is an array
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Analytics</h3>
      </div>
      <div className={styles.body}>
        {Tasks.map((item,index)=>(
          <Item item={item} key={index}/>
        ))}
      </div>
    </div>
  )
}

export default AnalyticsPage
