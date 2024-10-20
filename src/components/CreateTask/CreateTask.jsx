import styles from './CreateTask.module.css';
import React, { useState } from 'react'

function CreateTask() {
    const [name,setName] = useState("")
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.titleheading}>
            <h5>Title</h5>
            <span>*</span>
        </div>
        <div className={styles.titlebody}>
            <input type='text' placeholder='Enter Task Title' value={name} onChange={(e)=>{setName(e.target.value);}} />
        </div>
      </div>
    </div>
  )
}

export default CreateTask
