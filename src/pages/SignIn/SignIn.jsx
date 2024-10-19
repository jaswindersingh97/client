import React from 'react'
import { AuthPageLayout } from '../../components';
import { fieldConfig } from '../../Forms/SignIn';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../Apis';
import { toast } from 'react-toastify';
function SignIn() {
  const navigate = useNavigate();
  const onSubmit = async (formData) => {
    const endpoint = '/auth/login';
    const method = 'post';
    const { confirmPassword, ...data } = formData; 

    const response = await apiRequest({ endpoint, method, data });
    const { message, error } = response.data;

    if (message) {
        localStorage.setItem("token", response.data.token);
        toast.success(message);
        navigate("/dashboard");
    } 
    else if (error) {
        toast.error(error);
    }
};

  return (
    <>
        <AuthPageLayout
            pageName="Login"
            alternativeMessage="Have no account yet?"
            Button={{
                  name: "Log In",
                  onSubmit:onSubmit,
                }}
            alternateButton={{
                  name: "Register",
                  onClick: () => {
                    navigate("/register");
                  },
                }}
            fieldConfig = {fieldConfig}         
        />
    </>
  )
}

export default SignIn
