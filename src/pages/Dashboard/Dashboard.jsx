import styles from './Dashboard.module.css';
import formatDate from './../../Utils/formatDate';
import {AppContext} from './../../Context/AppContext';
import React, { useContext, useEffect } from 'react'
import { AddPeople } from '../../assets/DashboardPageComponents';
import Options from './../../ComponentUtils/DateFilter';
import CardLayout from '../../components/CardLayout/CardLayout';
import CreateTask from '../../components/CreateTask/CreateTask';
import { toast } from 'react-toastify';
import SearchUser from '../../components/MiniComponents/SearchUser/SearchUser';
// import CardGrid from '../../components/CardLayout/CardGrid';
function Dashboard() {
  const {selectedValue,filterHandle,token,user,getUser} = useContext(AppContext);
  useEffect(()=>{
    getUser();
    toast.success("userLoaded successfully")
  },[token]);
  return (
    <div className={styles.container}>
    <div className={styles.header}>
      <h3>Welcome! {user.name}</h3>
      <h4>{formatDate(new Date())}</h4>
    </div>
    <div className={styles.subHeading}>
      <h2>Board</h2>
      <div className={styles.AddPeople}>
        <img src={AddPeople} alt='Add People'/>
        <p>Add People</p>
      </div>
      <select defaultValue={selectedValue} onChange={filterHandle}>
      {Options.map((item,index)=>(
        <option key={index} value={item.value}>{item.title}</option>
      ))}
      </select>
    </div>
    <div className={styles.body}>
    {/* <CreateTask/> */}
    {/* <CardLayout/> */}
    {/* <CardGrid/> */}
    <SearchUser/>
    </div>
  </div>
  )
}

export default Dashboard
