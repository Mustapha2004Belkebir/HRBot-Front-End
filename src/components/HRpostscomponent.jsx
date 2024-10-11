import { useState } from "react";
import "./HRpostscomponent.css";

function HRpostscomponent() {
  const [formData, setFormData] = useState({
    jobName: "",
    jobDescription: "",
    qualifications: "",
    location: "",
    workHours: "",
    salaryBenefits: "",
    employmentType: "",
    jobImage: null,
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      jobImage: file,
    });
  };

  // Validation logic
  const validateForm = () => {
    let validationErrors = {};

    if (!formData.jobName.trim()) {
      validationErrors.jobName = "Job name is required.";
    }
    if (!formData.jobDescription.trim()) {
      validationErrors.jobDescription = "Job description is required.";
    }
    if (!formData.qualifications.trim()) {
      validationErrors.qualifications = "Qualifications are required.";
    }
    if (!formData.location.trim()) {
      validationErrors.location = "Location is required.";
    }
    if (!formData.workHours.trim()) {
      validationErrors.workHours = "Work hours are required.";
    }
    if (!formData.salaryBenefits.trim()) {
      validationErrors.salaryBenefits = "Salary and benefits are required.";
    }
    if (!formData.employmentType.trim()) {
      validationErrors.employmentType = "Employment type is required.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation step
    if (validateForm()) {
      console.log("Form submitted successfully with the following data:");
      console.log(formData);

      // Clear all form fields after submission
      setFormData({
        jobName: "",
        jobDescription: "",
        qualifications: "",
        location: "",
        workHours: "",
        salaryBenefits: "",
        employmentType: "",
        jobImage: null, // Reset image field
      });

      // Clear errors if needed
      setErrors({});
    } else {
      console.log("Validation failed:", errors);
    }
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     // Validation step
  //     if (validateForm()) {
  //         // Get the token from localStorage
  //         const token = localStorage.getItem('authToken');

  //         if (!token) {
  //             console.error('No token found, please log in.');
  //             return;
  //         }

  //         // Prepare the form data for submission (including image)
  //         const formDataToSend = new FormData();
  //         formDataToSend.append('jobName', formData.jobName);
  //         formDataToSend.append('jobDescription', formData.jobDescription);
  //         formDataToSend.append('qualifications', formData.qualifications);
  //         formDataToSend.append('location', formData.location);
  //         formDataToSend.append('workHours', formData.workHours);
  //         formDataToSend.append('salaryBenefits', formData.salaryBenefits);
  //         formDataToSend.append('employmentType', formData.employmentType);
  //         if (formData.jobImage) {
  //             formDataToSend.append('jobImage', formData.jobImage);
  //         }

  //         // Send the form data to the backend
  //         try {
  //             const response = await fetch('https://your-backend-url.com/api/create-post', { // Replace with your backend URL
  //                 method: 'POST',
  //                 body: formDataToSend,
  //                 headers: {
  //                     'Authorization': `Bearer ${token}`, // Send the token in the header
  //                 },
  //             });

  //             if (!response.ok) {
  //                 throw new Error(`HTTP error! status: ${response.status}`);
  //             }

  //             //use the result as needed I do not know what do I receive no documentation provided
  //             const result = await response.json(); // Assuming the backend returns a JSON response
  //             alert('Post created successfully:', result);

  //             // Clear the form fields after successful submission
  //             setFormData({
  //                 jobName: '',
  //                 jobDescription: '',
  //                 qualifications: '',
  //                 location: '',
  //                 workHours: '',
  //                 salaryBenefits: '',
  //                 employmentType: '',
  //                 jobImage: null, // Reset image field
  //             });

  //             // Clear errors if needed
  //             setErrors({});
  //         } catch (error) {
  //             console.error('Error submitting form:', error);
  //         }
  //     } else {
  //         console.log('Validation failed:', errors);
  //     }
  // };

  return (
    <form className="HRpostForm" onSubmit={handleSubmit}>
      <div className="HRpostsFormLeft">
        <div className="HRpostFormHead">
          <div className="HRpostFormTitle">Create a post</div>
          <div className="HRpostFormText">
            Provide details about the job posting below.
          </div>
        </div>

        <div className="HRpostFormQuestion">
          <label className="HRpostFormLabel">Job name</label>
          <input
            type="text"
            name="jobName"
            placeholder="Enter the job name"
            required
            className="HRpostFormInput"
            value={formData.jobName}
            onChange={handleChange}
          />
          {errors.jobName && <span className="error">{errors.jobName}</span>}
        </div>

        <div className="HRpostFormQuestion">
          <label className="HRpostFormLabel">Job description</label>
          <textarea
            name="jobDescription"
            placeholder="Enter the job description"
            required
            className="HRpostFormLongInput"
            value={formData.jobDescription}
            onChange={handleChange}
          />
          {errors.jobDescription && (
            <span className="error">{errors.jobDescription}</span>
          )}
        </div>

        <div className="HRpostFormQuestion">
          <label className="HRpostFormLabel">Required qualifications</label>
          <textarea
            name="qualifications"
            placeholder="Enter required qualifications"
            required
            className="HRpostFormLongInput"
            value={formData.qualifications}
            onChange={handleChange}
          />
          {errors.qualifications && (
            <span className="error">{errors.qualifications}</span>
          )}
        </div>

        <div className="HRpostFormQuestion">
          <label className="HRpostFormLabel">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter the location"
            required
            className="HRpostFormInput"
            value={formData.location}
            onChange={handleChange}
          />
          {errors.location && <span className="error">{errors.location}</span>}
        </div>
      </div>

      <div className="HRpostsFormRight">
        <div className="HRpostFormImageEdit">
          <label
            className="HRpostFormImageEditLabel"
            htmlFor="HRpostFormImageEditButton"
          >
            +
          </label>
          <input
            id="HRpostFormImageEditButton"
            type="file"
            accept=".png,.jpg,.jpeg"
            className="HRpostFormImageEditButton"
            onChange={handleImageChange}
          />
        </div>

        <div className="HRpostFormQuestion">
          <label className="HRpostFormLabel">Work hours</label>
          <input
            type="text"
            name="workHours"
            placeholder="Enter the work hours"
            required
            className="HRpostFormInput"
            value={formData.workHours}
            onChange={handleChange}
          />
          {errors.workHours && (
            <span className="error">{errors.workHours}</span>
          )}
        </div>

        <div className="HRpostFormQuestion">
          <label className="HRpostFormLabel">Salary and benefits</label>
          <textarea
            name="salaryBenefits"
            placeholder="Enter salary and benefits"
            required
            className="HRpostFormLongInput"
            value={formData.salaryBenefits}
            onChange={handleChange}
          />
          {errors.salaryBenefits && (
            <span className="error">{errors.salaryBenefits}</span>
          )}
        </div>

        <div className="HRpostFormQuestion">
          <label className="HRpostFormLabel">Employment type</label>
          <input
            type="text"
            name="employmentType"
            placeholder="Enter employment type"
            required
            className="HRpostFormInput"
            value={formData.employmentType}
            onChange={handleChange}
          />
          {errors.employmentType && (
            <span className="error">{errors.employmentType}</span>
          )}
        </div>

        <div className="HRpostFormSubmitDiv">
          <button className="HRpostFormSubmit" type="submit">
            Publish
          </button>
        </div>
      </div>
    </form>
  );
}

export default HRpostscomponent;
