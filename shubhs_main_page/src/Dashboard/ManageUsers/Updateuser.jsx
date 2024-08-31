import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../../Authentication/UserService";
import style from "./Updateuser.module.css"; // Assuming you have a CSS module for styling

function UpdateUser({ userId, onClose }) {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    usrname: "",
    name: "",
    email: "",
    mobile: "",
    role: "",
    dob: "",
  });

  useEffect(() => {
    fetchUserDataById(userId);
  }, [userId]);

  const fetchUserDataById = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getUserById(userId, token);
      console.log(response);
      const { usrname, name, email, mobile, role, dob } = response.ourUsers;
      console.log(userData);
      setUserData({ usrname, name, email, mobile, role, dob });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm(
        "Are you sure you want to update this user?"
      );
      if (confirmUpdate) {
        const token = localStorage.getItem("token");
        console.log(userData);
        const res = await UserService.updateUser(userId, userData, token);
        onClose();
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      alert("An error occurred while updating the user.");
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
        <h2>Update User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
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
              name="email"
              className={`form-control ${style.data}`}
              value={userData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="usrname"
              className={`form-control ${style.data}`}
              value={userData.usrname}
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
            <label>Mobile:</label>
            <input
              type="tel"
              name="mobile"
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
              readOnly
            />
          </div>
          <button className="btn btn-primary btn-lg btn-block" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
