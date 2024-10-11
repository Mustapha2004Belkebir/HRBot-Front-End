import React from "react";
import "./HRsetting.css";
import HRsettingcomponent from "../components/HRsettingcomponent.jsx";
import HRheader from "../components/HRheader.jsx";

function HRsetting() {
  return (
    <div className="HRsetting">
      <HRheader></HRheader>
      <HRsettingcomponent></HRsettingcomponent>
    </div>
  );
}

export default HRsetting;
