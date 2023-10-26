import React from 'react';
import './File_aim.css';
import StudentRegistration from './StudentRegistration';
import FacultyRegistration from './FacultyRegistration';
import { NavLink } from 'react-router-dom';

const File_aim = () => {
  return (
    <div>
      <div className='Text_image'>
        <span className='text1'>Our Aim Is To</span><br/>
        <span className='text2'>Bridge Students with Faculty</span><br/>
        <div className='Text_image_button'>
        <NavLink to="/student/register">   <button className='Text_button1'>Connect With Faculty<br/><img src="./images/next.png" alt="arrow" width="20px" height="20px"/></button></NavLink>
        <NavLink to="/faculty/register">   <button className='Text_button2'>Want To Become Tutor<br/><img src="./images/next.png" alt="arrow" width="20px" height="20px"/></button></NavLink>
        </div>
      </div>
       <br/>
       <hr/>
    </div>
  )
}

export default File_aim
