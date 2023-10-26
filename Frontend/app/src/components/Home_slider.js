import React from 'react';
import Timer from "./Timer";
import Home_body from './Home_body';
import CardContainer from './CardContainer';
import CardSet2 from './CardSet2';
import File_aim from './File_aim';
import Top_rated_vedios from '../Top_rated_vedios'
import Onclick_title from '../Onclick_title';
import StaffList from './StaffList'


const body_slider = ( {user}) => {
  return (
    <div>
     
     
    <div>



  <Timer/> 
 <File_aim/>
 <CardSet2/><br/><br/><br/><hr/>
 <Onclick_title  user={user}/><hr/>

 <Top_rated_vedios user={user}/> <hr/>
 <StaffList/><hr/>

 <CardContainer/><br/><br/><br/>
 
 




    </div>
   
      
    
    </div>
  )
}

export default body_slider
