import React, { createRef, useContext, useEffect, useState } from 'react';
import toastWrapper from '../../toast';
import withSession from '../../withSession';
import { LocalContext, setUserPreferences } from '../../LocalContext';
import { SessionContext } from '../../SessionContext';
import { findIndexById } from '../../helperMethods';
import { FAVORITES_VISIBLE } from '../../constants';

import FavoriteBeer from '../../components/FavoriteBeer/FavoriteBeer';
import Carousel from '../../components/Carousel/Carousel';

const Favorites = () => {
    const userPreferences = useContext(LocalContext);
    const session = useContext(SessionContext);
    const favoriteBeerRef = createRef();
    const [favoriteBeerWidth, setFavoriteBeerWidth] = useState(null);

    const [favorites, setFavorites] = useState(userPreferences.favorites.map((favorite, i) => (
        {...favorite, index: i}
    )));

    useEffect(() => {
        if (favoriteBeerRef.current !== null) {
            setFavoriteBeerWidth(favoriteBeerRef.current.clientWidth);
        }
    }, [favoriteBeerRef]);

    const removeFavorite = (beer) => {
        const beerIndex = findIndexById(userPreferences.favorites, beer);
        userPreferences.favorites.splice(beerIndex, 1);
        setUserPreferences(session.googleId, userPreferences);
        setFavorites(userPreferences.favorites.map((favorite, i) => (
            {...favorite, index: i}
        )));
        toastWrapper.warn('Beer removed from favorites!');
    };

    const FavoriteBeers = favorites.map((beer) => {
          return <FavoriteBeer
                      ref={favoriteBeerRef}
                      key={beer.index}
                      beer={beer}
                      removeFavorite={() => removeFavorite(beer)}
                  />
    });

    return (
        <div>
            {favorites.length > 0
                ? <Carousel items={favorites}
                            itemsVisible={FAVORITES_VISIBLE}
                            component={FavoriteBeers}
                            itemWidth={favoriteBeerWidth}
                   />
                : <h1>NO FAVORITES</h1>
            }
        </div>
    );
};

export default withSession(Favorites);