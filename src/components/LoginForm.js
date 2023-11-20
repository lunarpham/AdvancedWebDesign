// LoginFormComponent.js
import React from 'react';
import { useForm } from 'react-hook-form';

const LoginForm = ({ onLogin }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://awd-2023.azurewebsites.net/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: data.userName,
          password: data.password,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        onLogin(responseData.token);
        console.log("Token: ", responseData.token)
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Username:
        <input {...register('userName', { required: true})} type="text" />
      </label>

      <label>
        Password:
        <input {...register('password', { required: true})} type="password" />
      </label>

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
