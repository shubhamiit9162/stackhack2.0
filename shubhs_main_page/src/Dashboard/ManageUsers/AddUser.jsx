import React, { useState } from "react";
import UserService from "../../Authentication/UserService";
import style from "./Updateuser.module.css";

function AddUser({ onClose }) {
  const [userData, setUserData] = useState({
    usrname: "",
    name: "",
    email: "",
    mobile: "",
    role: "",
    dob: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm(
        "Are you sure you want to Add this user?"
      );
      console.log(userData);
      if (confirmUpdate) {
        await UserService.register(userData);
        onClose();
      }
    } catch (error) {
      alert("An error occurred while adding the user.");
    }
  };

  const closePopup = () => {
    onClose();
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
        <h2>Add User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              className={`form-control ${style.data}`}
              value={userData.usrname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="full name"
              className={`form-control ${style.data}`}
              value={userData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email in correct format"
              className={`form-control ${style.data}`}
              value={userData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Mobile:</label>
            <input
              type="text"
              name="mobile number"
              className={`form-control ${style.data}`}
              value={userData.mobile}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <input
              type="text"
              name="role"
              className={`form-control ${style.data}`}
              value={userData.role}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              className={`form-control ${style.data}`}
              value={userData.dob}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              className={`form-control ${style.data}`}
              value={userData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button className="btn btn-primary btn-lg btn-block" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
