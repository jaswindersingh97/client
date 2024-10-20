import React from 'react';
import { useState } from 'react';
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  
  //Filter
    const [selectedValue,setSelectedValue] = useState(7);
    const filterHandle = (e) => {
      setSelectedValue(e.target.value)
    }
  
    
  
    return (
      <AppContext.Provider 
      value={{ 
        selectedValue,
        setSelectedValue,
        filterHandle,
        }}>
        {children}
      </AppContext.Provider>
    );
  };
  
export {AppContext,AppProvider};