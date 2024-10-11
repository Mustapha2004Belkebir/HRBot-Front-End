import { useEffect, useState } from "react";
import cloudImage from "../assets/images/Dowload_Resume.png";
import "./JSsettingcomponent.css";
import { useNavigate } from "react-router-dom";

function JSsettingcomponent() {
  const navigate = useNavigate();
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
      const maxSizeInBytes = 100 * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        alert("File is too large");
        return;
      }

      //receive the token
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No token found, please log in.");
        return; // Exit if no token is found
      }

      // Create FormData and append the file
      const formData = new FormData();
      formData.append("profileImage", file);

      // Send the file to the backend (example using fetch)
      fetch("https://your-backend-url.com/upload", {
        // chenge to the backend URL
        method: "POST",
        body: formData, // Send the form data with the file
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("File uploaded successfully");
          } else {
            alert("File upload failed");
          }
        })
        .catch((error) => {
          alert("Error uploading file:", error);
        });
    }
  };

  const handleResumeChange = async (event) => {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
      const maxSize = 100 * 1024 * 1024;
      if (file.size > maxSize) {
        console.error("File size exceeds the limit of 5 MB.");
        return;
      }

      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No token found, please log in.");
        return; // Exit if no token is found
      }

      const formData = new FormData(); // Create a FormData object
      formData.append("Resume", file); // Append the file to the FormData

      try {
        const response = await fetch("https://your-backend-url.com/upload", {
          // replace with backend URL
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json(); // Process the response if there is
        console.log("Resume uploaded successfully:", result);
      } catch (error) {
        console.error("Error uploading resume:", error);
      }
    }
  };

  const DeleteAccount = async () => {
    // Replace 'your-token' with the actual token you have
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No token found, please log in.");
      return; // Exit if no token is found
    }

    try {
      const response = await fetch(
        "https://your-backend-url.com/api/delete-account",
        {
          // replace with your back end URL
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Optional, depending on your backend setup
          },
        }
      );

      // Check if the response is OK (status in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json(); // Process the response if existed
      console.log("Account deleted successfully:", result); // do something with result if existed

      navigate("/", {
        state: { message: "Your account has been deleted successfully." },
      }); // Redirect with a message to display
    } catch (error) {
      console.error("Error deleting account:", error); // Log error if something goes wrong
    }
  };

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("src\\assets\\data\\DummyData.json");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUser();
  }, []);

  // the code to fetch from the back end

  // useEffect(() => {
  //     const fetchUser = async () => {
  //         try {
  //             const token = localStorage.getItem('authToken');

  //             if (!token) {
  //                 console.error('No token found, please log in.');
  //                 return; // Exit if no token is found
  //             }

  //             const res = await fetch("https://your-backend-api-url.com/user-data", {
  //                 method: 'GET',
  //                 headers: {
  //                     'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
  //                     'Content-Type': 'application/json' // Optional, if you need to specify the content type
  //                 }
  //             });

  //             if (!res.ok) {
  //               throw new Error(`HTTP error! status: ${res.status}`);
  //             }

  //             const data = await res.json();
  //             setUser(data);
  //           } catch (error) {
  //             console.error("Error fetching data:", error);
  //           }
  //     }

  //     fetchUser();
  // }, []);

  return (
    <div className="JSsettingcomponent">
      <div className="imageEdit">
        <img src={user.imagePath} alt="profile" className="profileImage" />
        <label className="changeImageLabel" htmlFor="changeImagebutton">
          Edit
        </label>
        <input
          id="changeImagebutton"
          type="file"
          className="changeImage"
          onChange={handleImageChange}
          accept=".jpg,.png"
        />
      </div>

      <div className="Infos">
        <div className="Left">
          <div className="Info">
            <div className="infoTitle">Name</div>
            <div className="userData">{user.name}</div>
          </div>
          <div className="Info">
            <div className="infoTitle">Email</div>
            <div className="userData">{user.email}</div>
          </div>
          <div className="Info">
            <div className="infoTitle">Gender</div>
            <div className="userData">{user.gender}</div>
          </div>
          <div className="Info">
            <div className="infoTitle">Date of birth</div>
            <div className="userData">{user.dateOfBirth}</div>
          </div>
          <div className="Info">
            <div className="infoTitle">Field</div>
            <div className="userData">{user.field}</div>
          </div>
        </div>
        <div className="InfoResume">
          <div className="infoTitle">Resume</div>
          <div href="" className="userDataResume">
            {user.cvName}
          </div>
          <div className="editResume">
            <img src={cloudImage} alt="downlowd image" className="cloudImage" />
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
              onChange={handleResumeChange}
              accept=".pdf"
            />
          </div>
        </div>
      </div>

      <div className="DeleteSection">
        <div className="DeleteInfo">
          <div className="infoTitle">Delete account</div>
          <button className="DeleteButton" onClick={DeleteAccount}>
            I want to delete my account
          </button>
        </div>
      </div>
    </div>
  );
}

export default JSsettingcomponent;
