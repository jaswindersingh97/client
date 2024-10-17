import name from './../assets/FormComponents/Name.svg';
import email from './../assets/FormComponents/email.svg';
import password from './../assets/FormComponents/password.svg';
import hidePassword from './../assets/FormComponents/hidePassword.svg';
import unhidePassword from './../assets/FormComponents/unhidePassword.svg';
const fieldConfig = [
  {
    name: 'username',
    type: 'text',
    avatar: name,
    validate: (value) => value.trim().length > 0,
    message: 'Username is required',
  },
  {
    name: 'email',
    type: 'email',
    avatar: email,
    validate: (value) => /\S+@\S+\.\S+/.test(value),
    message: 'Invalid email format',
  },
  {
    name: 'password',
    type: 'password',
    avatar: password,
    embeddedAvatar1: hidePassword,
    embeddedAvatar2: unhidePassword,
    validate: (value) => value.length >= 6,
    message: 'Password must be at least 6 characters long',
  },  
  {
    name: 'confirmPassword',
    type: 'password',
    avatar: password,
    embeddedAvatar1: hidePassword,
    embeddedAvatar2: unhidePassword,
    validate: (value, formValues) => value === formValues.password.value,
    message: 'Passwords must match',
  }

];
export {fieldConfig}