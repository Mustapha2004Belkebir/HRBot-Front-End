import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./ApplicationList.module.css";
import Modal from "../components/Modal";
import ApplicantDetails from "../components/ApplicantDetails";
import HRheader from "../components/HRheader";

function ApplicationList() {
  const [selectedApplicant, setSelectedApplicant] = useState(null); // To store the selected applicant's details
  const location = useLocation();
  const { job } = location.state || {}; // Get the job object from the state, if exists

  function handleClickDetails(applicant) {
    setSelectedApplicant(applicant); // Update state to show details of the selected applicant
  }

  async function handleClickHire(applicantInformationDetails) {
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
  }

  // Avoid including any properties that may cause circular references

  async function handleClickReject(applicantInformationDetails) {
    try {
      // Update the applicationStatus locally
      const updatedApplicantDetails = {
        ...applicantInformationDetails,
        applicationStatus: "Rejected", // Update the status to 'Accepted'
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
        alert("Failed to rejected the applicant.");
      }
    } catch (error) {
      console.error("Error rejected the applicant:", error);
    }
  }

  function handleClose() {
    setSelectedApplicant(null); // Close the modal
  }

  return (
    <div className={styles.ApplicationStatusContainer}>
      <HRheader /> {/* change this later to the header of hr */}
      <div className={styles.notification}>
        <div className={styles.jobTitle}>
          <h2 className={styles.jobTitleH2}>{job.jobName}</h2>
          <p>{job.applicants.length} applicants</p>
        </div>
        <h2>Application List</h2>
        <div className={styles.applications}>
          {job.applicants.map((applicant, index) => (
            <div className={styles.applicant} key={index}>
              <ul className={styles.applicantText}>
                <p className={styles.applicantName}>
                  {applicant.applicantName}
                </p>
                <p
                  className={styles.rejectApplicant}
                  onClick={() => handleClickReject(applicant)}
                >
                  I want to reject this applicant
                </p>
              </ul>
              <div className={styles.btns}>
                <button
                  className={styles.btn}
                  onClick={() => handleClickDetails(applicant)}
                >
                  Details
                </button>
                <button
                  className={styles.greenBtn}
                  onClick={() => handleClickHire(applicant)}
                >
                  Hire
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedApplicant && (
        <Modal onClose={handleClose}>
          <ApplicantDetails
            applicantInformationDetails={selectedApplicant}
            closeApplicantDetails={handleClose}
            jobPhoto={job.mainPhoto}
          />
        </Modal>
      )}
    </div>
  );
}

export default ApplicationList;
