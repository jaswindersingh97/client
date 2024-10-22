import React from 'react'
function DueDate({selectedDate, setSelectedDate}) {
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value); // Update state with the selected date
      };
  return (
    <div>
        <input 
            type='date' 
            value={selectedDate} 
            onChange={handleDateChange} 
          />

    </div>
  )
}

export default DueDate
