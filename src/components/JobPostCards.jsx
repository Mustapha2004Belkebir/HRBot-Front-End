import { useState } from "react";
import JobCard from "./JobCard";
import JobPost from "./JobPost";
import Modal from "./Modal"; // Import the Modal component
import styles from "./JobPostCards.module.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function JobPostCards({ jobs }) {
  const [selectedJob, setSelectedJob] = useState(null); // To store the selected job's details

  function handleDetails(jobInformation) {
    setSelectedJob(jobInformation); // Update state to show details of the selected job
  }

  function handleClose() {
    setSelectedJob(null); // Close the modal
  }

  const navigate = useNavigate();
  function handleInterviewClick(job) {
    navigate("/posts/interview", { state: { job } }); // Pass interviewProp to Interview component
  }

  return (
    <div className={styles.mainContent}>
      <div className={styles.jobGrid}>
        {jobs.map((job, index) => (
          <JobCard
            key={index}
            title={job.jobName}
            company={job.companyName}
            imageSrc={job.mainPhoto}
            onInterview={() => handleInterviewClick(job)} // Replace with handleInterview logic
            onDetails={() => handleDetails(job)} // Pass job details when clicking "Details"
          />
        ))}
      </div>

      {selectedJob && ( // Show modal if a job is selected
        <Modal onClose={handleClose}>
          <JobPost
            jobInformationDetails={selectedJob}
            closeJobPost={handleClose}
          />
        </Modal>
      )}
    </div>
  );
}

JobPostCards.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      mainPhoto: PropTypes.string.isRequired,
      jobName: PropTypes.string.isRequired,
      jobDescription: PropTypes.string.isRequired,
      requiredQualifications: PropTypes.arrayOf(PropTypes.string).isRequired,
      location: PropTypes.string.isRequired,
      employmentType: PropTypes.string.isRequired,
      workHours: PropTypes.string.isRequired,
      salaryAndBenefits: PropTypes.arrayOf(PropTypes.string).isRequired,
      companyName: PropTypes.string.isRequired,
      companyOverview: PropTypes.string.isRequired,
      contactInformation: PropTypes.string.isRequired,
      // companyCategory: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default JobPostCards;
