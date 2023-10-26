import React from 'react';
import LecturerProfile from './LectureProfile';
import Home_slider from './Home_slider';


function FacultyDashboard({ user }) {
  if (!user) {
    return <p>User data not available.</p>;
  }

  return (
    <div>
   {/*  <h2>Welcome, {user.name}!</h2>*/}
   <Home_slider  user = {user}/>
      {/* Render the rest of your dashboard components */}
    </div>
  );
}

export default FacultyDashboard;
