import React from 'react';
import styles from './ButtonSecondary.module.scss';

const ButtonSecondary = ({ text, onClick }) => {
    return (
        <div className={styles.container}>
            <div onClick={onClick} className={styles.button}>{text}</div>
        </div>
    );
};

export default ButtonSecondary;