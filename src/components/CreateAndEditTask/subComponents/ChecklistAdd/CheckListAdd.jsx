import React from 'react'
import DeleteIcon from './../../../../assets/CreateTaskLayout/Delete.svg'
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
      <p>Checklist ({completedCount}/{checklist.length})</p>
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
          <button onClick={() => deleteChecklistItem(index)}><img src={DeleteIcon} alt='deleteicon'/></button>
        </div>
      ))}
    </div>
      <button onClick={addNewChecklistItem}>+ Add New</button>
  </div>

  )
}

export default CheckListAdd
