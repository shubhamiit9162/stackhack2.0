import React from "react";
import styles from "./ManageReservations.module.css";

function ManageReservations({ onClose }) {
  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={onClose}>
        Close
      </button>
      <h2>Manage Reservations</h2>
      {/* Add reservations management UI here */}
    </div>
  );
}

export default ManageReservations;
