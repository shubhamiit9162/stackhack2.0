import React from "react";
import styles from "./ManageShowtimes.module.css";

function ManageShowtimes({ onClose }) {
  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={onClose}>
        Close
      </button>
      <h2>Manage Showtimes</h2>
      {/* Add showtimes management UI here */}
    </div>
  );
}

export default ManageShowtimes;
