import styles from './Form.module.css';
import React, { useState } from 'react';

function FormField({ embeddedavtar, avatar, type, name, fieldData, setFieldData }) {
  return (
    <div className={styles.formField}>
      {avatar && <img className={styles.imageBefore} src={avatar} alt={`${name} avatar`} />}
      <input
        type={type}
        value={fieldData.value || ''}
        onChange={(e) => setFieldData(name, e.target.value)}
        placeholder={`Enter the ${name}`}
      />
      {embeddedavtar && <img className={styles.embeddedImage} src={embeddedavtar} alt="embedded avatar" />}
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
    let isValid = true;
    const updatedFields = { ...fields };

    fieldConfig.forEach(({ name, validate, message }) => {
      if (!validate(fields[name].value)) {
        updatedFields[name].error = message;
        isValid = false;
      } else {
        updatedFields[name].error = '';
      }
    });

    setFields(updatedFields);
    return isValid;
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
          {fieldConfig.map(({ name, type, avatar, embeddedavtar }, index) => (
            <FormField 
              key={index}
              avatar={avatar}
              type={type}
              name={name}
              fieldData={fields[name]}
              embeddedavtar={embeddedavtar}
              setFieldData={setFieldData}
            />
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>       
  );
}

export default Form;
