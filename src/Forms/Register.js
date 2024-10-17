const fieldConfig = [
  {
    name: 'username',
    type: 'text',
    avatar: 'avatar1.png',
    embeddedAvatar: '', 
    validate: (value) => value.trim().length > 0,
    message: 'Username is required',
  },
  {
    name: 'email',
    type: 'email',
    avatar: 'avatar2.png',
    embeddedAvatar: '', 
    validate: (value) => /\S+@\S+\.\S+/.test(value),
    message: 'Invalid email format',
  },
  {
    name: 'password',
    type: 'password',
    avatar: 'avatar3.png',
    embeddedAvatar: '', 
    validate: (value) => value.length >= 6,
    message: 'Password must be at least 6 characters long',
  },  
  {
    name: 'confirmPassword',
    type: 'password',
    avatar: 'avatar3.png',
    embeddedAvatar: '',
    validate: (value, formValues) => value === formValues.password.value,
    message: 'Passwords must match',
  }

];
export {fieldConfig}