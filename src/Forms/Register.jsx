import {name,email,password,hidePassword,unhidePassword} from './../assets/FormComponents';
const fieldConfig = [
  {
    name: 'name',
    type: 'text',
    avatar: name,
    validate: (value) => value.trim().length > 3,
    message: 'Username should be at least 3 digits',
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