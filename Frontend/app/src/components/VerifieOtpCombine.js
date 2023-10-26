import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './All_Log.css';

function VerifyOTP() {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const handleSendOTP = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/send-otp', { // Updated URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setMessage(data.message);
        
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/verify-otp', { // Updated URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setMessage(data.message);
        alert(data.message);
        alert("Moving To login page");
        navigate('/login_options');
      
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
          <div className="container1">
     
      <h3>Email Verification</h3>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
        <button id="button1"  onClick={handleSendOTP}>Send OTP</button>
       
        <label>OTP:</label>
        <input type="text" value={otp} onChange={handleOTPChange} />
        <button id="button1" onClick={handleVerifyOTP}>Verify OTP</button>
     
      <div>{message}</div>
      </div>

      
     

     
    </div>
  );
}

export default VerifyOTP;
