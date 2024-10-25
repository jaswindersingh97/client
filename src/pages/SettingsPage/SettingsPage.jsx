import styles from './SettingsPage.module.css';
import React, { useContext, useEffect, useState } from 'react';
import { fieldConfig } from '../../Forms/Update';
import Form from '../../components/Form/Form';
import { AppContext } from './../../Context/AppContext';
import { toast } from 'react-toastify';

function SettingsPage() {
  const { getUser, user } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getUser();
      setIsLoading(false);
    };
    fetchData();
  }, [getUser]);

  const handleSubmit = (formData) => {
    const changes = {};
    if (formData.name !== user.name) {
      changes.name = formData.name;
    }
    if (formData.email !== user.email) {
      changes.email = formData.email;
    }
    const isOldPasswordEntered = formData['Old Password']?.length > 0;
    const isNewPasswordEntered = formData['New Password']?.length > 0;
    if (isOldPasswordEntered && isNewPasswordEntered) {
      changes.oldPassword = formData['Old Password'];
      changes.newPassword = formData['New Password'];
    }
    const numberOfChanges = Object.keys(changes).length;
    if (numberOfChanges === 0) {
      toast.error('No changes were made.')
      return;
    }
    if (numberOfChanges > 1) {
      toast.error('You can only update one field (either name, email, or password) at a time.');
      return;
    }
    
    alert('Form submitted successfully with: ' + JSON.stringify(changes));
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <div>No user data available.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Settings</h3>
      </div>
      <div className={styles.body}>
        <Form 
          fieldConfig={fieldConfig} 
          Button={{
            name: "Update",
            onSubmit: handleSubmit,
          }}
          initialValues={{  
            name: user.name,
            email: user.email,
            oldPassword: '',
            newPassword: ''
          }}
        />
      </div>
    </div>
  );
}
export default SettingsPage;