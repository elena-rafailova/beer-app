import React from 'react';
import styles from './RangeSlider.module.scss';

const Handle = ({
                    handle: { id, value, percent },
                    getHandleProps
                }) => {
    return (
        <div
            style={{
                left: `${percent}%`,
            }}
            className={styles.handles}
            {...getHandleProps(id)}
        >
            <div className={styles.handlesText}>
                {value}
            </div>
        </div>
    );
};

export default Handle;
