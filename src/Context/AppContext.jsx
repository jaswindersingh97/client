import React from 'react';
import { useState } from 'react';
import { apiRequest } from './../Apis';

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  
  //Filter
    const [selectedValue,setSelectedValue] = useState('week');
    const filterHandle = (e) => {
      setSelectedValue(e.target.value)
    }
    const token = localStorage.getItem('token');
    
  //User
    const [user,setUser] = useState({name:""})
    const getUser = async()=>{
      const {data} = await apiRequest({
        endpoint:'/secure/getUser',
        headers:{
          'Authorization':`Bearer ${token}`
        }
      });
      setUser(data.user);
    };
    
    return (
      <AppContext.Provider 
      value={{ 
        selectedValue,
        setSelectedValue,
        filterHandle,
        token,
        user,
        setUser,
        getUser
        }}>
        {children}
      </AppContext.Provider>
    );
  };
  
export {AppContext,AppProvider};