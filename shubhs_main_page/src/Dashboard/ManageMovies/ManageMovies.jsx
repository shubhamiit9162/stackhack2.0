import React, { useState } from "react";
import styles from "./ManageMovies.module.css";

function ManageMovies({ onClose }) {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [isAdult, setIsAdult] = useState(false);
  const [genere, setGenere] = useState("");
  const [duration, setDuration] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [story, setStory] = useState("");
  const [poster, setPoster] = useState(null); // Changed from src to poster
  const [trailer, setTrailer] = useState(null); // Single video file
  const [castDetails, setCastDetails] = useState([]);
  const [newCast, setNewCast] = useState({ name: "", role: "", image: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleAddCast = () => {
    if (newCast.name && newCast.role && newCast.image) {
      setCastDetails([...castDetails, newCast]);
      setNewCast({ name: "", role: "", image: "" });
    }
  };

  const handleSubmit = () => {
    const movieData = {
      title,
      language,
      isAdult,
      genere,
      duration,
      releaseDate,
      story,
      poster,
      trailer,
      castDetails,
    };

    console.log("Submitted Movie Data:", movieData);

    // Clear the form after submission
    setTitle("");
    setLanguage("");
    setIsAdult(false);
    setGenere("");
    setDuration("");
    setReleaseDate("");
    setStory("");
    setPoster(null);
    setTrailer(null);
    setCastDetails([]);
    setSubmitted(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <h2 className={styles.heading}>Manage Movies</h2>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
      </div>
      <div className={styles.form}>
        <label className={styles.label}>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className={styles.label}>Language</label>
        <input
          type="text"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />

        <label className={styles.label}>Genere</label>
        <input
          type="text"
          value={genere}
          onChange={(e) => setGenere(e.target.value)}
        />

        <label className={styles.label}>Duration</label>
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <label className={styles.label}>Release Date</label>
        <input
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />

        <label className={styles.label}>Story</label>
        <textarea value={story} onChange={(e) => setStory(e.target.value)} />

        <label className={styles.label}>Poster Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPoster(e.target.files[0])}
        />

        <label className={styles.label}>Trailer File</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => {
            // Ensure only one trailer is set
            setTrailer(e.target.files[0]);
          }}
        />

        <label className={`${styles.label} ${styles.checkboxContainer}`}>
          Adult Content
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={isAdult}
            onChange={(e) => setIsAdult(e.target.checked)}
          />
        </label>

        <div className={styles.castSection}>
          <h3>Add Cast Member</h3>
          <div className={styles.newCastForm}>
            <label className={styles.label}>Name</label>
            <input
              type="text"
              value={newCast.name}
              onChange={(e) => setNewCast({ ...newCast, name: e.target.value })}
            />

            <label className={styles.label}>Role</label>
            <input
              type="text"
              value={newCast.role}
              onChange={(e) => setNewCast({ ...newCast, role: e.target.value })}
            />

            <label className={styles.label}>Image URL</label>
            <input
              type="text"
              value={newCast.image}
              onChange={(e) =>
                setNewCast({ ...newCast, image: e.target.value })
              }
            />

            <button className={styles.addButton} onClick={handleAddCast}>
              Add Cast Member
            </button>
          </div>
        </div>

        <div className={styles.castContainer}>
          {castDetails.map((cast, index) => (
            <div key={index} className={styles.castItem}>
              <img
                className={styles.castImage}
                src={cast.image}
                alt={cast.name}
              />
              <div className={styles.castInfo}>
                <p>{cast.name}</p>
              </div>
              <div className={styles.castInfo}>
                <p>{cast.role}</p>
              </div>
              <div>
                <button
                  className={styles.removeButton}
                  onClick={() =>
                    setCastDetails(castDetails.filter((_, i) => i !== index))
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {submitted ? (
          <div className={styles.submissionMessage}>
            <h3>Movie details submitted successfully!</h3>
            <button
              className={styles.addMoreButton}
              onClick={() => setSubmitted(false)}
            >
              Add More
            </button>
          </div>
        ) : (
          <button className={styles.submitButton} onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>

      {(poster || trailer) && (
        <div className={styles.previewContainer}>
          <h3>Preview</h3>
          <div className={styles.previewItem}>
            <p>
              <strong>Title:</strong> {title}
            </p>
            <p>
              <strong>Language:</strong> {language}
            </p>
            <p>
              <strong>Adult Content:</strong> {isAdult ? "Yes" : "No"}
            </p>
            <p>
              <strong>Genere:</strong> {genere}
            </p>
            <p>
              <strong>Duration:</strong> {duration}
            </p>
            <p>
              <strong>Release Date:</strong> {releaseDate}
            </p>
            <p>
              <strong>Story:</strong> {story}
            </p>
          </div>

          {trailer && (
            <p>
              <strong>Trailer:</strong>{" "}
              <a
                href={URL.createObjectURL(trailer)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Trailer
              </a>
            </p>
          )}

          {poster && (
            <p>
              <strong>Poster:</strong>{" "}
              <a
                className={styles.previewImage}
                href={URL.createObjectURL(poster)}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Poster
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default ManageMovies;
