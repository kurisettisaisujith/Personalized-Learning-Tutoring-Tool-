import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './All_Log.css';

function FacultyRegistration() {
  const [formData, setFormData] = useState({
    username: '',
    email: '', // Add the email field
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send registration data to your backend (replace with actual API call)
      const response = await fetch('http://localhost:3000/faculty/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Registration successful moving to verification');
        // Redirect to the faculty login page after successful registration
        navigate('/verifie/otp');
      } else {
        alert("user already exist");
        console.error('Registration failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
       <div className="container1">
      <h2>Faculty Registration</h2>
      <form onSubmit={handleSubmit}>
      <label htmlFor="text">Name:</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email" // Use type="email" for email input
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
        <button id="button1" type="submit">Register</button>
      </form>
    </div>
    </div>
  );
}

export default FacultyRegistration;
