import "./OBfooter.css";
import Logo from "../assets/images/Logo.png";
import FB from "../assets/images/FB.png";
import Insta from "../assets/images/Insta.png";
import LinkedIn from "../assets/images/in.png";

function OBfooter() {
  return (
    <div className="OBfooter" id="contact-us">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-logo">
            <img src={Logo} alt="Logo" className="Logo" />
            <div className="Slogon">HR Bot</div>
          </div>
          <div className="footer-contact-us">
            <div className="footer-details">
              <div className="footer-text">Contact Us</div>
              <div className="footer-text">
                Website: <a href="https://thynktechcom.com">Thynk Tech</a>
              </div>
              <div className="footer-text">Birkhadem</div>
              <div className="footer-text">Birkhadem, Birkhadem 16029, DZ</div>
              <div className="footer-text">
                Email: <a href="contact@thynktechdz.com">Thynk Tech</a>
              </div>
            </div>
            <div className="footer-links">
              <a href="https://web.facebook.com/profile.php?id=100091310131444">
                <img src={FB}></img>
              </a>
              <a href="https://www.instagram.com/thynktechdz/">
                <img src={Insta}></img>
              </a>
              <a href="https://www.linkedin.com/company/thynk-tech-dz/posts/?feedView=all">
                <img src={LinkedIn}></img>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-features">
          <div className="footer-features-title">Features</div>
          <div className="footer-features-text">
            Post Jobs
            <br />
            Applicant Tracking
            <br />
            Chatbot Interviews
            <br />
            Resume Review
            <br />
            Job Matching
            <br />
            Personalized Tips
            <br />
          </div>
        </div>
      </div>
      <div>
        <div className="footer-copyright">Copyright © 2024 Thynk Tech DZ</div>
      </div>
    </div>
  );
}

export default OBfooter;
