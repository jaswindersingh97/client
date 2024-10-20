import styles from './CardGrid.module.css';
import React from 'react'
import CardLayout from './CardLayout'
function CardGrid() {
    const arr = [1,2,3 ,4];
  return (
    <div className={styles.container}>
        {arr.map((item,index)=>(
            <CardLayout key={index}/>
        ))}
    </div>
  )
}

export default CardGrid
