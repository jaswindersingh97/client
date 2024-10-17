import React from 'react';
import styles from './AuthPageLayout.module.css';
import {Astronaut,Circle} from './../../assets/AuthPage/index';
import Form from '../Form/Form';
function AuthPageLayout
({
  fieldConfig=[{}],
  pageName="pagename",
  alternativeMessage="alternate message",
  Button ={name:"button",onsubmit:()=>{}},
  alternateButton ={name:"button",onClick:()=>{}}
  }) 
{
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.images}>
          <img className={styles.Astronaut} src={Astronaut} alt="Astronaut"/>
          <img className={styles.back} src={Circle} alt="Circle"/>
        </div>
        <div className={styles.content}>
          <h1>Welcome aboard my friend</h1>
          <p>just a couple of clicks and we start</p>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.heading}>
          <h1>{pageName}</h1>
        </div>
        <div className={styles.form}>
        <Form Button={Button} fieldConfig={fieldConfig}/>
        </div>
        <div className={styles.base}>
          <p>{alternativeMessage}</p>
          <button type='button' onClick={alternateButton.onClick}>{alternateButton.name}</button>
        </div>
      </div>
    </div>
  )
}

export default AuthPageLayout
