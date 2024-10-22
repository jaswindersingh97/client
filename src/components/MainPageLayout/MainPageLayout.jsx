import styles from './MainPageLayout.module.css';
import { useState } from 'react'
import { useNavigate,Outlet } from 'react-router-dom';
import { Modal} from '../';
import { ToastContainer } from 'react-toastify';
import {headerelements,bodyelements,footerelements} from './../../ComponentUtils/LeftNavLst';
import AddPeopleToBoard from '../AddPeopleToBoard/AddPeopleToBoard';
function DummyComponent (){
  return(
    <div></div>
  )
}
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
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);


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
            return (<BodyElement icon={item.icon} name={item.name} link={item.link} onClick={item.onClick} key={index}/>) 
          })}        
          </div>
      </div>
      <button onClick={openModal}>Testing</button>
      <div className={styles.right}>
        <Outlet/>
      </div>
      <Modal isOpen={isModalOpen} Component={AddPeopleToBoard} onClose={closeModal}/>
      <ToastContainer/>
    </div>
  )
}

export default MainPageLayout
