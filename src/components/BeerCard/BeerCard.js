import React from 'react';
import styles from './BeerCard.module.scss';
import { Link } from 'react-router-dom';
import HeartIcon from '../HeartIcon/HeartIcon';
import DefaultBeer from '../../images/defaultBeer.png';

const BeerCard = ({ beer, toggleFavorite, isFavorite }) => {
    return (
            <div key={beer.id} className={styles.card}>
                <div className={styles.alignRight}>
                    <HeartIcon isActive={isFavorite} onClick={toggleFavorite}/>
                </div>
                <Link className={styles.link} to={`/beer/${beer.id}`}>
                    <img className={styles.img} src={beer.image_url ? beer.image_url : DefaultBeer} alt="beer"/>
                    <h4>{beer.name}</h4>
                    <h5>{beer.tagline}</h5>
                </Link>
            </div>
        );
};

export default BeerCard;