import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HRheader from "../components/HRheader";
import styles from "./ApplicationStatusHr.module.css";
import Modal from "../components/Modal";
import JobPost from "../components/JobPost";

function ApplicationStatusHr() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // To store the selected job's details
  const navigate = useNavigate();

  function handleClose() {
    setSelectedJob(null); // Close the modal
  }

  function handleClickDetails(jobInformation) {
    setSelectedJob(jobInformation); // Update state to show details of the selected job
  }

  function handleClickModify(jobInformation) {
    navigate("/applicationStatusHr/postModification", {
      state: { jobInformation },
    });
  }

  function handleClickApplicants(job) {
    // Navigate to the route and pass the job as state
    navigate("/applicationStatusHr/applicationList", { state: { job } });
  }

  function handleDeletePost(jobselected) {
    const updatedJobs = jobs.filter((job) => job !== jobselected);

    // Update the state with the new list
    setJobs(updatedJobs);

    // Send the updated jobs list to the backend
    fetch("/api/updateJobs", {
      method: "POST", // Or PUT depending on how your API is set up
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jobs: updatedJobs }), // Send the new jobs array
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Jobs updated successfully on the backend", data);
      })
      .catch((error) => {
        console.error("Error updating jobs on the backend:", error);
      });
  }

  // function handleDeletePost(jobSelected) {
  //   // Retrieve the token from local storage
  //   const token = localStorage.getItem("yourTokenKey"); // Replace with the actual key used for storing the token

  //   // Send the selected job ID to the backend
  //   fetch("/api/deleteJob", {  // change with url of the backend
  //     method: "DELETE", // Use DELETE method
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${token}`, // Send the token in the Authorization header
  //     },
  //     body: JSON.stringify({ job: jobSelected }), // Send the job ID in the body
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => { // it is possible that the data is the new application list
  //       console.log("Job deleted successfully from the backend", data);
  //       // Optionally, you may want to update the UI or jobs list after deletion
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting job from the backend:", error);
  //     });
  // }

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("src\\assets\\Data\\applicationStatus.json"); // Corrected path
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchJobs();
  }, []);
  return (
    <div className={styles.ApplicationStatusContainer}>
      <HRheader /> {/* change this later to the header of hr */}
      <div className={styles.notification}>
        <h2>Application Status</h2>

        <div className={styles.jobs}>
          {jobs.map((job, index) => (
            <div className={styles.job} key={index}>
              <ul className={styles.jobText}>
                <p className={styles.jobName}>{job.jobName}</p>
                <p
                  className={styles.deletePost}
                  onClick={() => handleDeletePost(job)}
                >
                  I want to delete this post
                </p>
              </ul>
              <div className={styles.btns}>
                <button
                  className={styles.btn}
                  onClick={() => handleClickApplicants(job)}
                >
                  Applicans
                </button>
                <button
                  className={styles.btn}
                  onClick={() => handleClickDetails(job)}
                >
                  Details
                </button>
                <button
                  className={styles.btn}
                  onClick={() => handleClickModify(job)}
                >
                  Modify
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedJob && (
        <Modal onClose={handleClose}>
          <JobPost
            jobInformationDetails={selectedJob}
            closeJobPost={handleClose}
            isHR={true}
          />
        </Modal>
      )}
    </div>
  );
}

export default ApplicationStatusHr;
