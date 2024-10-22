import styles from './CreateAndEditTask.module.css';
import React, { useState ,useContext} from 'react';
// import priorityArray from '../../ComponentUtils/Prioritylist';
import { AppContext } from '../../Context/AppContext';
import Title from './subComponents/Title/Title';
import DueDate from './subComponents/DueDate/DueDate';
import CheckListAdd from './subComponents/ChecklistAdd/CheckListAdd'
import PrioritySelect from './subComponents/PrioritySelect/PrioritySelect';
import SearchUser from './../MiniComponents/SearchUser/SearchUser';
function CreateAndEditTask() {
  const {closeModal} = useContext(AppContext);

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(1);
  const [checklist, setChecklist] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

//   // Calculate completed checklist items
//   const completedCount = checklist.filter(item => item.completed).length;

//   // Handle adding new checklist item
//   const addNewChecklistItem = () => {
//     setChecklist([...checklist, { task: '', completed: false }]);
//   };

//   // Handle updating checklist item text
//   const updateChecklistText = (index, newText) => {
//     const updatedChecklist = checklist.map((item, idx) =>
//       idx === index ? { ...item, task: newText } : item
//     );
//     setChecklist(updatedChecklist);
//   };

//   // Handle toggling checklist completion
//   const toggleChecklistCompleted = (index) => {
//     const updatedChecklist = checklist.map((item, idx) =>
//       idx === index ? { ...item, completed: !item.completed } : item
//     );
//     setChecklist(updatedChecklist);
//   };

//   // Handle deleting a checklist item
//   const deleteChecklistItem = (index) => {
//     const updatedChecklist = checklist.filter((_, idx) => idx !== index);
//     setChecklist(updatedChecklist);
//   };

//   const handleDateChange = (e) => {
//     setSelectedDate(e.target.value); // Update state with the selected date
//   };


  return (
    <div className={styles.container}>
      <div className={styles.body}>
        
        <Title title={title} setTitle={setTitle}/>
        {/* Task Title */}
        {/* <div className={styles.Title}>
          <div className={styles.Heading}>
            <h3>Title</h3>
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
            </div> */}
        <PrioritySelect priority={priority} setPriority={setPriority}/>  
        {/* Priority Selection */}
        {/* <div className={styles.priority}>
          <div className={styles.Heading}>
            <h3>Select Priority</h3>
            <span>*</span>
          </div>
          <div className={styles.field}>
            {priorityArray.map((item, index) => (
              <div
                key={index}
                onClick={() => setPriority(item.id)}
                className={`${styles.priorityItem} ${
                  priority === item.id ? styles.Active : ''
                }`}
              >
                <span style={{ background: item.prioritycolor }}></span>
                <p>{item.priorityname}</p>
              </div>
            ))}
          </div>
            </div> */}
        <SearchUser selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>    
        <CheckListAdd checklist={checklist} setChecklist={setChecklist}/>
        {/* Checklist */}
        {/* <div className={styles.checklist}>
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
                  value={item.text}
                  onChange={(e) => updateChecklistText(index, e.target.value)}
                  placeholder='Enter item'
                />
                <button onClick={() => deleteChecklistItem(index)}>Delete</button>
              </div>
            ))}
            <button onClick={addNewChecklistItem}>+ Add New</button>
          </div>
        </div> */}
      </div>
      <div className={styles.footer}>
      <DueDate selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      {/* <input 
        type='date' 
        value={selectedDate} 
        onChange={handleDateChange} 
      /> */}
      <button onClick={closeModal} type='button'>Cancel</button>
      <button type='submit'>Save</button>
      </div>  

      
    </div>
  );
}

export default CreateAndEditTask;
