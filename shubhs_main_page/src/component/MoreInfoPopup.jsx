import React from "react";
import style from "./MoreInfoPopup.module.css";

const MoreInfoPopup = ({ movie, closePopup }) => {
  return (
    <div className={style.popupOverlay}>
      <div className={style.popupContent}>
        <button className={style.closeBtn} onClick={closePopup}>
          ×
        </button>
        <h2>{movie.title}</h2>
        <div className={style.details}>
          <div className={style.infoContainer}>
            <div className={style.languageAndIcon}>
              <span>{movie.language}</span>
              {movie.isAdult && <span className={style.adultIcon}>18+</span>}
            </div>
            <div className={style.genreReleaseDuration}>
              <span>
                <strong>ok:</strong> {movie.genre}
              </span>
              <span>
                <strong>Release Date:</strong> {movie.releaseDate}
              </span>
              <span>
                <strong>Duration:</strong> {movie.duration}
              </span>
            </div>
          </div>

          <div className={style.cast}>
            <h3>Cast:</h3>
            {movie.castDetails && movie.castDetails.length > 0 ? (
              <div className={style.castImages}>
                {movie.castDetails.map((castMember, index) => (
                  <div key={index} className={style.castItem}>
                    <img
                      src={castMember.image}
                      alt={castMember.name}
                      className={style.castImage}
                    />
                    <p>{castMember.name}</p>
                    <p className={style.castRole}>{castMember.role}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No cast details available.</p>
            )}
          </div>

          <div className={style.movieStory}>
            <h3>About the Movie</h3>
            <p>{movie.story}</p>
          </div>

          <div className={style.movieTrailer}>
            <h3>Watch the reality_Trailer</h3>
            <video controls>
              <source src={movie.vid} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreInfoPopup;
