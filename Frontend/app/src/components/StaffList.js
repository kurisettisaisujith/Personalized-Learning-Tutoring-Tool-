import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaRegBookmark, FaStar, FaFireAlt } from 'react-icons/fa';
import Top_faculty_more from './Top_faculty_more';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import "./facultylist.css";

function FacultyList() {
  const [facultyList, setFacultyList] = useState([]);

  useEffect(() => {
    // Fetch the sorted faculty list when the component mounts
    fetch('http://localhost:3000/faculty-list')
      .then((response) => response.json())
      .then((data) => {
        setFacultyList(data);
      })
      .catch((error) => console.error('Error fetching faculty list:', error));
  }, []);

  return (
    <div className='html'>
   
      <div id="onclick_h1">
        <span id="onclick_h1">Top Rated Faculty</span>  <NavLink to="/Top_faculty_more">
      <button>View More</button></NavLink>
      </div>
      <div className='facultyList'>
      <ul id="on_span_p">
        {facultyList.map((faculty) => (
        
          <li key={faculty._id}>
             <div  className='facultyCard'>
             <div className='image'></div><center><img src="./images/person_login_symbol.png" alt='faculty-img' className='facultyImage'></img></center>
             <div className='facultyCard__content'>
                   
                     <p><span>Name :</span>{faculty.name}</p>
        <p><span>Rating :</span>{faculty.
averageVideoRating.toFixed(2)}</p>
 
                         
                        
                        <p><span>Bio :</span>Good at programing and mathematics</p>
                 
                    
                 
                     <div className='profileVideos'><center><Link to={`/faculty/videos/${faculty.email}`}>
                <button>View Videos</button>
              </Link></center></div>
                 </div>
           {/* <p>Name: {faculty.name}</p>
            <p>Email: {faculty.email}</p>
                             <p>Average Rating: {faculty.averageRating}</p>*/}
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default FacultyList;
