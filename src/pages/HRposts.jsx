import HRheader from "../components/HRheader";
import HRpostscomponent from "../components/HRpostscomponent";
import "./HRposts.css";

function HRposts() {
  return (
    <div className="HRposts">
      <HRheader></HRheader>
      <HRpostscomponent></HRpostscomponent>
    </div>
  );
}

export default HRposts;
