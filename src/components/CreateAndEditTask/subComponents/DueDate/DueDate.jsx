import React, { useState, useRef } from 'react';
import styles from './DueDate.module.css';

function DueDate({ selectedDate, setSelectedDate }) {
  const [isEditing, setIsEditing] = useState(false); 
  const dateInputRef = useRef(null); 
  const today = new Date().toISOString().split('T')[0]; 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setIsEditing(false);
  };

  const handleButtonClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      dateInputRef.current.focus(); 
    }, 0);
  };

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsEditing(false); // Switch back to the button when focus leaves the date picker
    }
  };

  return (
    <div className={styles.container} onBlur={handleBlur} tabIndex={-1}>
      {isEditing ? (
        <input
          type="date"
          ref={dateInputRef}
          value={selectedDate}
          onChange={handleDateChange}
          className={styles.dateInput}
          min={today}
        />
      ) : (
        <button onClick={handleButtonClick} className={styles.dateButton}>
          {selectedDate ? formatDate(selectedDate) : 'Select Due Date'}
        </button>
      )}
    </div>
  );
}

export default DueDate;
