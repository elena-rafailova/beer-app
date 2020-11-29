import React from 'react';
import styles from './RangeSlider.module.scss';

const Track = ({ source, target, getTrackProps })=> {
    return (
        <div className={styles.track}
             style={{
                 left: `${source.percent}%`,
                 width: `${target.percent - source.percent}%`,
             }}
             {...getTrackProps()}
        />
    );
};

export default Track;
