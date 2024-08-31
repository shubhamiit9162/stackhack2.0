import React, { useState } from "react";
import style from "./Profile.module.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import UserService from "./UserService";
import { useNavigate } from "react-router-dom";

const Profile = ({ closePopup }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    usrname: "",
    name: "",
    email: "",
    password: "",
    mobile: "",
    dob: "",
    role: "USER",
  });
  const [consoleOutput, setConsoleOutput] = useState(""); // State to store console output

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      mobile: value,
    }));
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      UserService.logout();
      closePopup();
      navigate("/");
    }
  };

  const handleSignup = async () => {
    try {
      setConsoleOutput("Attempting to register...");
      await UserService.register(formData);
      setOtpSent(true);
      setConsoleOutput("OTP has been sent to your email. Please verify.");
    } catch (error) {
      setConsoleOutput(`Error: ${error.message}`);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setConsoleOutput("Verifying OTP...");
      const verifyResponse = await UserService.verifyOtp(formData.email, otp);
      if (verifyResponse.success) {
        setConsoleOutput("Account verified successfully. Logging you in...");
        closePopup();
        navigate("/dashboard");
      } else {
        setConsoleOutput("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setConsoleOutput(`Error: ${error.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isAdmin) {
      handleAdminLogin();
    } else if (isLogin) {
      handleUserLogin();
    } else if (otpSent) {
      handleVerifyOtp();
    } else {
      handleSignup();
    }
  };

  const handleAdminLogin = async () => {
    try {
      setConsoleOutput("Attempting admin login...");
      const loginResponse = await UserService.login(
        formData.email,
        formData.password
      );
      if (loginResponse.role === "ADMIN") {
        setConsoleOutput(loginResponse.message);
        closePopup();
        navigate("/admin");
      } else {
        setConsoleOutput("Unauthorized: Admin access only.");
      }
    } catch (error) {
      setConsoleOutput(`Error: ${error.message}`);
    }
  };

  const handleUserLogin = async () => {
    try {
      setConsoleOutput("Attempting user login...");
      const loginResponse = await UserService.login(
        formData.email,
        formData.password
      );
      setConsoleOutput(loginResponse.message);
      closePopup();
    } catch (error) {
      setConsoleOutput(`Error: ${error.message}`);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={style.popupOverlay}>
      <div className={style.popupContent}>
        <button
          className={style.closeBtn}
          onClick={closePopup}
          onTouchStart={closePopup}
        >
          &times;
        </button>
        {!UserService.isAuthenticated() ? (
          <>
            <h2>
              {isAdmin ? "Admin Login" : isLogin ? "User Login" : "Signup"}
            </h2>
            <form onSubmit={handleSubmit}>
              {!isLogin && !isAdmin && !otpSent && (
                <>
                  <div className={style.formDiv}>
                    <label className={style.labelStyle} htmlFor="usrname">
                      Username:
                    </label>
                    <input
                      className={style.inputStyle}
                      type="text"
                      id="usrname"
                      name="usrname"
                      value={formData.usrname}
                      onChange={handleInputChange}
                      required
                      pattern="[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;,.?]{3,20}"
                      title="Username must be 3-20 characters long and can only contain alphanumeric characters or !@#$%^&*()_+{}[]:;,.?"
                    />
                  </div>
                  <div className={style.formDiv}>
                    <label className={style.labelStyle} htmlFor="name">
                      Name:
                    </label>
                    <input
                      className={style.inputStyle}
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={style.formDiv}>
                    <label className={style.labelStyle} htmlFor="mobile">
                      Mobile Number:
                    </label>
                    <PhoneInput
                      className={style.inputStyle}
                      country="US"
                      value={formData.mobile}
                      onChange={handlePhoneChange}
                      international
                      defaultCountry="US"
                      required
                    />
                  </div>
                  <div className={style.formDiv}>
                    <label className={style.labelStyle} htmlFor="dob">
                      Date of Birth:
                    </label>
                    <input
                      className={style.inputStyle}
                      type="date"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </>
              )}
              <div className={style.formDiv}>
                <label className={style.labelStyle} htmlFor="email">
                  Email:
                </label>
                <input
                  className={style.inputStyle}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={style.formDiv}>
                <label className={style.labelStyle} htmlFor="password">
                  Password:
                </label>
                <input
                  className={style.inputStyle}
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {otpSent && (
                <div className={style.formDiv}>
                  <label className={style.labelStyle} htmlFor="otp">
                    Enter OTP:
                  </label>
                  <input
                    className={style.inputStyle}
                    type="text"
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
              )}
              <button className={style.submitButton} type="submit">
                {isAdmin ? "Login" : isLogin ? "Login" : otpSent ? "Verify OTP" : "Signup"}
              </button>
            </form>
            {!otpSent && (
              <p
                className={style.toggleText}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isAdmin
                  ? ""
                  : isLogin
                  ? "Don't have an account? Signup"
                  : "Already have an account? Login"}
              </p>
            )}
            {!otpSent && (
              <button
                className={style.adminButton}
                onClick={() => setIsAdmin(!isAdmin)}
              >
                {isAdmin ? "Switch to User" : "Admin Login"}
              </button>
            )}
            {/* Displaying the console output */}
            <div className={style.consoleOutput}>
              <pre>{consoleOutput}</pre>
            </div>
          </>
        ) : (
          <>
            <h2>Hey {UserService.isName()}!</h2>
            <div className={style.optionsMenu}>
              <ul>
                <li onClick={() => handleOptionClick("editProfile")}>
                  Edit Profile
                </li>
                <li onClick={() => handleOptionClick("yourBooking")}>
                  Your Booking
                </li>
                <li onClick={() => handleOptionClick("helpSupport")}>
                  Help and Support
                </li>
                <li onClick={() => handleOptionClick("contactUs")}>
                  Contact Us
                </li>
                <li onClick={() => handleOptionClick("accountSettings")}>
                  Account and Settings
                </li>
                <li onClick={() => handleLogout()}>Logout</li>
              </ul>
            </div>
            {selectedOption === "editProfile" && (
              <div className={style.optionContent}>
                <h3>Edit Profile</h3>
                <form>
                  <div className={style.formDiv}>
                    <label className={style.labelStyle} htmlFor="username">
                      Username:
                    </label>
                    <input
                      className={style.inputStyle}
                      type="text"
                      id="username"
                      name="username"
                      value={formData.usrname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={style.formDiv}>
                    <label className={style.labelStyle} htmlFor="email">
                      Email:
                    </label>
                    <input
                      className={style.inputStyle}
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={style.formDiv}>
                    <label className={style.labelStyle} htmlFor="password">
                      Password:
                    </label>
                    <input
                      className={style.inputStyle}
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={style.formDiv}>
                    <label className={style.labelStyle} htmlFor="mobile">
                      Mobile Number:
                    </label>
                    <PhoneInput
                      className={style.inputStyle}
                      country="US"
                      value={formData.mobile}
                      onChange={handlePhoneChange}
                      international
                      defaultCountry="US"
                      required
                    />
                  </div>
                  <div className={style.formDiv}>
                    <label className={style.labelStyle} htmlFor="dob">
                      Date of Birth:
                    </label>
                    <input
                      className={style.inputStyle}
                      type="date"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button className={style.submitButton} type="submit">
                    Update Profile
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
