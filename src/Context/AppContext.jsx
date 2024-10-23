import React from 'react';
import { useState ,useEffect} from 'react';
import { apiRequest } from './../Apis';

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  
  //Filter
    const [selectedValue,setSelectedValue] = useState('week');
    const filterHandle = (e) => {
      setSelectedValue(e.target.value)
    }
    const [token, setTokenState] = useState(localStorage.getItem('token') || null);
    const setToken = (newToken) => {
      setTokenState(newToken);            // Update state
      if (newToken) {
        localStorage.setItem('token', newToken); // Set token in localStorage
      } else {
        localStorage.removeItem('token'); // Remove token from localStorage if null
      }
    };
    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken !== token) {
        setToken(storedToken);
      }
    }, [token]);
    
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
  
  //overlay components handling
    function DummyComponent (){
      return(
        <div></div>
      )
    }  

    const [isModalOpen, setModalOpen] = useState(false);
    const [component,setComponent]=useState(null);
    const openModal = (Component) => {
      setComponent(()=>Component);
      setModalOpen(true);
    }
    const closeModal = () => setModalOpen(false);
    

    //EditTask
    const [item,setItem] = useState(null);
    return (
      <AppContext.Provider 
      value={{ 
        selectedValue,
        setSelectedValue,
        filterHandle,
        token,
        user,
        setUser,
        getUser,
        isModalOpen, 
        setModalOpen,
        closeModal,
        openModal,
        component,
        setComponent,
        setToken,
        item,
        setItem
        }}>
        {children}
      </AppContext.Provider>
    );
  };
  
export {AppContext,AppProvider};