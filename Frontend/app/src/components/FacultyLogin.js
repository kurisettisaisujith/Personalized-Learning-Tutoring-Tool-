import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './All_Log.css';
import jwt_decode from 'jwt-decode';

function FacultyLogin({ setUser }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/faculty/login', {
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
        console.log(decodedToken);

        setUser({
          email: decodedToken.email,
          role: decodedToken.role,
          name: decodedToken.name,
          rating:decodedToken.rating
        });
        alert("Faculty Login Successful Moving dashboard");
     console.log("Faculty Login Successful Moving dashboard");
        navigate('/faculty/dashboard');
      } else {
       
        alert("Invalid creditials");
        console.error('Login failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div >
      <div className="container1">
      <h2>Faculty Login</h2>
      <form>
      <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
          <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button type="button" id="button1" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
    </div>
  );
}

export default FacultyLogin;
