import React from 'react'
import styles from  './Title.module.css';
function Title({title, setTitle}) {
  return (
    <div className={styles.Title}>
        <div className={styles.Heading}>
          <p>Title</p>
          <span>*</span>
        </div>
        <div className={styles.field}>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter the Title'
          />
        </div>
    </div>
  )
}

export default Title
