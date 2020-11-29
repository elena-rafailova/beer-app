import React from 'react';
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider';
import Handle from './Handle';
import Track from './Track';
import styles from './RangeSlider.module.scss';

const RangeSlider = ({ range, handleFilter, name }) => {
    return (
        <Slider
            className={styles.sliderStyle}
            domain={range}
            step={1}
            mode={2}
            values={[0, range[1]]}
            onChange={(values) => {
                handleFilter(`${name}_gt`, values[0]);
                handleFilter(`${name}_lt`, values[1]);
                }
            }
        >
            <Rail>
                {({ getRailProps }) => (
                    <div className={styles.railStyle} {...getRailProps()} />
                )}
            </Rail>
            <Handles>
                {({ handles, getHandleProps }) => (
                    <div className="slider-handles">
                        {handles.map(handle => (
                            <Handle
                                key={handle.id}
                                handle={handle}
                                getHandleProps={getHandleProps}
                            />
                        ))}
                    </div>
                )}
            </Handles>
            <Tracks left={false} right={false}>
                {({ tracks, getTrackProps }) => (
                    <div className="slider-tracks">
                        {tracks.map(({ id, source, target }) => (
                            <Track
                                key={id}
                                source={source}
                                target={target}
                                getTrackProps={getTrackProps}
                            />
                        ))}
                    </div>
                )}
            </Tracks>
        </Slider>
    );
};

export default RangeSlider;