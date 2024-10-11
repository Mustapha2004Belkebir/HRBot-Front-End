import { Link } from "react-router-dom";
import "./WhoAreYou.css";
import Logo from "../assets/images/Logo.png";

function WhoAreYou() {
  return (
    <div className="WhoAreYou">
      <div className="WhoAreYou-body">
        <div className="WhoAreYou-head">
          <img src={Logo} alt="Logo" className="Logo" />
          <div className="WhoAreYou-title">
            Are you an HR agent or a Job Seeker
          </div>
        </div>

        <div className="question">
          <div className="question-option">
            <div className="question-title">HR agent</div>
            <div className="question-text">
              Are you an HR professional looking to streamline your recruitment
              process? Our AI tool lets you easily post job offers, track
              applicants, and use a chatbot for initial interviews. Optimize
              your hiring with in-depth analytics and personalized
              recommendations for each candidate.
            </div>
            <Link to="/signUpHr" className="question-button">
              I am an HR agent
            </Link>
          </div>

          <div className="question-dividor"></div>

          <div className="question-option">
            <div className="question-title">Job seeker</div>
            <div className="question-text">
              Are you seeking new career opportunities? Our AI tool helps you
              find job offers that match your skills, get detailed feedback on
              your resume, and receive personalized tips to improve your
              applications. Simplify your job search and find the perfect fit
              for your career goals.
            </div>
            <Link to="/signUpJobSeeker" className="question-button">
              I am a Job Seeker
            </Link>
          </div>
        </div>

        <div className="already-exist">
          Already have an ccount?{" "}
          <Link to="/login" className="Log-in-link">
            Log in
          </Link>
        </div>
      </div>

      <div className="ellipse-1"></div>
      <div className="ellipse-2"></div>
    </div>
  );
}

export default WhoAreYou;
