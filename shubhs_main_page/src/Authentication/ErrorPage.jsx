import React from "react";
import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorCode}>404</h1>
      <p className={styles.errorMessage}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link className={styles.homeLink} to="/">
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
