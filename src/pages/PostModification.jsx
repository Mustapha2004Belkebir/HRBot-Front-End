import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./PostModification.module.css";
import HRheader from "../components/HRheader";
// import axios from "axios";

function PostModification() {
  const location = useLocation();
  const { jobInformation } = location.state || {};

  const [formData, setFormData] = useState({
    jobName: jobInformation.jobName,
    workHours: jobInformation.workHours,
    location: jobInformation.location,
    employmentType: jobInformation.employmentType,
    jobDescription: jobInformation.jobDescription,
    requiredQualifications: jobInformation.requiredQualifications,
    salaryAndBenefits: jobInformation.salaryAndBenefits,
  });

  // State to track if each field is in edit mode
  const [isEditing, setIsEditing] = useState({
    jobName: false,
    workHours: false,
    location: false,
    employmentType: false,
    jobDescription: false,
    requiredQualifications: false,
    salaryAndBenefits: false,
  });

  // Handler for input changes
  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Toggle edit mode for a field
  const toggleEdit = (field) => {
    setIsEditing((prevEditState) => ({
      ...prevEditState,
      [field]: !prevEditState[field],
    }));
  };

  // Handler to send data to the backend
  const handleSave = async (field) => {
    try {
      // const response = await axios.put("/api/job/update", formData, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is in localStorage
      //   },
      // });

      // if (response.status === 200) {
      //   console.log(`${field} updated successfully`);
      //   toggleEdit(field); // Exit edit mode after saving
      // }
      toggleEdit(field);
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  return (
    <div className={styles.PostModificationContainer}>
      <HRheader />
      <div className={styles.changeInformations}>
        <div className={styles.leftPart}>
          <div className={styles.picture}>
            <label>Picture</label>
            <img src={jobInformation.mainPhoto} alt="job-Photo" />
          </div>

          {/* Job Name */}
          <div className={styles.group}>
            <div className={styles.groupText}>
              <label>Job name</label>
              {isEditing.jobName ? (
                <input
                  type="text"
                  value={formData.jobName}
                  onChange={(e) => handleChange("jobName", e.target.value)}
                />
              ) : (
                <p>{formData.jobName}</p>
              )}
            </div>
            <button
              className={styles.editBtn}
              onClick={() =>
                isEditing.jobName
                  ? handleSave("jobName")
                  : toggleEdit("jobName")
              }
            >
              {isEditing.jobName ? "Save" : "Edit"}
            </button>
          </div>

          {/* Work Hours */}
          <div className={styles.group}>
            <div className={styles.groupText}>
              <label>Work hours</label>
              {isEditing.workHours ? (
                <input
                  type="text"
                  value={formData.workHours}
                  onChange={(e) => handleChange("workHours", e.target.value)}
                />
              ) : (
                <p>{formData.workHours}</p>
              )}
            </div>
            <button
              className={styles.editBtn}
              onClick={() =>
                isEditing.workHours
                  ? handleSave("workHours")
                  : toggleEdit("workHours")
              }
            >
              {isEditing.workHours ? "Save" : "Edit"}
            </button>
          </div>

          {/* Location */}
          <div className={styles.group}>
            <div className={styles.groupText}>
              <label>Location</label>
              {isEditing.location ? (
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
              ) : (
                <p>{formData.location}</p>
              )}
            </div>
            <button
              className={styles.editBtn}
              onClick={() =>
                isEditing.location
                  ? handleSave("location")
                  : toggleEdit("location")
              }
            >
              {isEditing.location ? "Save" : "Edit"}
            </button>
          </div>

          {/* Employment Type */}
          <div className={styles.group}>
            <div className={styles.groupText}>
              <label>Employment type</label>
              {isEditing.employmentType ? (
                <input
                  type="text"
                  value={formData.employmentType}
                  onChange={(e) =>
                    handleChange("employmentType", e.target.value)
                  }
                />
              ) : (
                <p>{formData.employmentType}</p>
              )}
            </div>
            <button
              className={styles.editBtn}
              onClick={() =>
                isEditing.employmentType
                  ? handleSave("employmentType")
                  : toggleEdit("employmentType")
              }
            >
              {isEditing.employmentType ? "Save" : "Edit"}
            </button>
          </div>
        </div>

        <div className={styles.rightPart}>
          {/* Job Description */}
          <div className={styles.group}>
            <div className={styles.groupText}>
              <label>Job Description</label>
              {isEditing.jobDescription ? (
                <textarea
                  value={formData.jobDescription}
                  onChange={(e) =>
                    handleChange("jobDescription", e.target.value)
                  }
                />
              ) : (
                <p>{formData.jobDescription}</p>
              )}
            </div>
            <button
              className={styles.editBtn}
              onClick={() =>
                isEditing.jobDescription
                  ? handleSave("jobDescription")
                  : toggleEdit("jobDescription")
              }
            >
              {isEditing.jobDescription ? "Save" : "Edit"}
            </button>
          </div>

          {/* Required Qualifications */}
          <div className={styles.group}>
            <div className={styles.groupText}>
              <label>Required qualifications</label>
              {isEditing.requiredQualifications ? (
                <textarea
                  value={formData.requiredQualifications}
                  onChange={(e) =>
                    handleChange("requiredQualifications", e.target.value)
                  }
                />
              ) : (
                <p>{formData.requiredQualifications}</p>
              )}
            </div>
            <button
              className={styles.editBtn}
              onClick={() =>
                isEditing.requiredQualifications
                  ? handleSave("requiredQualifications")
                  : toggleEdit("requiredQualifications")
              }
            >
              {isEditing.requiredQualifications ? "Save" : "Edit"}
            </button>
          </div>

          {/* Salary and Benefits */}
          <div className={styles.group}>
            <div className={styles.groupText}>
              <label>Salary and benefits</label>
              {isEditing.salaryAndBenefits ? (
                <textarea
                  value={formData.salaryAndBenefits}
                  onChange={(e) =>
                    handleChange("salaryAndBenefits", e.target.value)
                  }
                />
              ) : (
                <p>{formData.salaryAndBenefits}</p>
              )}
            </div>
            <button
              className={styles.editBtn}
              onClick={() =>
                isEditing.salaryAndBenefits
                  ? handleSave("salaryAndBenefits")
                  : toggleEdit("salaryAndBenefits")
              }
            >
              {isEditing.salaryAndBenefits ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostModification;
