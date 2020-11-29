import React, { useState } from 'react';
import styles from './Carousel.module.scss';
import backIcon from '../../images/back.svg';
import nextIcon from '../../images/next.svg';

const Carousel = ({ items, itemsVisible = 3, component, step = 1, itemWidth }) => {

    const maxSteps = Math.ceil((items.length - itemsVisible) / step);
    const [currentStep, setCurrentStep] = useState(0);

    const slideNext = () => {
        const newStep = currentStep + 1;
        if (newStep <= maxSteps) {
            setCurrentStep(newStep);
        }
    };

    const slidePrevious = () => {
        const newStep = currentStep - 1;
        if (newStep >= 0) {
            setCurrentStep(newStep);
        }
    };

    return (
        <div className={styles.carouselContainer}>
            {items.length <= itemsVisible
                ? null
                : <React.Fragment>
                    <span className={`${styles.carouselControl} ${currentStep === 0 ? styles.disabled : null}`}>
                        <img
                            onClick={slidePrevious}
                            className={styles.icon}
                            src={backIcon}
                            alt="Prev"
                        />
                    </span>
                    <span className={`${styles.carouselControl} ${currentStep === maxSteps ? styles.disabled : null}`}>
                        <img
                            onClick={slideNext}
                            className={styles.icon}
                            src={nextIcon}
                            alt="Next"
                        />
                    </span>
                  </React.Fragment>
            }
            <div className={`${styles.carouselView}  ${items.length < itemsVisible ? styles.flexCarousel : null}`}
                 style={{'width': itemsVisible * itemWidth}}
            >
                <div className={styles.componentList}
                     style={{'transform': `translateX(-${currentStep * step * itemWidth}px)`,
                     'width': items.length * itemWidth}}
                >
                    {component}
                </div>
            </div>
        </div>
    );
};
export default Carousel;