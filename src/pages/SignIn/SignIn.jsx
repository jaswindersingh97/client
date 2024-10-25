import React, { useContext } from 'react'
import { AuthPageLayout } from '../../components';
import { fieldConfig } from '../../Forms/SignIn';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../Apis';
import { toast } from 'react-toastify';
import { AppContext } from '../../Context/AppContext';
function SignIn() {
  const {setToken} = useContext(AppContext);
  const navigate = useNavigate();
  const onSubmit = async (formData) => {
    const endpoint = '/auth/login';
    const method = 'post';
    const { confirmPassword, ...data } = formData; 

    const response = await apiRequest({ endpoint, method, data });
    const { message, error } = response.data;

    if (message) {
      setToken(response.data.token);
      console.log(message)
      toast.success(message);
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 3000); 
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
