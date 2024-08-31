import React, { useState, useEffect } from "react";
import TheaterService from "./TheaterService";
import styles from "../ManageUsers/ManageUsers.module.css";
import UpdateTheater from "./UpdateTheater";
import AddTheater from "./AddTheater";

function ManageTheatres({ onClose }) {
  const [theaters, setTheaters] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [showAddTheater, setShowAddTheater] = useState(false);

  useEffect(() => {
    fetchTheaters();
  }, []);

  const fetchTheaters = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await TheaterService.getAllTheaters(token);
      setTheaters(response || []);
    } catch (error) {
      console.error("Error fetching theaters:", error);
    }
  };

  const deleteTheater = async (theaterId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Theater?"
      );
      const token = localStorage.getItem("token");
      if (confirmDelete) {
        await TheaterService.deleteTheater(theaterId, token);
        fetchTheaters(); // Refresh the list after deletion
      }
    } catch (error) {
      console.error("Error deleting theater:", error);
    }
  };

  const handleUpdateClick = (theater) => {
    setSelectedTheater(theater);
  };

  const handleAddClick = () => {
    setShowAddTheater(true);
  };

  const handleUpdateClose = () => {
    setSelectedTheater(null);
    fetchTheaters(); // Optionally refresh the theater list after updating
  };

  const handleAddClose = () => {
    setShowAddTheater(false);
    fetchTheaters(); // Refresh the list after adding a new theater
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <h2 className={styles.heading}>management  of Theaters</h2>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
      </div>
      <table className="table table-striped text-center">
        <thead>
          <tr>
            <td colspan="6">
              <button
                className="btn btn-success w-100"
                onClick={handleAddClick}
              >
                Add New Theater
              </button>
            </td>
          </tr>
        </thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">City</th>
          <th scope="col">Contact</th>
          <th scope="col">Delete</th>
          <th scope="col">Update</th>
        </tr>
        <tbody>
          {theaters.map((theater) => (
            <tr key={theater.id}>
              <td scope="row">{theater.id}</td>
              <td>{theater.name}</td>
              <td>{theater.city}</td>
              <td>{theater.contact}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTheater(theater.id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleUpdateClick(theater)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedTheater && (
        <UpdateTheater
          theaterId={selectedTheater.id}
          onClose={handleUpdateClose}
        />
      )}
      {showAddTheater && <AddTheater onClose={handleAddClose} />}
    </div>
  );
}

export default ManageTheatres;
