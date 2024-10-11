import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./JSheader.css";
import logo from "../assets/images/Logo.png";
import UserProfile from "../assets/images/UserProfile.png";
import Posts from "../assets/images/Posts.png";
import ResumeConsulter from "../assets/images/ResumeConsulter.png";
import Status from "../assets/images/Status.png";
import Setting from "../assets/images/Setting.png";

function JSheader() {
  const postsRef = useRef(null);
  const resumeRef = useRef(null);
  const statusRef = useRef(null);
  const settingRef = useRef(null);

  const handleClick = (event) => {
    postsRef.current.classList.remove("active");
    resumeRef.current.classList.remove("active");
    statusRef.current.classList.remove("active");
    settingRef.current.classList.remove("active");

    const element = event.currentTarget;

    element.classList.add("active");
  };

  const navigate = useNavigate(); // Initialize navigate
  const handleLogout = () => {
    // Clear the authentication token from localStorage
    localStorage.removeItem("authToken");

    // Redirect to the login or homepage after logout
    navigate("/", {
      state: { message: "You have been logged out successfully." },
    });
  };

  return (
    <div className={"JSheader"}>
      <div className="JSheader-content">
        <div className="JSheader-logo">
          <img src={logo} className="JSlogo" alt="logo" />
        </div>
        <div className="JSheader-user-profile">
          <img
            src={UserProfile}
            className="JSuser-profile"
            alt="user-profile"
          />
          <div className="JSheader-user-name">User Name</div>
        </div>
        <Link
          to="/posts"
          className="JSheader-user-posts"
          onClick={handleClick}
          ref={postsRef}
        >
          <img src={Posts} className="JSheader-img" alt="posts" />
          <div className="JSheader-text">Posts</div>
        </Link>
        <Link
          className="JSheader-resume-consult"
          onClick={handleClick}
          ref={resumeRef}
          to="/resumeConsulter"
        >
          <img
            src={ResumeConsulter}
            className="JSheader-img"
            alt="resume-consulter"
          />
          <div className="JSheader-text">Resume Consulter</div>
        </Link>
        <Link
          className="JSheader-status"
          onClick={handleClick}
          ref={statusRef}
          to="/applicationStatus"
        >
          <img src={Status} className="JSheader-img" alt="status" />
          <div className="JSheader-text">Application Status</div>
        </Link>

        <Link
          className="JSheader-setting"
          onClick={handleClick}
          ref={settingRef}
          to="/JobSeekerSetting"
        >
          <img src={Setting} className="JSheader-img" alt="setting" />
          <div className="JSheader-text">Settings</div>
        </Link>
      </div>

      <div className="JSheader-log-out">
        <div onClick={() => handleLogout()} className="JSheader-log-out-button">
          Log Out
        </div>
      </div>
    </div>
  );
}

export default JSheader;
