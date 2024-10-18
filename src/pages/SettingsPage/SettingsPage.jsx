import styles from './SettingsPage.module.css';
import React from 'react'
import { fieldConfig } from '../../Forms/Register';
import Form from '../../components/Form/Form';
function SettingsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Settings</h3>
      </div>
      <div className={styles.body}>
        <Form 
        fieldConfig={fieldConfig} 
        Button={{
        name: "Register",
        onSubmit: () => {
          alert("LogInpage");   
        },
      }}/>
      </div>
    </div>
  )

}

export default SettingsPage
