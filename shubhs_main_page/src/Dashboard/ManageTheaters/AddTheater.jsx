import React, { useState } from "react";
import TheaterService from "./TheaterService";
import style from "../ManageUsers/Updateuser.module.css";
function AddTheater({ onClose }) {
  const [theaterData, setTheaterData] = useState({
    name: "",
    city: "",
    contact: "",
    ticketprice: "",
    image: "",
    seats: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTheaterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm(
        "Are you sure you want to Add this theater?"
      );
      if (confirmUpdate) {
        const token = localStorage.getItem("token");
        await TheaterService.addTheater(theaterData, token);
        onClose();
      }
    } catch (error) {
      alert("An error occurred while adding the theater.");
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
        <h2>Add Theater</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              className={`form-control ${style.data}`}
              value={theaterData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>City:</label>
            <input
              type="text"
              name="city"
              className={`form-control ${style.data}`}
              value={theaterData.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Contact:</label>
            <input
              type="text"
              name="contact"
              className={`form-control ${style.data}`}
              value={theaterData.contact}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Image URL:</label>
            <input
              type="text"
              name="image"
              className={`form-control ${style.data}`}
              value={theaterData.image}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Seats:</label>
            <input
              type="number"
              name="seats"
              className={`form-control ${style.data}`}
              value={theaterData.seats}
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

export default AddTheater;
