import styles from './TaskLayout.module.css';
import { useState } from 'react';
import Options from './Options';
function TaskLayout() {
    const Task = {}
    const background = '#FF2473';
    const priority = 'HIGH PRIORITY';
    const initials = 'AK';
    const [expanded,setExpanded] = useState(false);
    const handleclk = () => alert("button clicked");
    const OptionsLst = [
      { name: 'Share', onClick: handleclk },
      { name: 'Edit', onClick: handleclk },
      { name: 'Delete', color: '#CF3636', onClick: handleclk }
    ];
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.upperheader}>
          <div className={styles.left_upperheader}>
            <div className={styles.priority}>
              <div style={{background:background}}></div>
              <p>{priority}</p>
            </div>
            <span>{initials}</span>
          </div>
          <div className={styles.right_upperheader}>
            <Options OptionsLst={OptionsLst}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskLayout
