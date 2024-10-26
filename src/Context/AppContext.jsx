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
      setTokenState(newToken);            
      if (newToken) {
        localStorage.setItem('token', newToken);
      } else {
        localStorage.removeItem('token'); 
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

    //global task data
    const [taskData, setTaskData] = useState([]);

    //delete 
    const [deleteId,setDeleteId]= useState(null);
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
        setItem,
        taskData, 
        setTaskData,
        deleteId,
        setDeleteId
        }}>
        {children}
      </AppContext.Provider>
    );
  };
  
export {AppContext,AppProvider};