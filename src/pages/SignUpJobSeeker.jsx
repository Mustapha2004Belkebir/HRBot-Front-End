import { useReducer, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./SignUpJobSeeker.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const siteKey = "6Lf4F0sqAAAAAH6xpd0TaIuuKjsjZkDoEAxKrENC";

const initialState = {
  captchaToken: null,
  fullName: "",
  resume: null,
  month: "",
  date: "",
  year: "",
  email: "",
  emailErrorMsg: "",
  password: "",
  passwordErrorMsg: "",
  genre: "",
  shareDataWithHR: false,
  field: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_FULL_NAME":
      return { ...state, fullName: action.value };
    case "SET_THE_FIELD":
      return { ...state, field: action.value };
    case "SET_EMAIL_ERROR":
      return { ...state, emailErrorMsg: action.value };
    case "SET_PASSWORD_ERROR":
      return { ...state, passwordErrorMsg: action.value };
    case "SET_RESUME":
      return { ...state, resume: action.value };
    case "SET_CAPTCHA":
      return { ...state, captchaToken: action.value };
    case "TOGGLE_SHARE_DATA":
      return { ...state, shareDataWithHR: !state.shareDataWithHR };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

function SignUpJobSeeker() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  function handleResumeChange(e) {
    dispatch({ type: "SET_RESUME", value: e.target.files[0] });
  }

  function handleCaptchaChange(token) {
    dispatch({ type: "SET_CAPTCHA", value: token });
  }

  function handleInputChange(event, actionType) {
    let inputValue = event.target.value;
    const allowedCharacters = /^[a-zA-Z0-9\s]+$/;

    // Remove any disallowed characters from the input value
    if (!allowedCharacters.test(inputValue)) {
      inputValue = inputValue.replace(/[^a-zA-Z0-9\s]/g, "");
    }

    // Dispatch based on the action type
    dispatch({ type: actionType, value: inputValue });
  }

  function handleEmailChange(e) {
    let emailInput = e.target.value;

    // Allow only alphanumeric characters, '@', '.', and spaces
    const allowedCharacters = /^[a-zA-Z0-9@.\s]+$/;

    // Remove any disallowed characters
    if (!allowedCharacters.test(emailInput)) {
      emailInput = emailInput.replace(/[^a-zA-Z0-9@.\s]/g, "");
    }

    // Update state with sanitized email input
    dispatch({ type: "SET_FIELD", field: "email", value: emailInput });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    dispatch({
      type: "SET_EMAIL_ERROR",
      value: emailRegex.test(emailInput)
        ? ""
        : "Please enter a valid email address.",
    });
  }

  function handlePasswordChange(e) {
    let passwordInput = e.target.value;
    const allowedCharacters = /^[a-zA-Z0-9!@#$%^&*]+$/;

    if (!allowedCharacters.test(passwordInput)) {
      passwordInput = passwordInput.replace(/[^a-zA-Z0-9!@#$%^&*]/g, "");
    }
    dispatch({ type: "SET_FIELD", field: "password", value: passwordInput });

    // Password validation
    const minLength = 8;
    const containsNumber = /\d/;
    const containsSpecialChar = /[!@#$%^&*]/;

    if (passwordInput.length < minLength) {
      dispatch({
        type: "SET_PASSWORD_ERROR",
        value: `Password must be at least ${minLength} characters long.`,
      });
    } else if (!containsNumber.test(passwordInput)) {
      dispatch({
        type: "SET_PASSWORD_ERROR",
        value: "Password must contain at least one number.",
      });
    } else if (!containsSpecialChar.test(passwordInput)) {
      dispatch({
        type: "SET_PASSWORD_ERROR",
        value:
          "Password must contain at least one special character (!@#$%^&*).",
      });
    } else {
      dispatch({ type: "SET_PASSWORD_ERROR", value: "" });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Check if all required fields are filled and valid
    const emailValid = state.emailErrorMsg === "";
    const passwordValid = state.passwordErrorMsg === "";
    const allFieldsFilled =
      state.email &&
      state.password &&
      state.fullName && // Ensure fullName is filled
      state.resume && // Ensure resume is uploaded
      state.captchaToken &&
      state.month &&
      state.date &&
      state.year &&
      state.genre &&
      state.field; // Ensure other required fields are filled

    if (emailValid && passwordValid && allFieldsFilled) {
      // Create a FormData object with the form values
      const formData = new FormData();
      formData.append("email", state.email);
      formData.append("password", state.password);
      formData.append("fullName", state.fullName);
      formData.append("resume", state.resume); // Assuming resume is a file
      formData.append("captchaToken", state.captchaToken);
      formData.append("month", state.month);
      formData.append("date", state.date);
      formData.append("year", state.year);
      formData.append("genre", state.genre);
      formData.append("shareDataWithHR", state.shareDataWithHR); // If this is a boolean field
      formData.append("field", state.field);

      try {
        // Send the form data via fetch
        const response = await fetch("YOUR_BACKEND_URL/api/submit", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          alert(
            "Registration successful! Please check your email for verification."
          );
        } else {
          alert(data.message || "An error occurred during registration.");
        }
        // Log the state temporarily
        console.log(
          "Form submitted successfully with the following data:",
          state
        );

        // Reset the form fields
        dispatch({ type: "RESET_FORM" });

        navigate("/posts");
      } catch (error) {
        console.error("Error during form submission:", error);
        alert("An error occurred during form submission. Please try again.");
      }
    } else {
      alert("Please correct the errors in the form.");
      // Optionally highlight the invalid fields or provide feedback
    }
  }

  function handleShareDataChange() {
    dispatch({ type: "TOGGLE_SHARE_DATA" });
  }

  return (
    <div className={styles.JobSeekerContainer}>
      <div className={styles.Elipse1}></div>
      <div className={styles.Elipse2}></div>
      <div className={styles.Elipse3}></div>
      <div className={styles.Elipse4}></div>
      <div className={styles.Elipse5}></div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.logo}>
          <img
            src="src/assets/images/Logo.png"
            alt="logo"
            height={100}
            width={100}
          />
          <p className={styles.p}>Sign up</p>
        </div>
        <p className={styles.p}>Sign up with your email address</p>
        <div className={styles.content}>
          <div className={styles.labelInput}>
            <label>Full name</label>
            <input
              type="text"
              placeholder="Enter your profile name"
              required
              onChange={(e) => handleInputChange(e, "SET_FULL_NAME")}
              value={state.fullName}
            />
          </div>

          <div className={styles.labelInput}>
            <label>Field</label>
            <input
              type="text"
              placeholder="Enter your field"
              required
              onChange={(e) => handleInputChange(e, "SET_THE_FIELD")}
              value={state.field}
            />
          </div>

          <div className={styles.resume}>
            <div className={styles.fileIcon}>
              <img
                src="src/assets/images/Dowload_Resume.png"
                alt="Upload Icon"
                style={{ width: "30px", height: "30px" }}
              />
            </div>
            <label className={styles.fileLabel} htmlFor="resume-upload">
              Select File
            </label>
            <input
              id="resume-upload"
              className={styles.fileInput}
              type="file"
              onChange={handleResumeChange}
              accept=".png,.pdf"
            />
          </div>

          <div className={styles.labelInput}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email address"
              required
              onChange={handleEmailChange}
              value={state.email}
            />
            {state.emailErrorMsg && (
              <small style={{ color: "red" }}>{state.emailErrorMsg}</small>
            )}
          </div>

          <div className={styles.labelInput}>
            <label>Password</label>
            <div className={styles.passwordInputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                onChange={handlePasswordChange}
                value={state.password}
              />
              <button
                type="button"
                className={styles.togglePasswordButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            {state.passwordErrorMsg && (
              <small style={{ color: "red" }}>{state.passwordErrorMsg}</small>
            )}
          </div>

          <div className={styles.labelInput}>
            <label>What is your Gender (Optional)</label>
            <div className={styles.optionsContainer}>
              <div className={styles.firstOption}>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "genre",
                      value: e.target.value,
                    })
                  }
                />
                <label htmlFor="female">Female</label>
              </div>
              <div className={styles.firstOption}>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "genre",
                      value: e.target.value,
                    })
                  }
                />
                <label htmlFor="male">Male</label>
              </div>
            </div>
          </div>

          <div className={styles.labelInput}>
            <label>{"What's your Date of Birth"}</label>
            <div className={styles.selectContainer}>
              {/* Month select */}
              <select
                value={state.month}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "month",
                    value: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Month
                </option>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((monthName, index) => (
                  <option key={index} value={index + 1}>
                    {monthName}
                  </option>
                ))}
              </select>

              {/* Date select */}
              <select
                value={state.date}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "date",
                    value: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Date
                </option>
                {[...Array(31).keys()].map((day) => (
                  <option key={day} value={day + 1}>
                    {day + 1}
                  </option>
                ))}
              </select>

              {/* Year select */}
              <select
                value={state.year}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "year",
                    value: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Year
                </option>
                {Array.from(
                  { length: 101 },
                  (_, i) => new Date().getFullYear() - i
                ).map((yearValue) => (
                  <option key={yearValue} value={yearValue}>
                    {yearValue}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.checkboxLabel}>
            <input
              type="checkbox"
              id="hrDataShare"
              checked={state.shareDataWithHR}
              onChange={handleShareDataChange}
            />
            <label htmlFor="hrDataShare">
              Share my registration data with our HR agents.
            </label>
          </div>

          <div className={styles.labelInput}>
            <label>
              By creating an account, you agree to the{" "}
              <a className={styles.a} href="/terms">
                Terms of use
              </a>{" "}
              and{" "}
              <a className={styles.a} href="/privacy">
                Privacy Policy
              </a>
              .
            </label>
          </div>

          <div className={`${styles.labelInput} ${styles.recaptcha}`}>
            <ReCAPTCHA sitekey={siteKey} onChange={handleCaptchaChange} />
          </div>
        </div>

        <div className={styles.btn}>
          <button type="submit">Sign up</button>
        </div>

        <p className={styles.p}>
          Already have an account?{" "}
          <a className={styles.a} href="/login">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}

export default SignUpJobSeeker;
