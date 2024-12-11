import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    
    // Password validation
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 5) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Form is valid if there are no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Prevent submission if form is invalid
    
    setLoading(true);
    try {
      const response = await axios.post('https://capstone-server-aclw.onrender.com/api/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      login(user);

      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const googleToken = credentialResponse.credential;

    try {
      const response = await axios.post('https://capstone-server-aclw.onrender.com/api/login/google', { token: googleToken });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      login(user);

      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Google login error:', error.response?.data || error.message);
      alert('Google login failed. Please try again.');
    }
  };

  const handleGoogleError = (error) => {
    console.error('Google login error:', error);
    alert('Google login failed. Please try again.');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="form-heading">Welcome Back!</h2>
        <p className="form-subtext">Log in to your account</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`login-input ${errors.email ? 'input-error' : ''}`}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`login-input ${errors.password ? 'input-error' : ''}`}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="divider">OR</div>
        <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />

        <p className="form-text">
          Don't have an account? <Link className="nav-link" to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
