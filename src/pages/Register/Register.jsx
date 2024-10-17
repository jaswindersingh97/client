import React from 'react'
import AuthPageLayout from '../../components/AuthPageLayout/AuthPageLayout'
import { fieldConfig } from '../../Forms/Register';
function Register() {
  return (
    <>
    <AuthPageLayout
      pageName="Register"
      alternativeMessage="Have an account?"
      Button={{
        name: "Register",
        onSubmit: () => {
          alert("LogInpage");   
        },
      }}
      alternateButton={{
        name: "Log in",
        onClick: () => {
          alert("LogInpage");   
        },
      }}
      fieldConfig={fieldConfig}
      />

    </>
  )
}

export default Register
