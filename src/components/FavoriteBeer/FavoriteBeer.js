import React, { forwardRef } from 'react';
import styles from './FavoriteBeer.module.scss';
import { Link } from 'react-router-dom';
import { MAX_ABV, MAX_EBC, MAX_IBU } from '../../constants';
import ButtonSecondary from '../ButtonSecondary/ButtonSecondary';
import ProgressBar from '../ProgressBar/ProgressBar';
import foodsIcon from '../../images/foods.png';
import removeIcon from '../../images/xIcon.png';
import DefaultBeer from '../../images/defaultBeer.png';

const FavoriteBeer = forwardRef(({ beer, removeFavorite }, ref) => {
    const foods = beer.food_pairing.join(', ');

    return (
        <div ref={ref} className={styles.productContainer}>
            <div className={styles.product} key={beer.id}>
                <img
                    onClick={removeFavorite}
                    className={styles.removeIcon}
                    src={removeIcon}
                    alt="remove"
                    title="Remove from favorites"
                />
                <h3 className={styles.beerName}>{beer.name}</h3>
                <div className={styles.imageAndBars}>
                    <img className={styles.beerImg} src={beer.image_url ? beer.image_url : DefaultBeer} alt="beer" />
                    <div>
                        <h5>ABV: {beer.abv || 0} / {MAX_ABV}</h5>
                        <div className={styles.progressBarWidth}>
                            <ProgressBar current={beer.abv} max={MAX_ABV}/>
                        </div>
                        <h5>EBC: {beer.ebc || 0} / {MAX_EBC}</h5>
                        <div className={styles.progressBarWidth}>
                            <ProgressBar current={beer.ebc} max={MAX_EBC}/>
                        </div>
                        <h5>IBU: {beer.ibu || 0} / {MAX_IBU}</h5>
                        <div className={styles.progressBarWidth}>
                            <ProgressBar current={beer.ibu} max={MAX_IBU}/>
                        </div>
                    </div>
                </div>
                <div className={styles.text}>
                    <h4>{beer.tagline}</h4>
                    <h5>{beer.description}</h5>
                    <div className={styles.foods}>
                        <img className={styles.foodIcon} src={foodsIcon} alt="foods" title="foods"/>
                        <h5>{foods}</h5>
                    </div>
                </div>
                <div className={styles.button}>
                    <Link className={styles.link} to={`/beer/${beer.id}`}>
                        <ButtonSecondary text="See more"/>
                    </Link>
                </div>
            </div>
        </div>
    );
});

export default FavoriteBeer;