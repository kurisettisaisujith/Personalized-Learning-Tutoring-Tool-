import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './All_Log.css';


function StudentRegistration() {
  const [formData, setFormData] = useState({
    name: '', // Add the name field
    email: '', // Change to email field
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
      const response = await fetch('http://localhost:3000/student/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
      
        alert('Registration successful moving to verification');
        // Redirect to the student login page after successful registration
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
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
      <label htmlFor="text">Name:</label>
        <input
          type="text" // Change to text input for name
          name="name" // Add the name field
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
        />
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
        <button type="submit" id="button1">Register</button>
      </form>
    </div>
    </div>
  );
}

export default StudentRegistration;
