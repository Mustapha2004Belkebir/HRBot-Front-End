import { useReducer, useState } from "react";
import styles from "./SignUpHr.module.css";
import ReCAPTCHA from "react-google-recaptcha";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; // Import the FontAwesome icons
import { useNavigate } from "react-router-dom";

const siteKey = "6Lf4F0sqAAAAAH6xpd0TaIuuKjsjZkDoEAxKrENC";

const initialState = {
  fullName: "",
  captchaToken: null,
  month: "",
  date: "",
  year: "",
  email: "",
  emailErrorMsg: "",
  password: "",
  passwordErrorMsg: "",
  genre: "",
  companyName: "",
  companyField: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FULL_NAME":
      return { ...state, fullName: action.value };
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_EMAIL_ERROR":
      return { ...state, emailErrorMsg: action.value };
    case "SET_PASSWORD_ERROR":
      return { ...state, passwordErrorMsg: action.value };
    case "SET_CAPTCHA":
      return { ...state, captchaToken: action.value };
    case "SET_COMPANY_NAME":
      return { ...state, companyName: action.value };
    case "SET_COMPANY_FIELD":
      return { ...state, companyField: action.value };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

function SignUpHr() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isPasswordVisible, setPasswordVisible] = useState(false); // Toggle state for password visibility
  const navigate = useNavigate();
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
    const allowedCharacters = /^[a-zA-Z0-9@.\s]+$/;

    // Remove any disallowed characters
    if (!allowedCharacters.test(emailInput)) {
      emailInput = emailInput.replace(/[^a-zA-Z0-9@.\s]/g, "");
    }
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

    // Remove any disallowed characters
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
      state.fullName &&
      state.captchaToken &&
      state.companyName &&
      state.companyField &&
      state.date &&
      state.month &&
      state.year;

    if (emailValid && passwordValid && allFieldsFilled) {
      const formData = new FormData();
      formData.append("email", state.email);
      formData.append("password", state.password);
      formData.append("fullName", state.fullName);
      // formData.append("captchaToken", state.captchaToken);
      formData.append("companyName", state.companyName);
      formData.append("companyField", state.companyField);
      formData.append("date", state.date);
      formData.append("month", state.month);
      formData.append("year", state.year);
      try {
        // Send the form data via fetch
        const response = await fetch("YOUR_BACKEND_URL/api/auth/login", {
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
        navigate("/applicationStatusHr");
      } catch (error) {
        console.error("Error during form submission:", error);
        alert("An error occurred during form submission. Please try again.");
      }
    } else {
      alert("Please correct the errors in the form.");
    }
  }

  return (
    <div className={styles.HrContainer}>
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
          <p>Sign up</p>
        </div>
        <p>Sign up with your email address</p>
        <div className={styles.content}>
          <div className={styles.labelInput}>
            <label>Full name</label>
            <input
              type="text"
              placeholder="Enter your profile name"
              required
              value={state.fullName}
              onChange={(e) => handleInputChange(e, "SET_FULL_NAME")}
            />
          </div>

          <div className={styles.labelInput}>
            <label>Company Name</label>
            <input
              type="text"
              placeholder="Enter your company name"
              required
              value={state.companyName}
              onChange={(e) => handleInputChange(e, "SET_COMPANY_NAME")}
            />
          </div>

          <div className={styles.labelInput}>
            <label>Company Field</label>
            <input
              type="text"
              placeholder="Enter your company field"
              required
              value={state.companyField}
              onChange={(e) => handleInputChange(e, "SET_COMPANY_FIELD")}
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
                type={isPasswordVisible ? "text" : "password"} // Toggle password visibility
                placeholder="Enter your password"
                required
                onChange={handlePasswordChange}
                value={state.password}
              />
              <button
                type="button"
                className={styles.togglePasswordButton}
                onClick={() => setPasswordVisible(!isPasswordVisible)} // Toggle the visibility state
              >
                <FontAwesomeIcon
                  icon={isPasswordVisible ? faEyeSlash : faEye}
                />
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
                {[...Array(31)].map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>

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
                {[...Array(100)].map((_, index) => (
                  <option key={index} value={2023 - index}>
                    {2023 - index}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.recaptcha}>
            <ReCAPTCHA sitekey={siteKey} onChange={handleCaptchaChange} />
          </div>
        </div>

        <div className={styles.btn}>
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  );
}

export default SignUpHr;
