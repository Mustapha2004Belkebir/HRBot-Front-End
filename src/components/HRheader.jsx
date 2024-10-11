import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HRheader.css";
import logo from "../assets/images/Logo.png";
import UserProfile from "../assets/images/UserProfile.png";
import Posts from "../assets/images/Posts.png";
import Status from "../assets/images/Status.png";
import Setting from "../assets/images/Setting.png";

function HRheader() {
  const postsRef = useRef(null);
  const statusRef = useRef(null);
  const settingRef = useRef(null);

  const handleClick = (event) => {
    postsRef.current.classList.remove("active");
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
    <div className="HRheader">
      <div className="HRheader-content">
        <div className="HRheader-logo">
          <img src={logo} className="HRlogo" alt="logo" />
        </div>
        <div className="HRheader-user-profile">
          <img
            src={UserProfile}
            className="HRuser-profile"
            alt="user-profile"
          />
          <div className="HRheader-user-name">User Name</div>
        </div>
        <Link
          to="/hrPosts"
          className="HRheader-user-posts"
          onClick={handleClick}
          ref={postsRef}
        >
          <img src={Posts} className="HRheader-img" alt="posts" />
          <div className="HRheader-text">Posts</div>
        </Link>
        <Link
          className="HRheader-status"
          onClick={handleClick}
          ref={statusRef}
          to="/applicationStatusHr"
        >
          <img src={Status} className="HRheader-img" alt="status" />
          <div className="HRheader-text">Application Status</div>
        </Link>
        <Link
          className="HRheader-setting"
          onClick={handleClick}
          ref={settingRef}
          to="/hrSetting"
        >
          <img src={Setting} className="HRheader-img" alt="setting" />
          <div className="HRheader-text">Settings</div>
        </Link>
      </div>

      <div className="HRheader-log-out">
        <div onClick={() => handleLogout()} className="JSheader-log-out-button">
          Log Out
        </div>
      </div>
    </div>
  );
}

export default HRheader;
