import styles from './AnalyticsPage.module.css';
import React from 'react'

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
  const Tasks =[
    {name:"Backlog Tasks",color:"#90C4CC",count:16},
    {name:"Low Priority",color:"#63C05B",count:16},
    {name:"To-do Tasks",color:"#1E90FF",count:16},
    {name:"Moderate Priority",color:"#18B0FF",count:16},
    {name:"In-Progress Tasks",color:"#FFA500",count:16},
    {name:"High Priority",color:"#FF2473",count:16},
    {name:"Completed Tasks",color:"#32CD32",count:16},
    {name:"Due Date Tasks",color:"#CF3636",count:16},
  ];
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
