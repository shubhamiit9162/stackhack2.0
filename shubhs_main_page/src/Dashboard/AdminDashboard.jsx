import React, { useState } from "react";
import ManageMovies from "./ManageMovies/ManageMovies";
import ManageTheatres from "./ManageTheaters/ManageTheatres";
import ManageShowtimes from "./ManageShowTimes/ManageShowtimes";
import ManageReservations from "./ManageReservations/ManageReservations";
import ManageUsers from "./ManageUsers/ManageUsers";
import styles from "./AdminDashboard.module.css";

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState(null);

  const closeSection = () => {
    setActiveSection(null);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "movies":
        return <ManageMovies onClose={closeSection} />;
      case "theatres":
        return <ManageTheatres onClose={closeSection} />;
      case "showtimes":
        return <ManageShowtimes onClose={closeSection} />;
      case "reservations":
        return <ManageReservations onClose={closeSection} />;
      case "users":
        return <ManageUsers onClose={closeSection} />;
      default:
        return <div className={styles.welcome}>Select a section to manage</div>;
    }
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Admin Dashboard</h1>
      </header>
      <nav className={styles.nav}>
        <ul>
          <li>
            <button
              className={`${styles.navButton} ${
                activeSection === "movies" ? styles.active : ""
              }`}
              onClick={() => setActiveSection("movies")}
            >
              Management of Movies
            </button>
          </li>
          <li>
            <button
              className={`${styles.navButton} ${
                activeSection === "theatres" ? styles.active : ""
              }`}
              onClick={() => setActiveSection("theatres")}
            >
              Manage Theatres
            </button>
          </li>
          <li>
            <button
              className={`${styles.navButton} ${
                activeSection === "showtimes" ? styles.active : ""
              }`}
              onClick={() => setActiveSection("showtimes")}
            >
              Manage Showtimes
            </button>
          </li>
          <li>
            <button
              className={`${styles.navButton} ${
                activeSection === "reservations" ? styles.active : ""
              }`}
              onClick={() => setActiveSection("reservations")}
            >
              Manage Reservations
            </button>
          </li>
          <li>
            <button
              className={`${styles.navButton} ${
                activeSection === "users" ? styles.active : ""
              }`}
              onClick={() => setActiveSection("users")}
            >
              Manage Users
            </button>
          </li>
        </ul>
      </nav>
      <div className={styles.overlay}>{renderSection()}</div>
    </div>
  );
}

export default AdminDashboard;
