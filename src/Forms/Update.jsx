import { name, email, password, hidePassword, unhidePassword } from './../assets/FormComponents';

const fieldConfig = [
  {
    name: 'name',
    type: 'text',
    avatar: name,
    validate: (value) => value.trim().length > 3,
    message: 'Username should be at least 3 characters long or left unchanged.',
  },
  {
    name: 'email',
    type: 'email',
    avatar: email,
    validate: (value) => /\S+@\S+\.\S+/.test(value),
    message: 'Invalid email format or left unchanged.',
  },
  {
    name: 'OldPassword',
    type: 'password',
    avatar: password,
    embeddedAvatar1: hidePassword,
    embeddedAvatar2: unhidePassword,
    validate: (value, formData) => {
      const newPassword = formData?.['NewPassword'] ; // Fetch NewPassword from formData
      
      // If either password field is entered, both must be non-empty and meet length requirements
      if (value.length > 0 || newPassword.value.length > 0) {
        return value.length >= 6 && newPassword.value.length >= 6; // Both must be >= 6 characters
      }
      
      return true; // If both are empty, validation passes
    },
    message: 'Both Old Password and New Password must be filled and at least 6 characters long.',
  },
  {
    name: 'NewPassword',
    type: 'password',
    avatar: password,
    embeddedAvatar1: hidePassword,
    embeddedAvatar2: unhidePassword,
    validate: (value, formData) => {
      const oldPassword = formData?.['OldPassword'] ; // Fetch OldPassword from formData
      
      // If either password field is entered, both must be non-empty and meet length requirements
      if (value.length > 0 || oldPassword.length > 0) {
        return value.length >= 6 && oldPassword.value.length >= 6; // Both must be >= 6 characters
      }
      
      return true; // If both are empty, validation passes
    },
    message: 'Both Old Password and New Password must be filled and at least 6 characters long.',
  }
];

export { fieldConfig };
