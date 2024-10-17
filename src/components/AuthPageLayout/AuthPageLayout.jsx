import React from 'react';
import styles from './AuthPageLayout.module.css';
import Astronaut from './../../assets/AuthPage/Astronaut.svg';
import Circle from './../../assets/AuthPage/Back.svg';
import Form from '../Form/Form';
function AuthPageLayout({fieldConfig=[{}],pageName="pagename",alternativeMessage="alternate message",alternateButton ={name:"button",onClick:()=>{}}}) {
  const formField = [
    {
      name: 'username',
      type: 'text',
      avatar: 'avatar1.png',
      embeddedavtar: '',
      validate: (value) => value.trim().length > 0,
      message: 'Username is required',
    },
    {
      name: 'email',
      type: 'email',
      avatar: 'avatar2.png',
      embeddedavtar: '',
      validate: (value) => /\S+@\S+\.\S+/.test(value),
      message: 'Invalid email format',
    },
    {
      name: 'password',
      type: 'password',
      avatar: 'avatar3.png',
      embeddedavtar: '',
      validate: (value) => value.length >= 6,
      message: 'Password must be at least 6 characters long',
    }
  ];
  
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
        <Form fieldConfig={fieldConfig}/>
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
