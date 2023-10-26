import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import StudentLogin from './components/StudentLogin';
import FacultyLogin from './components/FacultyLogin';
import StudentDashboard from './components/StudentDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import StudentRegistration from './components/StudentRegistration';
import FacultyRegistration from './components/FacultyRegistration';
import LoginOptions from './components/LoginOptions';
import RegistrationOptions from './components/RegistrationOptions';
import Home from './components/Home';
import Home_slider from './components/Home_slider';
import VerifyOtpCombine from './components/VerifieOtpCombine';
import Header from './components/Header';
import CardSet2 from "./components/CardSet2";
import CardContainer from './components/CardContainer';
import Footer from './components/Footer';
import LoginButton from './components/LoginButton';
import VedioList from './VedioList';
import Main_search from './components/Main_search';
import StaffList from './components/StaffList';
import FacultyVideos from './components/FacultyVedios';
import Top_videos_more from './components/Top_videos_more';
import Top_faculty_more from './components/Top_faculty_more';
import Onclick_title from './Onclick_title';
import LecturerProfile from './components/LectureProfile';
import Video_upp from './components/Video_upp';
import VideoList2 from './components/VedioList2';
import VideoSearch from './components/VideoSearch';



import './index.css';

function App() {
  const [user, setUser] = useState(null);


  return (
    <BrowserRouter>
  <Header user={user} /> 

      <Routes>
      <Route path="/" element={<Home_slider  user = {user}/>} />
      <Route path="/y" element={<Main_search />} />
      <Route path="/vedio_uppload" element={<Video_upp />} />
      <Route path="/u" element={<VideoSearch />} />
      <Route path="/videos/:searchQuery" element={<VideoList2 />} />

      <Route path="/Top_videos_more" element={<Top_videos_more/>} />
      <Route path="/Top_faculty_more" element={<Top_faculty_more/>} />
      <Route path="/faculty/videos/:email" element={<FacultyVideos/>} />
      <Route path="/Onclick_title" element={<Onclick_title />} />
      <Route path="/LecturerProfile" element={<LecturerProfile   user = {user?user:"none"}/>} />

   
   <Route path="/verifie/otp" element={<VerifyOtpCombine/>} />
      <Route path="/login_options" element={<LoginOptions/>} />
      <Route path="/register_options" element={<RegistrationOptions/>} />
        <Route path="/student/login" element={<StudentLogin setUser={setUser} />} />
        <Route path="/faculty/login" element={<FacultyLogin setUser={setUser} />} />
        <Route path="/student/dashboard" element={user && user.role === 'student' ? <StudentDashboard user={user} /> : <p>Unauthorized</p>} />
        <Route path="/faculty/dashboard" element={user && user.role === 'faculty' ? <FacultyDashboard user={user} /> : <p>Unauthorized</p>} />
        <Route path="/student/register" element={<StudentRegistration />} />
        <Route path="/faculty/register" element={<FacultyRegistration />} />
        <Route path="/vediolist"  element={<VedioList user={user}/>}/>
        
    
      </Routes>
    <Footer/> 
  
      </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
