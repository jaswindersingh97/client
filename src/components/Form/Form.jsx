import styles from './Form.module.css';
import React, { useState } from 'react';

function FormField({ embeddedAvatar, avatar, type, name, fieldData, setFieldData }) {
  return (
    <div className={styles.formField}>
      {avatar && <img className={styles.imageBefore} src={avatar} alt={`${name} avatar`} />}
      <input
        type={type}
        value={fieldData.value || ''}
        onChange={(e) => setFieldData(name, e.target.value)}
        placeholder={`Enter the ${name}`}
      />
      {embeddedAvatar && <img className={styles.embeddedImage} src={embeddedAvatar} alt="embedded avatar" />}
      {fieldData.error && <span className={styles.error}>{fieldData.error}</span>}
    </div>
  );
}

function Form({ fieldConfig, onSubmit }) {

  const initializeFields = () => {
    const fields = {};
    fieldConfig.forEach(field => {
      fields[field.name] = { value: '', error: '' };
    });
    return fields;
  };

  const [fields, setFields] = useState(initializeFields);

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
      console.log("Form Submitted", formData);
      onSubmit?.(formData); 
    }
  };

  return (
    <div className={styles.Form}>
      <form onSubmit={handleSubmit}>  
        {fieldConfig.map(({ name, type, avatar, embeddedAvatar }, index) => (
          <FormField 
            key={index}
            avatar={avatar}
            type={type}
            name={name}
            fieldData={fields[name]}
            embeddedAvatar={embeddedAvatar}
            setFieldData={setFieldData}
          />
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>       
  );
}

export default Form;
