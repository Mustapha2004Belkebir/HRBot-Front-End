import { useNavigate } from "react-router-dom";
import styles from "./JobPost.module.css";
import PropTypes from "prop-types";

const example = {
  mainPhoto: "src\\assets\\images\\cardPhoto.png",
  jobName: "Cybersec Analyst",
  jobDescription:
    "As a Cybersecurity Analyst at SecureNet Global, you will be responsible for monitoring, analyzing, and responding to security events and incidents across our clients' networks. You will collaborate with a team of experts to identify vulnerabilities, implement security measures, and ensure compliance with industry standards.",
  requiredQualifications: [
    "Bachelor's degree in Computer Science, Information Security, or a related field.",
    "3+ years of experience in cybersecurity or a similar role.",
    "Proficiency in network security tools and technologies (e.g., firewalls, IDS/IPS, SIEM).",
  ],
  location: "Hybrid - Bab Ezzouar, Algiers",
  employmentType: "Full-time",
  workHours: "Monday to Friday, 9 AM to 5 PM",
  salaryAndBenefits: [
    "Competitive salary ranging from 90,000 DZD to 120,000 DZD monthly.",
    "Comprehensive health, dental, and vision insurance.",
  ],
  companyName: "SecureNet Global",
  companyOverview:
    "SecureNet Global is a leading cybersecurity firm dedicated to protecting businesses worldwide from digital threats.",
  contactInformation:
    "For inquiries, contact our HR department at careers@securenetglobal.dz",
  jobCategory: "CS",
  applicationStatus: "",
};

JobPost.propTypes = {
  jobInformationDetails: PropTypes.shape({
    mainPhoto: PropTypes.string,
    sidePhoto1: PropTypes.string,
    sidePhoto2: PropTypes.string,
    sidePhoto3: PropTypes.string,
    jobName: PropTypes.string.isRequired,
    jobDescription: PropTypes.string.isRequired,
    requiredQualifications: PropTypes.arrayOf(PropTypes.string).isRequired,
    location: PropTypes.string.isRequired,
    employmentType: PropTypes.string.isRequired,
    workHours: PropTypes.string,
    salaryAndBenefits: PropTypes.arrayOf(PropTypes.string).isRequired,
    companyName: PropTypes.string.isRequired,
    companyOverview: PropTypes.string,
    contactInformation: PropTypes.string,
    applicationStatus: PropTypes.string,
  }).isRequired,
  closeJobPost: PropTypes.func.isRequired, // Add closeJobPost prop
  isHR: PropTypes.bool,
};

function JobPost({ jobInformationDetails = example, closeJobPost, isHR }) {
  const {
    mainPhoto,
    jobName,
    jobDescription,
    requiredQualifications,
    location,
    employmentType,
    workHours,
    salaryAndBenefits,
    companyName,
    companyOverview,
    contactInformation,
    applicationStatus,
  } = jobInformationDetails;

  const navigate = useNavigate(); // Initialize useNavigate
  const job = {
    jobName,
    jobDescription,
    requiredQualifications,
    location,
    employmentType,
    workHours,
    companyName,
    companyOverview,
  };

  function handleInterviewClick() {
    navigate("/posts/interview", { state: { job } }); // Pass interviewProp to Interview component
  }

  return (
    <div className={styles.parentContainer}>
      <div className={styles.jobPostContainer}>
        <button className={styles.closeButton} onClick={closeJobPost}>
          X
        </button>

        <div className={styles.jobInformation}>
          <div className={styles.nameCompanyContainer}>
            <h2>{jobName}</h2>
            <p className={styles.p}>{companyName}</p>
          </div>
          <div className={styles.groupContainer}>
            <p className={styles.p}>Job Name</p>
            <p className={styles.p}>{jobName}</p>
          </div>
          <div className={styles.groupContainer}>
            <p className={styles.p}>Job Description</p>
            <p className={styles.p}>{jobDescription}</p>
          </div>
          <div className={styles.groupContainer}>
            <p className={styles.p}>Required Qualifications</p>
            <ul>
              {requiredQualifications.map((qualification, index) => (
                <li key={index}>{qualification}</li>
              ))}
            </ul>
          </div>
          <div className={styles.groupContainer}>
            <p className={styles.p}>Location</p>
            <p className={styles.p}>{location}</p>
          </div>
          <div className={styles.groupContainer}>
            <p className={styles.p}>Employment Type</p>
            <p className={styles.p}>{employmentType}</p>
          </div>
          {workHours && (
            <div className={styles.groupContainer}>
              <p className={styles.p}>Work Hours</p>
              <p className={styles.p}>{workHours}</p>
            </div>
          )}
          <div className={styles.groupContainer}>
            <p className={styles.p}>Salary and Benefits</p>
            <ul>
              {salaryAndBenefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.companyInformation}>
          <div className={`${styles.imagesContainer}`}>
            <img
              src={mainPhoto}
              alt={`${jobName} Main Photo`}
              width={220}
              height={215}
            />
          </div>
          <div className={`${styles.groupContainer} ${styles.marginBottom}`}>
            <p className={styles.p}>Company Name</p>
            <p className={styles.p}>{companyName}</p>
          </div>
          <div className={`${styles.groupContainer} ${styles.marginBottom}`}>
            <p className={styles.p}>Company Overview</p>
            <p className={styles.p}>{companyOverview}</p>
          </div>
          <div className={`${styles.groupContainer} ${styles.marginBottom}`}>
            <p className={styles.p}>Contact Information</p>
            <p className={styles.p}>{contactInformation}</p>
          </div>

          {!isHR &&
            (applicationStatus === "Accepted" ? (
              <p className={`${styles.accepted} ${styles.p}`}>Accepted</p>
            ) : applicationStatus === "Rejected" ? (
              <p className={`${styles.rejected} ${styles.p}`}>Rejected</p>
            ) : applicationStatus === "Pending" ? (
              <p className={`${styles.pending} ${styles.p}`}>Pending</p>
            ) : (
              <button
                className={styles.btn}
                onClick={() => handleInterviewClick()}
              >
                Interview
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default JobPost;
