import styles from './Options.module.css';
import { optionButton } from './../../assets/DashboardPageComponents';
import { useState } from 'react';
function Options({OptionsLst}) {
    const [visible, setVisible] = useState(false);
    
    const toggleVisible = (status) => {
      setVisible(status);
    };
    return (
      <span
        onMouseEnter={() => toggleVisible(true)}
        onMouseLeave={() => toggleVisible(false)}
        className={styles.dropdown}
      >
        <span className={styles.icon}>
          <img src={optionButton} alt="optionButton" />
        </span>
        <div
          style={{ display: `${visible ? 'block' : 'none'}` }}
          className={styles.OptionsLst}
        >
          {OptionsLst.map((item, index) => (
            <div
              onClick={item.onClick}
              key={index}
              style={{ color: item.color || 'black', cursor: 'pointer' }}
            >
              {item.name}
            </div>
          ))}
        </div>
      </span>
    );
  }
export default Options;