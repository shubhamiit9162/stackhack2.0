import React, { useState } from "react";
import style from "./BookingPopup.module.css";
import { FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ShowtimePopup from "./ShowtimePopup";

const BookingPopup = ({ closePopup, movieName, movieDuration }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [showShowtimePopup, setShowShowtimePopup] = useState(false);

  const theaters = [
    { name: "Theater 1", times: ["9:00 AM", "12:00 PM", "4:00 PM", "7:00 PM"] },
    { name: "Theater 2", times: ["11:00 AM", "2:00 PM", "5:00 PM", "8:00 PM"] },
    { name: "Theater 3", times: ["12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"] },
    { name: "Theater 1", times: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"] },
    { name: "Theater 2", times: ["11:00 AM", "2:00 PM", "5:00 PM", "8:00 PM"] },
    { name: "Theater 3", times: ["12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"] },
  ];

  const getNextSixDays = () => {
    const days = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i + currentIndex);
      days.push(date);
    }
    return days;
  };

  const handlePrev = () => {
    setCurrentIndex(Math.max(currentIndex - 6, 0));
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex + 6);
  };

  const handleShowtimeClick = (theater, time) => {
    setSelectedShowtime({ theater, time });
    setShowShowtimePopup(true);
  };

  const handleCloseShowtimePopup = () => {
    setShowShowtimePopup(false);
    setSelectedShowtime(null);
  };

  return (
    <>
      <div className={`${style.popupOverlay} ${showShowtimePopup ? style.hide : ""}`}>
        <div className={style.popupContent}>
          <button className={style.closeBtn} onClick={closePopup}>
            <FaTimes />
          </button>
          <h2>{movieName}</h2>
          <div className={style.dateSection}>
            <button onClick={handlePrev} className={style.arrowButton}>
              <FaArrowLeft />
            </button>
            <div className={style.dateSelector}>
              {getNextSixDays().map((date, index) => {
                const day = date.toLocaleDateString("en-US", { weekday: "short" });
                const dateNum = date.toLocaleDateString("en-US", { day: "2-digit" });
                const month = date.toLocaleDateString("en-US", { month: "short" });
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(date)}
                    className={`${style.dateButton} ${
                      selectedDate.toDateString() === date.toDateString()
                        ? style.activeDate
                        : ""
                    }`}
                  >
                    <div className={style.dateTag}>
                      <div className={style.dateNum}>{dateNum}</div>
                      <div className={style.dateMonth}>{month}</div>
                    </div>
                    <div className={style.dateDay}>{day}</div>
                  </button>
                );
              })}
            </div>
            <button onClick={handleNext} className={style.arrowButton}>
              <FaArrowRight />
            </button>
          </div>
          <div className={style.theaterSection}>
            <div className={style.filterOptions}>
              <div className={style.filterOption}>
                <input type="checkbox" id="availableSeats" />
                <label htmlFor="availableSeats">
                  <span></span>
                  Available Seats
                </label>
              </div>
              <div className={style.filterOption}>
                <input type="checkbox" id="nonCancellable" />
                <label htmlFor="nonCancellable">
                  <span></span>
                  Non-Cancellable
                </label>
              </div>
            </div>
            <div className={style.theaterList}>
              {theaters.map((theater, index) => (
                <div key={index} className={style.theater}>
                  <h2>{theater.name}</h2>
                  <div className={style.showtimes}>
                    {theater.times.map((time, timeIndex) => (
                      <button
                        key={timeIndex}
                        className={style.showtimeButton}
                        onClick={() => handleShowtimeClick(theater.name, time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showShowtimePopup && (
        <ShowtimePopup
          closePopup={handleCloseShowtimePopup}
          theater={selectedShowtime.theater}
          time={selectedShowtime.time}
          movieName={movieName}
          movieDuration={movieDuration} // Pass the movie duration here
        />
      )}
    </>
  );
};

export default BookingPopup;
