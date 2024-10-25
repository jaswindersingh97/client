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
    message: 'Invalid email format or empty.',
  },
  {
    name: 'Old Password',
    type: 'password',
    avatar: password,
    embeddedAvatar1: hidePassword,
    embeddedAvatar2: unhidePassword,
    validate: (value, formData) => {
      const newPassword = formData['New Password'];
      if (value.length > 0 && newPassword.length === 0) {
        return false; // New password must be present if old password is filled
      }
      return value.length === 0 || value.length >= 6; // Allow empty or check length
    },
    message: 'Both passwords must be at least 6 characters long or left empty.',
  },
  {
    name: 'New Password',
    type: 'password',
    avatar: password,
    embeddedAvatar1: hidePassword,
    embeddedAvatar2: unhidePassword,
    validate: (value, formData) => {
      const oldPassword = formData['Old Password'];
      if (value.length > 0 && oldPassword.length === 0) {
        return false; // Old password must be present if new password is filled
      }
      return value.length === 0 || value.length >= 6; // Allow empty or check length
    },
    message: 'Both passwords must be at least 6 characters long or left empty.',
  }
];

export { fieldConfig };
