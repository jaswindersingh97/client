import React from 'react'
import AuthPageLayout from '../../components/AuthPageLayout/AuthPageLayout'
function Register() {
  return (
    <>
        <AuthPageLayout
            pageName="Register"
            alternativeMessage="alternate message"
            alternateButton = {{
                name:"button",onClick:()=>{
                    console.log("hi")
                    }
                }}         
        />
    </>
  )
}

export default Register
