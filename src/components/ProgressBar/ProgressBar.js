import React from 'react';
import styles from './ProgressBar.module.scss';

const ProgressBar = ({ max, current }) => {
    const percentage = Math.ceil((current / max) * 100);

    return (
        <div className={styles.progressBar}>
            <div className={styles.filler} style={{width: `${percentage}%`}}/>
        </div>
    );
};

export default ProgressBar;