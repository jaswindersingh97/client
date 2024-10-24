import styles from './Dashboard.module.css';
import formatDate from './../../Utils/formatDate';
import {AppContext} from './../../Context/AppContext';
import React, { useContext, useEffect } from 'react'
import { AddPeople } from '../../assets/DashboardPageComponents';
import Options from './../../ComponentUtils/DateFilter';
import CardGrid from '../../components/CardLayout/CardGrid';
import AddPeopleToBoard from '../../components/AddPeopleToBoard/AddPeopleToBoard';
// import CardGrid from '../../components/CardLayout/CardGrid';
function Dashboard() {
  const {selectedValue,filterHandle,token,user,getUser,openModal,setItem} = useContext(AppContext);
  useEffect(()=>{
    getUser();
  },[token]);
  return (
    <div className={styles.container}>
    <div className={styles.header}>
      <h3>Welcome! {user.name}</h3>
      <h4>{formatDate(new Date())}</h4>
    </div>
    <div className={styles.subHeading}>
      <h2>Board</h2>
      <div onClick={()=>
      {openModal(AddPeopleToBoard)}
      } className={styles.AddPeople}>
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
    <CardGrid/>
    </div>
  </div>
  )
}

export default Dashboard
