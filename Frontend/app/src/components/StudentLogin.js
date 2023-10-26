import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import './All_Log.css';

function StudentLogin({ setUser }) {
  const [formData, setFormData] = useState({
    email: '', // Change to email field
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/student/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);

        // Decode the token to get user role
        const decodedToken = jwt_decode(data.token);
        console.log(decodedToken)

        setUser({
          email: decodedToken.email, // Change to email field
          role: decodedToken.role,
          name:decodedToken.name
          
        });
        alert("Student Login Successfull Moving To Dash Board");

        navigate('/student/dashboard');
      } else {
        alert("Invalid credentials")
        console.error('Login failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
       <div className="container1">
      <h2>Student Login</h2>
      <form>
      <label htmlFor="email">Email:</label>
        <input
          type="email" // Change to email input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
         <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="button" id="button1" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
    </div>
  );
}

export default StudentLogin;
