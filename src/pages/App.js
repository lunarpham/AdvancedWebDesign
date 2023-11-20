// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import TodoList from '../components/TodoList';
import AuthHandler from '../components/AuthHandler';

const App = () => {
  const [token, setToken] = useState(null);

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={token ? (<Navigate to="/" />) : (<><LoginPage onLogin={handleLogin} /></>)}/>
        <Route path="/" element={token ? (<><AuthHandler token={token} onLogout={handleLogout} /><TodoList token={token} /></>) : (<Navigate to="/login" />)}/>
      </Routes>
    </Router>
  );
};

export default App;
