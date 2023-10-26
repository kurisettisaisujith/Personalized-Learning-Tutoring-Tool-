import React from 'react';
import {NavLink} from 'react-router-dom'; 
import './LoginOption.css';

const RegistrationOptions = () => {
  return (
    <div>
         <div className="container">
    <h1 >Select Your Role</h1>
    <div class="icon-container">
        <img src="./images/student-icon.png" alt="Student Icon" class="icon" id="studentIcon" height="100px" width="100px" style={{ marginRight: '30%' }}/>
        <img src="./images/staff-icon.png" alt="Staff Icon" class="icon" id="staffIcon" height="100px" width="100px"/>
    </div>
    <NavLink  to ="/student/register" > <button id="studentButton" style={{ marginRight: '30%' }}>Student</button></NavLink>
    <NavLink  to ="/faculty/register" >  <button id="staffButton">Staff</button> </NavLink>


</div>
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
  )
}

export default RegistrationOptions
