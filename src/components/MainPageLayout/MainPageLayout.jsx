import styles from './MainPageLayout.module.css';
import { useContext } from 'react'
import { useNavigate,Outlet } from 'react-router-dom';
import { Modal} from '../';
import { ToastContainer } from 'react-toastify';
import {headerelements,bodyelements,footerelements} from './../../ComponentUtils/LeftNavLst';
import { AppContext } from '../../Context/AppContext';
import Logout from '../Logout/Logout';

function BodyElement({icon,name,link,onClick}){
  const navigate = useNavigate();
  return(
    <div onClick={onClick ? onClick : ()=>navigate(link)} className={styles.element}>
      <img src={icon} alt={`${icon}icon`}/>
      <p>{name}</p>
    </div>
  )
}

export {BodyElement};

function MainPageLayout() {
  const {isModalOpen, closeModal,component,openModal}= useContext(AppContext);
  const onLogout = () =>{
    openModal(Logout)
  }
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
            return (<BodyElement icon={item.icon} name={item.name} link={item.link} onClick={onLogout} key={index}/>) 
          })}        
          </div>
      </div>
      <div className={styles.right}>
        <Outlet/>
      </div>
      <Modal isOpen={isModalOpen} Component={component} onClose={closeModal}/>
      <ToastContainer/>
    </div>
  )
}
export default MainPageLayout
