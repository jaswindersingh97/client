import styles from './Dashboard.module.css';
import React, { useState } from 'react'

function Dashboard() {
  const user ={name:"jaswinder"}
  const filterHandle = (e) => {
    setSelectedValue(e.target.value)
  }
  const date = '12th Jan, 2024'
  const Options = [
    {value:1,title:'Today'},
    {value:7,title:'This Week'},
    {value:30,title:'This Month'},
  ]
  const [selectedValue,setSelectedValue] = useState(7);
  return (
    <div className={styles.container}>
    <div className={styles.header}>
      <h3>Welcome! {user.name}</h3>
      <h4>{date}</h4>
    </div>
    <div className={styles.subHeading}>
      <h2>Board</h2>
      <select defaultValue={selectedValue} onChange={filterHandle}>
      {Options.map((item,index)=>(
        <option key={index} value={item.value}>{item.title}</option>
      ))}
      </select>
    </div>
    <div className={styles.body}>

    </div>
  </div>
  )
}

export default Dashboard
