import "./OBwelcome.css";
import { Link } from "react-router-dom";
import imgOne from "../assets/images/imgOne.png";
import imgTwo from "../assets/images/imgTwo.png";
import imgThree from "../assets/images/imgThree.png";

function OBwelcome() {
  return (
    <div className="Welcome">
      <div className="welcome-imgs">
        <img className="img-one" src={imgOne} alt="Placeholder" />
        <img className="img-two" src={imgTwo} alt="Placeholder" />
        <img className="img-three" src={imgThree} alt="Placeholder" />
      </div>
      <div className="welcome-text">
        <div className="greeting">Welcome to HR Bot</div>
        <div className="intro">
          Optimize your hiring process or advance your job search with our
          AI-driven tools. Whether you're an HR professional seeking to
          streamline recruitment or a job seeker aiming to improve your career
          prospects, HR-Agent is here to support you. Choose your role below to
          begin your journey
        </div>
        <div className="welcome-buttons">
          <Link to="/signUpHr" className="IAmAnHr">
            I am an HR
          </Link>
          <Link to="/signUpJobSeeker" className="IAmAJobSeeker">
            I am a Job Seeker
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OBwelcome;
