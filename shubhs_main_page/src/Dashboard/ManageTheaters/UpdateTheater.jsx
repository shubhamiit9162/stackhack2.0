import React, { useState, useEffect } from "react";
import TheaterService from "./TheaterService";
import style from "../ManageUsers/Updateuser.module.css";
function UpdateTheater({ theaterId, onClose }) {
  const [theaterData, setTheaterData] = useState({
    name: "",
    city: "",
    contact: "",
    ticketprice: "",
    image: "",
    seats: "",
  });
  useEffect(() => {
    fetchTheaterDataById(theaterId);
  }, [theaterId]);

  const fetchTheaterDataById = async (theaterId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await TheaterService.getTheaterById(theaterId, token);
      const { name, city, contact, ticketprice, image, seats } = response;
      setTheaterData({ name, city, ticketprice, contact, image, seats });
    } catch (error) {
      console.error("Error fetching theater data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTheaterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Theater ID:", theaterId);
    try {
      const confirmUpdate = window.confirm(
        "Are you sure you want to update this theater?"
      );
      if (confirmUpdate) {
        const token = localStorage.getItem("token");
        await TheaterService.updateTheater(theaterId, theaterData, token);
        onClose();
      }
    } catch (error) {
      alert("An error occurred while updating the theater.");
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
        <h2>Update Theater</h2>
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateTheater;
