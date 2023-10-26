import React, { useState } from 'react';
import './login.css';
import "./Header.css";
import { NavLink } from 'react-router-dom';
import VideoSearch from './VideoSearch';


const Head = ({ user }) => {
  // Check if the user object exists and has a name property
  const userName = user?.name;

  // Check if userName exists before extracting the first letter
  const capitalizedFirstLetter = userName ? userName.charAt(0).toUpperCase() : '';

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
    <div className='header_main'>
      <div className="header_section1">
        <div className="dropdown_mobile">
          <div className="three_lines_class"><img className="three_lines" src="images/three_lines.png" alt="l" width="30px" height="20px" /></div>
          <div className="mobile_menu">
            <img src="images/eng.png" alt="l" width="20px" height="15px" /><span id="span1_header_mobile">Courses</span><br></br>
            <img src="images/eng.png" alt="l" width="20px" height="15px" /><span id="span1_header_mobile">Teach with us</span><br></br>
            <img src="images/eng.png" alt="l" width="20px" height="15px" /><span id="span1_header_mobile">About us</span><br></br>
            <img src="images/eng.png" alt="l" width="20px" height="15px" /><span id="span1_header_mobile">Contact us</span>
          </div>
        </div>
        <img src="images/logo_conn.png" id="logo_img" alt="logo" width="200px" height="50px" />
       <div className="dropmenu"> <NavLink to="/vediolist"> <span id="span1_header">Courses</span> </NavLink>
          <div className="dropdown">
            <h4><img src="images/eng.png" alt="l" width="20px" height="15px" />computer engineering</h4>
            <h4><img src="images/eng.png" alt="l" width="20px" height="15px" />computer engineering</h4>
            <h4><img src="images/eng.png" alt="l" width="20px" height="15px" />computer engineering</h4>
            <h4><img src="images/eng.png" alt="l" width="20px" height="15px" />computer engineering</h4>
            <h4><img src="images/eng.png" alt="l" width="20px" height="15px" />computer engineering</h4>
            <h4><img src="images/eng.png" alt="l" width="20px" height="15px" />computer engineering</h4>
          </div>
        </div>
      {/*  <input
          type="text"
          placeholder="Search Anything..."
  />*/}
  <VideoSearch/>
        <span id="span1_header">Teach with us</span>

        {user ? (
          // If the user is logged in, display links to the respective dashboards
          <>
            {user.role === 'student' && (
              <>
              
              <div
      className="login-button-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
     <NavLink to="/student/dashboard">
             <button className="header_signUp1_h1"> {capitalizedFirstLetter}</button>
              </NavLink>
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
              
              
             </>
            )}
            {user.role === 'faculty' && (
            <NavLink to="/LecturerProfile ">
            <button className="header_signUp1_h1"> {capitalizedFirstLetter}</button>
             </NavLink>
            )}
          </>
        ) : (
          // If no user is logged in, display the "Login" and "SignUp" buttons
          <>
            <NavLink to="/login_options">
              <button className="header_login">Login</button>
            </NavLink>
            <NavLink to="/register_options">
              <button className="header_signUp">SignUp</button>
            </NavLink>
          </>
        )}
      </div>
   <hr/>
    </div>
  );
};

export default Head;
