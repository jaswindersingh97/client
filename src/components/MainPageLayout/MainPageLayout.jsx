import styles from './MainPageLayout.module.css';
import React from 'react'
import { useLocation,useNavigate,Outlet } from 'react-router-dom';
import {logo,Board,Analytics,Logout,Setting}  from '../../assets/MainLayoutComponent';

function BodyElement({icon,name,link}){
  const navigate = useNavigate();
  return(
    <div onClick={()=>navigate(link)} className={styles.element}>
      <img src={icon} alt={`${icon}icon`}/>
      <p>{name}</p>
    </div>
  )
}

function MainPageLayout() {
  const headerelements =[
    {icon:logo,name:"Pro Manage",link:"/dashboard"},
  ]
  const bodyelements = [
    {icon:Board,name:"Board",link:"/dashboard"},
    {icon:Analytics,name:"Analytics",link:"/analytics"},
    {icon:Setting,name:"Settings",link:"/settings"},
  ];
  const footerelements = [
    {icon:Logout,name:"Log out",link:"/dashboard"},
  ]
  const location = useLocation();
  const currentRoute = location.pathname.split('/').pop(); 
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.header}>
        {headerelements.map((item,index)=>{
            return (<BodyElement icon={item.icon} name={item.name} link={item.link} key={index}/>) 
          })}
        </div>
        <div className={styles.body}>
          {bodyelements.map((item,index)=>{
            return (<BodyElement icon={item.icon} name={item.name} link={item.link} key={index}/>) 
          })}
        </div>
        <div className={styles.footer}>
        {footerelements.map((item,index)=>{
            return (<BodyElement icon={item.icon} name={item.name} link={item.link} key={index}/>) 
          })}        </div>
      </div>
      <div className={styles.right}>
        <Outlet/>
      </div>
    </div>
  )
}

export default MainPageLayout
