import React from 'react'
import AuthPageLayout from '../../components/AuthPageLayout/AuthPageLayout'
import { fieldConfig } from '../../Forms/SignIn';
function SignIn() {
  return (
    <>
        <AuthPageLayout
            pageName="Login"
            alternativeMessage="Have no account yet?"
            alternateButton={{
                  name: "Register",
                  onClick: () => {
                    alert("signUpPage");
                  },
                }}
            fieldConfig = {fieldConfig}         
        />
    </>
  )
}

export default SignIn
