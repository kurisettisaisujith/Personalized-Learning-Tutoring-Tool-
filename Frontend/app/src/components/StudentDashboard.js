import React from 'react';
import Home_slider from './Home_slider';
import Timer from "./Timer";
import Home_body from './Home_body';
import CardContainer from './CardContainer';
import CardSet2 from './CardSet2';

function StudentDashboard({ user }) {
 
  if (!user) {
    return <p>User data not available.</p>;
  }

 

  return (
    <div>
    
      <h2>Welcome, {user.name}!</h2>
      <Home_slider  user = {user}/>
      
    
      {/* Render the rest of your dashboard components */}
    </div>
  );
}

export default StudentDashboard;
