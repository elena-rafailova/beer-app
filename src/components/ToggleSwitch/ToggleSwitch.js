import React from 'react';
import styles from './ToggleSwitch.module.scss';

const ToggleSwitch = ({ id, onChange, value }) => {
    return (
        <div className={styles.toggleSwitch}>
            <input
                type="checkbox"
                className={styles.checkbox}
                id={id}
                checked={value}
                onChange={() => onChange(!value)}
            />
            {id
                ? <label className={styles.label} htmlFor={id}>
                        <span className={styles.content}/>
                        <span className={styles.switch}/>
                  </label>
                : null
            }
        </div>
    );
};

export default ToggleSwitch;