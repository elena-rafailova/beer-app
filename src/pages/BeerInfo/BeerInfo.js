import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import toastWrapper from '../../toast';

import request from '../../request';
import { FILTERS, MAX_ABV, MAX_AMOUNT_OF_FAVORITES, MAX_EBC, MAX_IBU } from '../../constants';
import { findIndexById, isEmpty } from '../../helperMethods';
import { SessionContext } from '../../SessionContext';
import { LocalContext, setUserPreferences } from '../../LocalContext';

import styles from './BeerInfo.module.scss';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Loader from '../../components/Loader/Loader';
import ErrorPage from '../../components/ErrorPage/ErrorPage';
import HeartIcon from '../../components/HeartIcon/HeartIcon';
import DefaultBeer from '../../images/defaultBeer.png';
import maltIcon from '../../images/malt.png';
import hopsIcon from '../../images/hops.png';
import yeastIcon from '../../images/yeast.png';
import foodsIcon from '../../images/foods.png';
import tipsIcon from '../../images/tips.png';
import contributorIcon from '../../images/contributor.png';

const BeerInfo = ({ match }) => {
    const session = useContext(SessionContext);
    const userPreferences = useContext(LocalContext);
    const history = useHistory();
    const [beer, setBeer] = useState({});
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const id = match.params.id;
    const malts = isDataLoaded ? beer.ingredients.malt.map(item => ` ${item.name}`).join(', ') : null;
    const hops = isDataLoaded ? beer.ingredients.hops.map(item =>` ${item.name}`).join(', ') : null;
    const yeast = isDataLoaded ? beer.ingredients.yeast : null;
    const foods = isDataLoaded ? beer.food_pairing.join(', ') : null;

    const toggleFavorite = (beerChosen) => {
        if (isEmpty(userPreferences)) {
            history.push('/login');
        } else {
            let beerIndex = findIndexById(userPreferences.favorites, beerChosen);
            if (beerIndex > -1) {
                setBeer({...beer, isFavorite: false});
                userPreferences.favorites.splice(beerIndex, 1);
                toastWrapper.warn('Beer removed from favorites!');
            } else if (userPreferences.favorites.length < MAX_AMOUNT_OF_FAVORITES) {
                setBeer({...beer, isFavorite: true});
                userPreferences.favorites.push(beerChosen);
                toastWrapper.success('Beer added to favorites!');
            } else {
                toastWrapper.error('You cannot have more than 15 favorites!')
            }
            setUserPreferences(session.googleId, userPreferences);
        }
    };

    useEffect(() => {
        const getBeer = async () => {
            let beer = await request(`${FILTERS.single_beer}${id}`);
            if (beer.error) {
                setBeer(null);
            } else {
                beer = isEmpty(userPreferences)
                    ? beer[0]
                    : {...beer[0], isFavorite: findIndexById(userPreferences.favorites, beer[0]) > -1};
                setBeer(beer);
                setIsDataLoaded(true);
            }
        };
        getBeer();
    }, [id, userPreferences]);

    return (isDataLoaded
            ? ( <div className={styles.container}>
                    <div className={styles.infoWrapper}>
                        <div className={styles.alignRight}>
                            <img className={styles.img} src={beer.image_url ? beer.image_url : DefaultBeer} alt="beer"/>
                            <div className={styles.heartIcon}>
                                <HeartIcon isActive={beer.isFavorite} onClick={() => toggleFavorite(beer)} />
                            </div>
                        </div>
                        <div className={styles.text}>
                            <h3>{beer.name}</h3>
                            <h4>{beer.tagline}</h4>
                            <p className={styles.textAlignLeft}>{beer.description}</p>
                            <h5>First brewed: {beer.first_brewed}</h5>
                            <ul className={styles.ul}>
                                <li>ABV: {beer.abv || 0} / {MAX_ABV}
                                    <div className={styles.progressBarWidth}>
                                        <ProgressBar current={beer.abv} max={MAX_ABV}/>
                                    </div>
                                </li>
                                <li>EBC: {beer.ebc || 0} / {MAX_EBC}
                                    <div className={styles.progressBarWidth}>
                                        <ProgressBar current={beer.ebc} max={MAX_EBC}/>
                                    </div>
                                </li>
                                <li>IBU: {beer.ibu || 0} / {MAX_IBU}
                                    <div className={styles.progressBarWidth}>
                                        <ProgressBar current={beer.ibu} max={MAX_IBU}/>
                                    </div>
                                </li>
                                <li className={styles.title}>Ingredients: (malt, hops, yeast)</li>
                                <li>
                                    <img className={styles.icons} src={maltIcon} alt="malt" title="malt"/>
                                    {malts}
                                </li>
                                <li>
                                    <img className={styles.icons} src={hopsIcon} alt="hops" title="hops"/>
                                    {hops}
                                </li>
                                <li>
                                    <img className={styles.icons} src={yeastIcon} alt="yeast" title="yeast"/>
                                    {yeast}
                                </li>
                                <li className={styles.title}>Additional information: </li>
                                <li>
                                    <img className={styles.icons} src={foodsIcon} alt="foods" title="foods"/>
                                    {foods}
                                </li>
                                <li>
                                    <img className={styles.icons} src={tipsIcon} alt="tips" title="tips"/>
                                    {beer.brewers_tips}
                                </li>
                                <li>
                                    <img className={styles.icons} src={contributorIcon} alt="contributor" title="contributor"/>
                                    {beer.contributed_by}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> )
            : beer === null ? <ErrorPage/> : <Loader/>
    );
};

export default BeerInfo;