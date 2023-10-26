import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaRegBookmark, FaStar, FaFireAlt } from 'react-icons/fa';
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
    <div>
      <h2>Faculty List (Sorted by Average Rating)</h2>
      <div className='facultyList'>
      <ul>
        {facultyList.map((faculty) => (
        
          <li key={faculty._id}>
             <div key={props.id} className='facultyCard'>
             <div className='image'></div><center><img src="./images/person_login_symbol.png" alt='faculty-img' className='facultyImage'></img></center>
             <div className='facultyCard__content'>
                     <h3 className='facultyName'>Name: {faculty.name}</h3>
                     <div className='displayStack__1'>
                         
                        
                         <div className='description'> Good at programing and mathematics</div>
                     </div>
                     <div className='displayStack__2'>
                         
                     <div className='facultyRating'>
                             {[...Array(props.rating)].map((index) => (
                                 <FaStar id={index + 1 } key={index} />
                             ))}
                         </div>
                     </div>
                     <div className='profileVideos'><center><button type="button" >Videos</button></center></div>
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
