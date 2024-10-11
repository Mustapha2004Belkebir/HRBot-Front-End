import styles from "./ApplicantDetails.module.css";
import PropTypes from "prop-types";

const example = {
  applicantName: "Akram Fadene",
  applicationStatus: "pending",

  MatchingPercentage: 85,
  resume: "",
  FinalThoughts:
    "Overall, the candidate shows great potential. Some minor adjustments can improve their chances.",
  Weaknesses: [
    "Lack of experience in leadership roles",
    "Limited exposure to modern web frameworks",
  ],
  ImprovementTips: [
    "Gain experience in team leadership by taking on small management roles.",
    "Explore and practice using React or Vue.js to build modern web applications.",
  ],
  MissingKeywords: ["Agile", "Continuous Integration", "Cloud Computing"],
  Strengths: [
    "Strong analytical skills",
    "Excellent communication and collaboration",
    "Solid understanding of database design",
  ],
};

const photoExample = "src\\assets\\images\\MainPhoto.png";

function ApplicantDetails({
  applicantInformationDetails = example,
  closeApplicantDetails,
  jobPhoto = photoExample,
}) {
  const rejectApplicant = async () => {
    try {
      // Update the applicationStatus locally
      const updatedApplicantDetails = {
        ...applicantInformationDetails,
        applicationStatus: "Rejected", // Update the status to 'Rejected'
      };

      // Send the updated details to the backend
      const response = await fetch("/api/rejectApplicant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedApplicantDetails), // Send the full updated object
      });

      if (response.ok) {
        alert("Applicant has been rejected successfully.");
      } else {
        alert("Failed to reject the applicant.");
      }
    } catch (error) {
      console.error("Error rejecting the applicant:", error);
    }
  };

  // Function to handle hiring
  const hireApplicant = async () => {
    try {
      // Update the applicationStatus locally
      const updatedApplicantDetails = {
        ...applicantInformationDetails,
        applicationStatus: "Accepted", // Update the status to 'Accepted'
      };

      // Send the updated details to the backend
      const response = await fetch("/api/hireApplicant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedApplicantDetails), // Send the full updated object
      });

      if (response.ok) {
        alert("Applicant has been hired successfully.");
      } else {
        alert("Failed to hire the applicant.");
      }
    } catch (error) {
      console.error("Error hiring the applicant:", error);
    }
  };

  console.log(closeApplicantDetails);
  return (
    <div className={styles.componentContainer}>
      <div className={styles.componentInformation}>
        <div className={styles.applicantinformation}>
          <h2 className={styles.name}>
            {applicantInformationDetails.applicantName}
          </h2>
          <div className={styles.group}>
            <label className={styles.label}>Matching Percentage</label>
            <p className={styles.p}>
              Your resume matches 85% of the job description for the Full Stack
              Developer position.
            </p>
          </div>
          <div className={styles.group}>
            <label className={styles.label}>Final thought</label>
            <p className={styles.p}>
              Overall, this applicant suits well the job.
            </p>
          </div>
          <div className={styles.group}>
            <label className={styles.label}>Strengths</label>
            <ul>
              {applicantInformationDetails.Strengths.map((strength, index) => (
                <li key={index} className={styles.li}>
                  {strength}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.group}>
            <label className={styles.label}>Weaknesses</label>

            <ul>
              {applicantInformationDetails.Weaknesses.map((weakness, index) => (
                <li key={index} className={styles.li}>
                  {weakness}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.photoResume}>
          <button
            className={styles.closeButton}
            onClick={closeApplicantDetails}
          >
            X
          </button>

          <img src={`/${jobPhoto}`} alt="jobPhoto" className={styles.img} />

          <div className={styles.group}>
            <label className={styles.label}>Resume</label>
            <p className={styles.pResume}>
              <img src="src\\assets\\images\\PDF.png" alt="pdf-img" />
              <a
                href={applicantInformationDetails.resume}
                className={styles.a}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* Add here the url to the Resume */}
                {applicantInformationDetails.applicantName}-resume.pdf
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.Decision}>
        <p className={styles.reject} onClick={rejectApplicant}>
          I want to reject this applicant
        </p>
        <button className={styles.btn} onClick={hireApplicant}>
          Hire
        </button>
      </div>
    </div>
  );
}
ApplicantDetails.propTypes = {
  applicantInformationDetails: PropTypes.shape({
    applicantName: PropTypes.string.isRequired,
    applicationStatus: PropTypes.string.isRequired,
    MatchingPercentage: PropTypes.number.isRequired,
    resume: PropTypes.string,
    FinalThoughts: PropTypes.string,
    Weaknesses: PropTypes.arrayOf(PropTypes.string).isRequired,
    ImprovementTips: PropTypes.arrayOf(PropTypes.string).isRequired,
    MissingKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    Strengths: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  closeApplicantDetails: PropTypes.func,
  jobPhoto: PropTypes.string,
};
export default ApplicantDetails;
