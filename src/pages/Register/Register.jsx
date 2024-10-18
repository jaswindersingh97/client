import React from 'react'
import { AuthPageLayout } from '../../components';
import { fieldConfig } from '../../Forms/Register';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../Apis';
import { toast } from 'react-toastify';

function Register() {
  const navigate = useNavigate()
  const onSubmit = async(formData) => {
    const endpoint ='/auth/register'
    const method = 'post';
    const { confirmPassword, ...data } = formData; 
    const response = await apiRequest({endpoint,method,data});
    const {Message,error} =response.data;
    console.log(response)
      Message ? toast.success(Message) : toast.error(error)
  } 
  return (
    <>
    <AuthPageLayout
      pageName="Register"
      alternativeMessage="Have an account?"
      Button={{
        name: "Register",
        onSubmit:onSubmit,
      }}
      alternateButton={{
        name: "Log in",
        onClick: () => {
          navigate("/signin")
        },
      }}
      fieldConfig={fieldConfig}
      />

    </>
  )
}

export default Register
