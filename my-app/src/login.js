import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Save user info in a cookie for 1 day
    Cookies.set('user_session', email, { expires: 1 });
    navigate('/home');
  };

  return (
    <div className="container landing-page">
      <div className="glass-panel">s
        <h2>Explorer Login</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email Address" 
            onChange={(e) => setEmail(e.target.value)} // React Event
            required 
          />
          <button type="submit">Enter Orbit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;