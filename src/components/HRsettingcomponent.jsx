import React from 'react'
import { useEffect, useState } from 'react';
import "./HRsettingcomponent.css"
import { useNavigate } from 'react-router-dom'; 


function HRsettingcomponent() {


    const [edit, setEdit] = useState(false)
    const [Overview, setOverview] = useState(null)
    const [user, setUser] = useState({})

    const handleEditOverview = () => {
        if (edit) {
            setUser({...user, companyOverview: Overview}) // remove this line when linking with the backend

            // const token = localStorage.getItem('authToken');

            // if (!token) {
            //     console.error('No token found, please log in.');
            //     return; // Exit if no token is found
            // }

            // try {
            //     const response = await fetch('https://your-backend-url.com/api/update-overview', { // Replace with your backend URL
            //         method: 'PUT', // or 'POST' depending on your API
            //         headers: {
            //             'Authorization': `Bearer ${token}`,
            //             'Content-Type': 'application/json', // Sending JSON data
            //         },
            //         body: JSON.stringify({ companyOverview: Overview }) // Send updated company overview
            //     });

            //     if (!response.ok) {
            //         throw new Error(`HTTP error! status: ${response.status}`);
            //     }

            //     const data = await response.json(); // Get the response from the backend if needed
            //     setUser({...user, companyOverview: Overview})

            // } catch (error) {
            //     console.error('Error updating company overview:', error);
            // }

        }
        else {
            setOverview(user.companyOverview)
        }
        setEdit(edit==false?true:false)
    }

    const handleOverviewChange = (e) => {
        setOverview(e.target.value)
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
      
        if (file) {
            const maxSizeInBytes = 100 * 1024 * 1024;
        
            if (file.size > maxSizeInBytes) {
                alert('File is too large');
                return;
            }

            //receive the token
            const token = localStorage.getItem('authToken');

            if (!token) {
                console.error('No token found, please log in.');
                return; // Exit if no token is found
            }
      
            // Create FormData and append the file
            const formData = new FormData();
            formData.append('profileImage', file);
      
            // Send the file to the backend (example using fetch)
            fetch('https://your-backend-url.com/upload', { // chenge to the backend URL
                method: 'POST',
                body: formData, // Send the form data with the file
                headers: {
                'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                },
            })
            .then((response) => {
                if (response.ok) {
                console.log('File uploaded successfully');
                } else {
                alert('File upload failed');
                }
            })
            .catch((error) => {
                alert('Error uploading file:', error);
            });
        }
    };

    const DeleteAccount = async () => {
        const navigate = useNavigate();  // Initialize navigate
    
        // Get the token from localStorage
        const token = localStorage.getItem('authToken');
    
        if (!token) {
            console.error('No token found, please log in.');
            return; // Exit if no token is found
        }
    
        try {
            const response = await fetch('https://your-backend-url.com/api/delete-account', { // replace with your back end URL
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',  // Fix the typo: 'application/json'
                },
            });
    
            // Check if the response is OK (status in the range 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json(); // Process the response if it exists
            console.log('Account deleted successfully:', result);
    
            // Redirect to the homepage with a message
            navigate('/', { state: { message: 'Your account has been deleted successfully.' } });
    
        } catch (error) {
            console.error('Error deleting account:', error); // Log error if something goes wrong
        }
    };
    
    useEffect(() => {
        const fetchUser = async () => {
            try { 
                const res = await fetch("src\\assets\\data\\DummyData3.json");
                
                if (!res.ok) { 
                  throw new Error(`HTTP error! status: ${res.status}`); 
                } 
                const data = await res.json(); 
                setUser(data);
              } catch (error) { 
                console.error("Error fetching data:", error); 
              } 
            
        }
       
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
    <div className='HRsettingcomponent'>
        <div className='imageEdit'>
            <img src={user.imagePath} alt="profile" className='profileImage'/>
            <label className='changeImageLabel' htmlFor='changeImagebutton'>Edit</label>
            <input id='changeImagebutton' type='file' className="changeImage"onChange={handleImageChange} accept=".jpg,.png" />
        </div>

        <div className="Infos">
            <div className='Left'>
                <div className='Info'>
                    <div className='infoTitle'>Name</div>
                    <div className='userData'>{user.name}</div>
                </div>
                <div className='Info'>
                    <div className='infoTitle'>Company Name</div>
                    <div className='userData'>{user.companyName}</div>
                </div>
                <div className='Info'>
                    <div className='infoTitle'>Email</div>
                    <div className='userData'>{user.email}</div>
                </div>
                <div className='Info'>
                    <div className='infoTitle'>Gender</div>
                    <div className='userData'>{user.gender}</div>
                </div>
                <div className='Info'>
                    <div className='infoTitle'>Date of birth</div>
                    <div className='userData'>{user.dateOfBirth}</div>
                </div>
                <div className='Info'>
                    <div className='infoTitle'>Company field</div>
                    <div className='userData'>{user.field}</div>
                </div>
            </div>
            <div className='CompanyOverview'>
                <div className='CompanyOverviewHead'>
                    <div className='infoTitle'>Resume</div>
                    <button className='CompanyOverviewButton' onClick={handleEditOverview}>{edit==false?"edit":"save"}</button>
                </div>
                {
                    edit==false?
                    <div className='userData'>{user.companyOverview}</div>: // here we can only use overview and each time we update the overview we send it to back end and receive data and update the value of overview 
                    <textarea className='CompanyOverviewEdit' value={Overview} onChange={handleOverviewChange}></textarea>
                }
            </div>
        </div>

        <div className='DeleteSection'>
            <div className='DeleteInfo'>
                <div className='infoTitle'>Delete account</div>
                <button className='DeleteButton' onClick={DeleteAccount}>I want to delete my account</button>
            </div>
        </div>
    </div>
  )
}

export default HRsettingcomponent