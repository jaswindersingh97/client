import React from 'react'
import styles from './CheckListAdd.module.css';
function CheckListAdd({checklist, setChecklist}) {
      // Calculate completed checklist items
  const completedCount = checklist.filter(item => item.completed).length;

  // Handle adding new checklist item
  const addNewChecklistItem = () => {
    setChecklist([...checklist, { task: '', completed: false }]);
  };

  // Handle updating checklist item text
  const updateChecklistText = (index, newText) => {
    const updatedChecklist = checklist.map((item, idx) =>
      idx === index ? { ...item, task: newText } : item
    );
    setChecklist(updatedChecklist);
  };

  // Handle toggling checklist completion
  const toggleChecklistCompleted = (index) => {
    const updatedChecklist = checklist.map((item, idx) =>
      idx === index ? { ...item, completed: !item.completed } : item
    );
    setChecklist(updatedChecklist);
  };

  // Handle deleting a checklist item
  const deleteChecklistItem = (index) => {
    const updatedChecklist = checklist.filter((_, idx) => idx !== index);
    setChecklist(updatedChecklist);
  };

  return (
    <div className={styles.checklist}>
    <div className={styles.Heading}>
      <h3>Checklist ({completedCount}/{checklist.length})</h3>
      <span>*</span>
    </div>
    <div className={styles.field}>
      {checklist.map((item, index) => (
        <div key={index} className={styles.checkItem}>
          <input
            type='checkbox'
            checked={item.completed}
            onChange={() => toggleChecklistCompleted(index)}
          />
          <input
            type='text'
            value={item.task}
            onChange={(e) => updateChecklistText(index, e.target.value)}
            placeholder='Enter item'
          />
          <button onClick={() => deleteChecklistItem(index)}>Delete</button>
        </div>
      ))}
      <button onClick={addNewChecklistItem}>+ Add New</button>
    </div>
  </div>

  )
}

export default CheckListAdd
