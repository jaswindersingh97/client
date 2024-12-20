import styles from './SettingsPage.module.css';
import React, { useContext, useEffect, useState } from 'react';
import { fieldConfig } from '../../Forms/Update';
import Form from '../../components/Form/Form';
import { AppContext } from './../../Context/AppContext';
import { toast } from 'react-toastify';
import { apiRequest } from '../../Apis';

function SettingsPage() {
  const { getUser, user, token, setToken } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user._id) {
        await getUser();
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = async(formData) => {
    const changes = {};
    let changeCount = 0;
  
    if (formData.name !== user.name) {
      changes.name = formData.name;
      changeCount++;
    }
    if (formData.email !== user.email) {
      changes.email = formData.email;
      changeCount++;
    }
  
    const isOldPasswordEntered = formData['OldPassword']?.length > 0;
    const isNewPasswordEntered = formData['NewPassword']?.length > 0;
    
    if (isOldPasswordEntered && isNewPasswordEntered) {
      changes.oldPassword = formData['OldPassword'];
      changes.newPassword = formData['NewPassword'];
      changeCount++;
    }
  
    if (changeCount === 0) {
      toast.error('No changes were made.');
      return;
    }
    
    if (changeCount > 1) {
      toast.error('You can only update one field (either name, email, or password) at a time.');
      return;
    }
  
    // If valid, show alert or proceed to submit the changes
    const response = await apiRequest({
      endpoint:"/secure/updateUser",
      method:'patch',
      headers:{
        'Authorization': `Bearer ${token}`
      },
      data:changes,
    });
    toast.success(response.data.message);
    if(response.status==200){
      setToken();
      setTimeout(()=>{window.location.href = '/signIn'},3000);
    }
    
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