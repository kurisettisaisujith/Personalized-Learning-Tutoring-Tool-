import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer1">
   <hr/>~
      <div className="container13">
        <div className="footer-content1">
          <div className="footer-section1">
            <img src="https://assets-global.website-files.com/636278799c5de66b6357762e/63aca894d31a0e94d928a9a0_tutorme-logo-stacked.svg" alt="Logo" />
           
          </div>
          <div className="footer-section1">
            <h3>Who We Serve</h3>
            <ul>
              <li><a href="#">K-12 School or District</a></li>
              <li><a href="#">College or University</a></li>
            </ul>
            <h3>Resources</h3>
            <ul>
              <li><a href="#">Code of Conduct</a></li>
              <li><a href="#">Visit Resource Hub</a></li>
              <li><a href="#">Articles</a></li>
            </ul>
          </div>
          <div className="footer-section1">
            <h3>About</h3>
            <ul>
              <li><a href="#">Company</a></li>
              <li><a href="#">Newsroom</a></li>
              <li><a href="#">Privacy and Trust</a></li>
            </ul>
          </div>
          <div className="footer-section1">
            <h3>Support</h3>
            <ul>
              <li><a href="#">Become a Tutor</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Help Center</a></li>
            </ul>
            <div className="login-button1">
              <button><a href="/login">Log In ▸</a></button>
             
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom1">
        <div className="copyright-privacy1">
          <div className="copyright1">
          <p>Made in California By GoGuardian Copyright <br/>&copy;2023.Zorro Holdco,LLC doing business as <br/>TutorMe.All Rights Reserved </p>
          </div>
          <div className="vertical-line1"></div>
          <div className="privacy-terms1">
            <p><a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a> | <a href="#">Accessibility</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;