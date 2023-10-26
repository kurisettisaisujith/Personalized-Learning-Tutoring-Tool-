import React, { useState } from 'react';
import './login.css'
function LoginButton (props) {
  const [isCardVisible, setCardVisible] = useState(false);

  const handleMouseEnter = () => {
    setCardVisible(true);
  };

  const handleMouseLeave = () => {
    setCardVisible(false);
  };

  const handleSignOut = () => {
    // Implement sign-out logic here.
    // For example, you can clear user session or redirect to a logout page.
  };

  return (
    <div
      className="login-button-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src='https://cdn-icons-png.flaticon.com/512/5609/5609484.png' className='profileimg'/>
      {isCardVisible && (
        <div
          className="user-card"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="user-info">
          <center><div class="alphabet-container">A</div></center>

            <p>Name: John Doe</p>
            <p>Email: john@example.com</p>
          </div>
          <button className="sign-out-button" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
      <div className='box'><img src=''></img></div>
    </div>
    
  );
};

export default LoginButton;