import styles from './Options.module.css';
import { optionButton } from './../../assets/DashboardPageComponents';
import { useState } from 'react';
import OptionsLst from '../../ComponentUtils/OptionLst';
function Options({_id}) {
    const [visible, setVisible] = useState(false);
    const toggleVisible = (status) => {
      setVisible(status);
    };
    return (
      <div
        onMouseEnter={() => toggleVisible(true)}
        onMouseLeave={() => toggleVisible(false)}
        className={styles.dropdown}
      >
        <span 
        className={styles.icon}
        >
          <img src={optionButton} alt="optionButton" />
        </span>
        <span
          style={{ display: `${visible ? 'flex' : 'none'}` }}
          className={styles.OptionsLst}
        >
          {OptionsLst.map((item, index) => (
            <span
              className={styles.select}
              onClick={()=>item.onClick(_id)}
              key={index}
              style={{ color: item.color || 'black', cursor: 'pointer' }}
            >
              {item.name}
            </span>
          ))}
        </span>
      </div>
    );
  }
export default Options;