// AuthHandler.js
import React, { useEffect, useState } from 'react';

const AuthHandler = ({ token, onLogout }) => {
  const [userMessage, setUserMessage] = useState('');

  const checkTokenExpiration = (token) => {
    const decodedToken = parseJwt(token);
    return decodedToken && decodedToken.exp * 1000 > Date.now();
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('https://awd-2023.azurewebsites.net/Auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const message = await response.text();
        setUserMessage(message);
      } else {
        console.error('Failed to fetch user profile');
        onLogout(); // Logout the user on failed request
      }
    } catch (error) {
      console.error('Error during user profile fetch:', error);
    }
  };

  useEffect(() => {
    if (token && checkTokenExpiration(token)) {
      // Token is valid, fetch user profile
      fetchUserProfile();
    } else {
      onLogout(); // Token is expired or not available, logout the user
    }
  }, [token, onLogout]);

  return <div>{userMessage && <p>{userMessage}</p>}</div>;
};

export default AuthHandler;
