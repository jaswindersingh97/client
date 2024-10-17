import React from 'react'
import AuthPageLayout from '../../components/AuthPageLayout/AuthPageLayout'
import { fieldConfig } from '../../Forms/Register';
function SignIn() {
  return (
    <>
        <AuthPageLayout
            pageName="SignIn"
            alternativeMessage="alternate message"
            alternateButton = {{
                name:"button",onClick:()=>{
                    console.log("hi")
                    }
                }}
            fieldConfig = {fieldConfig}         
        />
    </>
  )
}

export default SignIn
