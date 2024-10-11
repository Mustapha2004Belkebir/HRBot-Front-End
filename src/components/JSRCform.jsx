import { useState } from "react";
import cloudImage from "../assets/images/Dowload_Resume.png";
import "./JSRCform.css";

function JSRCform({ showResult, setShowResult, result, setResult }) {
  const [description, setDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleConsult = () => {
    const fetchUser = async () => {
      try {
        const res = await fetch("src\\assets\\data\\DummyData2.json");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setResult(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUser();

    setShowResult(true);
  };

  // this is ready to use just do the needed small change

  // const handleConsult = async () => {
  //     if (!description || !resumeFile) {
  //         alert("Please provide both a job description and a resume file.");
  //         return;
  //     }

  //    // Retrieve the token from localStorage
  //     const token = localStorage.getItem('authToken');

  //     if (!token) {
  //         alert("Authentication token not found. Please log in.");
  //         return;
  //     }

  //     const formData = new FormData();
  //     formData.append('description', description);  // Append job description
  //     formData.append('resume', resumeFile);        // Append resume file

  //     try {
  //         const response = await fetch("YOUR_BACKEND_URL/api/consult", {  // Replace with your backend URL
  //             method: 'POST',
  //             headers: {
  //                 'Authorization': `Bearer ${token}`,  // Include token in Authorization header
  //             },
  //             body: formData,  // Send form data
  //         });

  //         if (!response.ok) {
  //             throw new Error(`HTTP error! status: ${response.status}`);
  //         }

  //         const data = await response.json();  // Process response from backend
  //         setResult(data);                     // Set the result data
  //         setShowResult(true);                 // Show the result

  //         console.log('Form submitted successfully:', data); // Log the response
  //     } catch (error) {
  //         console.error("Error submitting form:", error);
  //     }
  // };

  return (
    <div className="JSRCform">
      <div className="JSCRformHead">
        <div className="JSCRformTitle">Resume Consulter</div>
        <div className="JSCRformText">
          Upload your resume and the job description to see how well your
          qualifications align with the job requirements. Our tool will provide
          insights and suggestions to help you tailor your resume for the best
          chance of landing the job.
        </div>
      </div>

      <div className="JSCRformBody">
        <div className="JSCRjobDescription">
          <label htmlFor="description" className="JSCRjobDescriptionTitle">
            Job description:
          </label>
          <textarea
            id="description"
            className="JSCRjobDescriptionInput"
            name="description"
            placeholder="Describe the job you want to apply for ...."
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>

        <div className="JSCRresume">
          <div className="JSCRresumeTitle">Resume</div>
          <div className="JSCReditResume">
            <img src={cloudImage} alt="cloud icon" className="cloudImage" />
            <div className="CVtext">
              <div className="SelectFile">
                Select a file or drag and drop here
              </div>
              <div className="SelectFile">PDF, file size no more than 10MB</div>
            </div>
            <label className="fileLabel" htmlFor="resume-upload">
              Replace File
            </label>
            <input
              id="resume-upload"
              className="fileInput"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
            />
          </div>
          <div className="JSRCsubmitcontainer">
            <button
              id="resume-upload"
              className="JSRCsubmit"
              type="submit"
              onClick={handleConsult}
            >
              Consult
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JSRCform;
