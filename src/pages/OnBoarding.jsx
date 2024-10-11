import OBheader from "../components/OBheader.jsx";
import OBwelcome from "../components/OBwelcome.jsx";
import OBfeature from "../components/OBfeature.jsx";
import OBabout from "../components/OBabout.jsx";
import OBacheivment from "../components/OBacheivment.jsx";
import OBfooter from "../components/OBfooter.jsx";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function OnBoarding() {
  const location = useLocation();
  const message = location.state?.message; // Retrieve the message from the state

  useEffect(() => {
    // Check if the message exists and alert it
    if (message) {
      alert(message);
    }
  }, []); // one first come to this page check if it is from link or account delleted to alert about it

  return (
    <div className="OB">
      <OBheader></OBheader>
      <OBwelcome></OBwelcome>
      <OBfeature></OBfeature>
      <OBabout></OBabout>
      <OBacheivment></OBacheivment>
      <OBfooter></OBfooter>
    </div>
  );
}

export default OnBoarding;
