import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './LogIn.css';
import Logo from '../assets/images/Logo.png';
import Eye from '../assets/images/Eye.png';Eye.png

function LogIn() {

    const email = useRef(null);
    const password = useRef(null);
    const showRef = useRef(null);
    const hideRef = useRef(null);
    const passwordConfirm = useRef(null);
    const emailConfirm = useRef(null);
    var valid = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        passwordConfirm.current.innerText = ""; // Clear previous messages
        emailConfirm.current.innerText = "";
    
        let valid = true; // Initialize validation flag
    
        const emailValue = email.current.value;
        const passwordValue = password.current.value;
    
        // Regular expressions for validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex
        const dangerousCharacters = /['"]/; // Characters to avoid in password
    
        // Validate email format
        if (!emailRegex.test(emailValue)) {
            emailConfirm.current.innerText += "Invalid email format";
            valid = false;
        }
    
        // Validate password length
        if (passwordValue.length < 8) {
            passwordConfirm.current.innerText += "Password must be at least 8 characters long";
            valid = false;
        }
    
        // Validate password for dangerous characters
        if (dangerousCharacters.test(passwordValue)) {
            passwordConfirm.current.innerText += "Password cannot contain invalid characters";
            valid = false;
        }
    
        // If the form is valid, proceed to submit the data
        if (valid) {
            try {
                const formData = new FormData();
                formData.append('email', emailValue);
                formData.append('password', passwordValue);
    
                const response = await fetch('YOUR_BACKEND_URL/api/auth/login', {
                    method: 'POST',
                    body: formData,
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const data = await response.json();
    
                // Store the token in localStorage
                localStorage.setItem('authToken', data.token);
    
                // Clear the input fields
                email.current.value = "";
                password.current.value = "";
            } catch (error) {
                console.error("Error submitting data:", error);
            }
        }
    };

    const show = (e) => {
        showRef.current.style.display = "none";
        hideRef.current.style.display = "inline";
        password.current.type = "text";
    }

    const hide = (e) => {
        showRef.current.style.display = "inline";
        hideRef.current.style.display = "none";
        password.current.type = "password";
    }

  return (
    <div className='LogIn'>
        <div className='LogIn-body'>

                <div className='LogIn-head'>

                    <img className='Logo' src={Logo} alt='Logo' />
                    <div className='LogIn-title'>Log In</div>
                    <div className='LogIn-subtitle'>Don't have an account? <Link to='/'>Sign Up</Link></div>

                </div>

                <form className='LogIn-form' onSubmit={handleSubmit}>
                    
                    <label htmlFor='email' className='email-label'>Your email</label>
                    <input className='email' type='email' id='email' name='email' ref={email}></input>
                    <div className='email-error' ref={emailConfirm}></div>

                    <label htmlFor='password' className='password-label'>
                        <div className='left-label'>
                            Your Password
                        </div>
                        <div className='right-label'>
                            <img src={Eye} alt='Eye' className='EyePicture'/>
                            <span className='show-password' onClick={show} ref={showRef}>Show</span>
                            <span className='hide-password' onClick={hide} ref={hideRef}>Hide</span>
                        </div>
                    </label>
                    <input className='password' type='password' id='password' name='password' ref={password}></input>
                    <div className='password-bottom'>
                        <div className='password-error' ref={passwordConfirm}></div>
                        <Link to='/' className='forget-password'>Forget your password</Link>
                    </div>

                    <button type='submit' className='LogIn-button'>Log In</button>

                </form>

        </div>
        
        <div className='ellipse-1'></div>
        <div className='ellipse-2'></div>
        <div className='overlay'></div>
    </div>
  )
}

export default LogIn