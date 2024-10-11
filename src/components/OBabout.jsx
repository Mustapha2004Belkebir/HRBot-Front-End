import "./OBabout.css";
import companyLogo from "../assets/images/companyLogo.png";
import { Link } from "react-router-dom";

function OBabout() {
  return (
    <div className="about-us" id="about-Us">
      <div className="OB-head">
        <div className="OB-title">About Us</div>
        <div className="title-line"></div>
      </div>

      <div className="about-body">
        <div className="about-text">
          <div className="about-description">
            At Thynk Tech dz, we are a renowned consulting and communication
            agency dedicated to prioritizing the success of our valued clients.
            Committed to delivering exceptional results, our team combines
            research expertise with effective communication strategies to ensure
            our clients achieve their goals. By understanding their unique needs
            and providing tailored solutions, we consistently strive to exceed
            expectations and foster long-term partnerships.
          </div>
          <div className="trust-message">
            Trust our dedicated professionals to enhance your brand and propel
            your business to unprecedented success.
          </div>
          <Link to="/" className="visit-website">
            Visit Our Website
          </Link>
        </div>

        <img className="company-logo" src={companyLogo} alt="Placeholder" />
      </div>
    </div>
  );
}

export default OBabout;
