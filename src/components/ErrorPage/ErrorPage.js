import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.scss';
import Loader from '../Loader/Loader';

const ErrorPage = () => {
  return (
      <div className={styles.errorContainer}>
          <h1>PAGE NOT FOUND</h1>
          <Loader/>
          <Link to="/home" className={styles.link}>
              <div>Back to Home</div>
          </Link>
      </div>
  );
};

export default ErrorPage;
