const fieldConfig = [
    {
      name: 'email',
      type: 'email',
      avatar: 'avatar2.png',
      embeddedavtar: '',
      validate: (value) => /\S+@\S+\.\S+/.test(value),
      message: 'Invalid email format',
    },
    {
      name: 'password',
      type: 'password',
      avatar: 'avatar3.png',
      embeddedavtar: '',
      validate: (value) => value.length >= 6,
      message: 'Password must be at least 6 characters long',
    }
  ];

  export {fieldConfig};