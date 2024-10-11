import { useState } from "react";
import JSheader from "../components/JSheader.jsx";
import JSRCform from "../components/JSRCform.jsx";
import JSRCresult from "../components/JSRCresult.jsx";
import "./JSresumeConsulter.css";

function JSresumeConsulter() {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({});

  return (
    <div className="JSresumeConsulter">
      <JSheader></JSheader>
      <div className="JSRCbody">
        <JSRCform
          showResult={showResult}
          setShowResult={setShowResult}
          result={result}
          setResult={setResult}
        ></JSRCform>
        <JSRCresult showResult={showResult} result={result}></JSRCresult>
      </div>
    </div>
  );
}

export default JSresumeConsulter;
