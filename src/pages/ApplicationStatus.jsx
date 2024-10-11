import { useEffect, useState } from "react";
import JSheader from "../components/JSheader";
import styles from "./ApplicationStatus.module.css";
import Modal from "../components/Modal";
import JobPost from "../components/JobPost";

function ApplicationStatus() {
  const [applications, setApplications] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Accepted");
  const [selectedApplication, setSelectedApplication] = useState(null); // To store the selected job's details

  function handleClickDetails(jobInformation) {
    setSelectedApplication(jobInformation); // Update state to show details of the selected job
  }
  function handleClose() {
    setSelectedApplication(null); // Close the modal
  }

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch("src\\assets\\Data\\dummyDataJobSeeker.json"); // Corrected path
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        setApplications(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className={styles.ApplicationStatusContainer}>
      <JSheader />
      <div className={styles.notification}>
        <h2>Application Status</h2>
        <div className={styles.tabs}>
          <button
            className={`${styles.tabsBtn}`}
            onClick={() => setSelectedStatus("Accepted")}
            style={{
              borderBottom:
                selectedStatus === "Accepted" ? "3px solid green" : "none",
            }}
          >
            Accepted
          </button>

          <button
            className={`${styles.tabsBtn}`}
            onClick={() => setSelectedStatus("Pending")}
            style={{
              borderBottom:
                selectedStatus === "Pending" ? "3px solid #DEA12B" : "none",
            }}
          >
            Pending
          </button>

          <button
            className={`${styles.tabsBtn}`}
            onClick={() => setSelectedStatus("Rejected")}
            style={{
              borderBottom:
                selectedStatus === "Rejected" ? "3px solid red" : "none",
            }}
          >
            Rejected
          </button>
        </div>

        <div className={styles.applications}>
          {applications
            .filter(
              (application) => selectedStatus === application.applicationStatus
            )
            .map((application, index) => (
              <div className={styles.application} key={index}>
                <div className={styles.applicationText}>
                  <p className={styles.jobName}>
                    {/* Dynamic image source based on selectedStatus */}
                    <img
                      src={
                        selectedStatus === "Accepted"
                          ? "src\\assets\\images\\Accepted.png"
                          : selectedStatus === "Pending"
                          ? "src\\assets\\images\\Pending.png"
                          : selectedStatus === "Rejected"
                          ? "src\\assets\\images\\Rejected.png"
                          : "src\\assets\\images\\Point.png" // Default image
                      }
                      alt={selectedStatus}
                    />{" "}
                    {application.jobName}
                  </p>
                  <p className={styles.companyName}>
                    {application.companyName}
                  </p>
                </div>
                <button
                  className={styles.detailsbtn}
                  onClick={() => handleClickDetails(application)}
                >
                  Details
                </button>
              </div>
            ))}
        </div>
      </div>

      {selectedApplication && (
        <Modal onClose={handleClose}>
          <JobPost
            jobInformationDetails={selectedApplication}
            closeJobPost={handleClose}
          />
        </Modal>
      )}
    </div>
  );
}

export default ApplicationStatus;
