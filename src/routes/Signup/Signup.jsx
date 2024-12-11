import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.scss';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user', // Default role for new users
  });
  const { login } = useAuth(); 

  const [errors, setErrors] = useState({}); // State to hold error messages
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Validation function
  const validate = () => {
    const newErrors = {};

    // First Name Validation
    if (!form.firstName) {
      newErrors.firstName = "First Name is required.";
    }

    // Last Name Validation
    if (!form.lastName) {
      newErrors.lastName = "Last Name is required.";
    }

    // Email Validation
    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid.";
    }

    // Password Validation
    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    // Confirm Password Validation
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors); // Update errors state
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return; // If validation fails, stop form submission
    }

    try {
      const response = await axios.post('https://capstone-server-aclw.onrender.com/api/signup', form);
      const { token, user } = response.data;

      localStorage.setItem("token", token); // Store token
      navigate("/login"); // Redirect to login
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert("Signup failed. Please try again.");
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
    <>
      <div className="signup-container">
        <div className="signup-card">
          <h2 className="form-heading" style={{ textAlign: 'center' }}>Create Your Account</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>

            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
              />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>

            <p className="form-text">
              Already have an account? <Link className="nav-link" to="/login">Sign in</Link>
            </p>

            <div className="divider">OR</div>
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />

            <button type="submit">Signup</button>
          </form>
          </div>
      </div>
    </>
  );
}

export default Signup;
