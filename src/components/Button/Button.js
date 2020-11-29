import React from 'react';
import styles from './Button.module.scss';

const Button = ({ text, onClick }) => {
    return (
        <div className={styles.container} onClick={onClick}>
            <div className={styles.button}>
                <span>{text}</span>
            </div>
        </div>
    );
};

export default Button;