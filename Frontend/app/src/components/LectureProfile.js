import React from 'react';
import FacultyProfileVedios from './FacultyProfileVedios';
import { NavLink } from 'react-router-dom';
import './lectureprofile.css';



const LecturerProfile = ({ user }) => {
    const userName = user?.name;
    const capitalizedFirstLetter = userName ? userName.charAt(0).toUpperCase() : '';
  return (
    
    <div className="lecturer-profile">
        
      <div className="profiledetails">
      <center> <span id="lecture_name">Lecturer Details</span> </center><br/>
    <center> <buttton className="lecture_log">{capitalizedFirstLetter}</buttton></center>   
      
     <p><span>Name</span>:{user.name}</p> 
        <p><span>Designation</span>:Professor </p><br/>
        <p><span>Department</span>:Computer Science</p><br/>
        <p><span>Email</span>:{user.email}</p>
        <p><span>Rating</span>:{user. rating}</p>

        <div id="lecture_buttons"> <NavLink to="/vedio_uppload"><button>Upload Vedio</button></NavLink> <button>Logout</button></div>
       
        </div>
    <div className='lecuturervideos'>
    <div className="video-container">
     
                  
        <FacultyProfileVedios facultyEmail={user.email} />


        </div>
    </div>
    </div>
  );
};

export default LecturerProfile;