import React, { useState } from 'react';
import styles from './Form.module.css'; // Assuming you have this CSS file for styling

function FormField({ embeddedAvatar1, embeddedAvatar2, avatar, type, name, fieldData, setFieldData }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const currentAvatar = isPasswordVisible ? embeddedAvatar2 : embeddedAvatar1;

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev); // Toggle the password visibility
  };

  const inputType = type === 'password' && isPasswordVisible ? 'text' : type; // Determine the input type

  return (
    <>
      <div className={styles.formField}>
        {avatar && <img className={styles.imageBefore} src={avatar} alt={`${name} avatar`} />}
        <input
          className={styles.TextField}
          type={inputType} // Use the determined input type
          value={fieldData.value || ''} // Use empty string if value is undefined
          onChange={(e) => setFieldData(name, e.target.value)}
          placeholder={`Enter the ${name}`}
        />
        {embeddedAvatar1 && (
          <img
            className={styles.embeddedImage}
            src={currentAvatar} 
            alt="embedded avatar"
            onClick={handleTogglePasswordVisibility}
          />
        )}
      </div>
      {fieldData.error && <span className={styles.error}>{fieldData.error}</span>}
    </>
  );
}

function Form({ fieldConfig, Button, initialValues }) { // Accept initialValues prop

  const initializeFields = (initialValues = {}) => { // Accept initial values
    const fields = {};
    fieldConfig.forEach(field => {
      fields[field.name] = { value: initialValues[field.name] || '', error: '' }; // Populate with initial values if provided
    });
    return fields;
  };

  const [fields, setFields] = useState(() => initializeFields(initialValues)); // Initialize with initialValues

  const setFieldData = (name, value) => {
    setFields(prevFields => ({
      ...prevFields,
      [name]: { ...prevFields[name], value }
    }));
  };

  const validateFields = () => {
    const newFields = { ...fields };
    fieldConfig.forEach(field => {
      const fieldValue = newFields[field.name]?.value; 
  
      if (!field.validate(fieldValue, newFields)) {
        newFields[field.name].error = field.message; 
      } else {
        newFields[field.name].error = ''; 
      }
    });
    setFields(newFields); 
    return Object.keys(newFields).every(field => newFields[field].error === ''); // Return true if no errors
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      const formData = Object.fromEntries(
        Object.entries(fields).map(([key, data]) => [key, data.value])
      );
      Button.onSubmit?.(formData); 
    }
  };

  return (
    <div className={styles.Form}>
      <form onSubmit={handleSubmit}>  
        {fieldConfig.map(({ name, type, avatar, embeddedAvatar1, embeddedAvatar2 }, index) => (
          <FormField 
            key={index}
            avatar={avatar}
            type={type}
            name={name}
            fieldData={fields[name]}
            embeddedAvatar1={embeddedAvatar1}
            embeddedAvatar2={embeddedAvatar2}
            setFieldData={setFieldData}
          />
        ))}
        <button type="submit">{Button.name}</button>
      </form>
    </div>       
  );
}

export default Form;
