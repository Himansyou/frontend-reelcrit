import "../css/login.css";

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        username,
        password
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log('Stored token:', localStorage.getItem('token'));


      navigate('/'); // Redirect after successful login
    } catch (err) {
      setErrorMsg('Invalid username or password.');
    }
  };
  

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {errorMsg && <p className="error">{errorMsg}</p>}

        <button type="submit">Login</button>
        <p>new to Reelcrit? <Link to="/register">Sign up</Link></p>
      </form>
    </div>
  );
}

export default Login;

