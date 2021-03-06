import React from 'react';
import { MicrosoftLoginButton } from 'react-social-login-buttons';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../config/authConfig";
import './Login.css';
import axiosInstance from "../../config/axiosConfig";
import { Card ,Space} from "antd";
const Login = () => {
  const { instance } = useMsal();

  return (
    <div className='login-container'>
      <div className='login-wrapper'>

        <Card title="Terraform" >
          <Space direction="vertical">
          Sign in to AZBuilder
          <MicrosoftLoginButton onClick={() => handleLogin(instance)} />
          </Space>
        </Card>

      </div> </div>
  )
}

function handleLogin(instance) {
  instance.loginPopup(loginRequest).then(response => {
    console.log(response);
    localStorage.setItem('azureProfile', response.account);
    localStorage.setItem('azureAccessToken', response.accessToken);
    axiosInstance.defaults.headers.common['Authorization'] = response.accessToken;
  })
    .catch(e => {
      console.error(e);
    });
}

export default Login;