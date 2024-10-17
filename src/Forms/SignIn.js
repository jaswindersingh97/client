import {email,password,hidePassword,unhidePassword} from './../assets/FormComponents';

const fieldConfig = [
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
];
export {fieldConfig}