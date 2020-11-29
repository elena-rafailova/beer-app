import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Select from 'react-select';
import toastWrapper from '../../toast';

import request from '../../request';
import { ALL_BEERS, FILTERS, MAX_AMOUNT_OF_FAVORITES } from '../../constants';
import { debounce } from '../../debounce';
import { SessionContext } from '../../SessionContext';
import { LocalContext, setUserPreferences } from '../../LocalContext';
import { isEmpty, findIndexById } from '../../helperMethods';

import styles from './HomeScreen.module.scss'
import SearchBar from '../../components/SearchBar/SearchBar';
import BeerCard from '../../components/BeerCard/BeerCard';
import Pagination from '../../components/Pagination/Pagination';
import Filters from '../../components/Filters/Filters';
import ButtonSecondary from '../../components/ButtonSecondary/ButtonSecondary';
import Loader from '../../components/Loader/Loader';
import ErrorPage from '../../components/ErrorPage/ErrorPage';

const HomeScreen = () => {
    const session = useContext(SessionContext);
    const userPreferences = useContext(LocalContext);
    const history = useHistory();
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [beers, setBeers] = useState([]);
    const [areFiltersShown, setAreFiltersShown] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [beersPerPage, setBeersPerPage] = useState(12);
    const [query, setQuery] = useState({});
    const [finalQuery, setFinalQuery] = useState('');
    const [filteredBeers, setFilteredBeers] = useState([]);
    const options =  [
        {value: 12, label: '12'},
        {value: 24, label: '24'},
        {value: 48, label: '48'},
    ];

    const turnPage = (pageNumber) => {
        if (pageNumber <= 1) {
            setCurrentPage(1);
        } else if (pageNumber >= (Math.ceil(ALL_BEERS / beersPerPage) + 1)) {
            setCurrentPage(pageNumber - 1);
        } else {
            setCurrentPage(pageNumber);
        }
    };

    const getBeers = async (query) => {
        let beers = await request(query);
        if (beers.error) {
            return beers;
        } else {
            beers = isEmpty(userPreferences) ? beers : beers.map(beer => {
                return  { ...beer,
                    isFavorite: findIndexById(userPreferences.favorites, beer) > -1
                }
            });
            return beers;
        }
    };

    const filterBeers = async (finalQuery) => {
        const filtered = await getBeers(`?${finalQuery}`);
        filtered.length > 0 ? setFilteredBeers(filtered) : setBeers(filtered);
    };

    const removeFilters = () => {
        setQuery({});
        setFinalQuery('');
        setFilteredBeers([]);
    };

    const debounceFiltering = useCallback(debounce(filterBeers, 250), []);

    const handleFilter = (name, value) => {
        setQuery(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const toggleFavorite = (beerChosen) => {
        if (isEmpty(userPreferences)) {
            history.push('/login');
        } else {
            const beerIndex = findIndexById(userPreferences.favorites, beerChosen);
            const beerIndexFromAll = findIndexById(beers, beerChosen);
            if (beerIndex > -1) {
                beers[beerIndexFromAll].isFavorite = false;
                setBeers([...beers]);
                userPreferences.favorites.splice(beerIndex, 1);
                toastWrapper.warn('Beer removed from favorites!');
            } else if (userPreferences.favorites.length < MAX_AMOUNT_OF_FAVORITES) {
                beers[beerIndexFromAll].isFavorite = true;
                setBeers([...beers]);
                userPreferences.favorites.push(beerChosen);
                toastWrapper.success('Beer added to favorites!');
            } else {
                toastWrapper.error('You cannot have more than 15 favorites!');
            }
            setUserPreferences(session.googleId, userPreferences);
        }
    };

    const getRandomBeer = async () => {
        if (userPreferences && userPreferences.randomFromFavorites) {
            if (userPreferences.favorites.length < 1) {
                toastWrapper.warn('You don\'t have any favorites!');
            } else {
                const randomIndex = Math.floor(Math.random() * userPreferences.favorites.length);
                const id = userPreferences.favorites[randomIndex].id;
                history.push(`/beer/${id}`);
            }
        } else {
            let beer = await request(FILTERS.random);
            const id = beer[0].id;
            history.push(`/beer/${id}`);
        }
    };

    useEffect(() => {
        const queryArray = Object.entries(query);
        const hasNoValues = queryArray.every(([key,value]) => !value);
        if (hasNoValues) {
            setFinalQuery('');
        } else {
            const valuesOnlyArray = queryArray.filter(([key, value]) => value);
            setFinalQuery(valuesOnlyArray.map((item) => {
                if (item[1]) {
                    item[1] = item[1].toString();
                    item[1] = item[1].replace(/[ ]/g, '_');
                }
                return item.join('=');
            }).join('&'));
        }
    }, [query]);

    useEffect(() => {
        const getDefaultBeers = async() =>  {
            const beers = await getBeers(`?page=${currentPage}&per_page=${beersPerPage}`);
            if (beers.error) {
                setBeers(beers);
            } else {
                setBeers(beers);
                setIsDataLoaded(true);
            }
        };
        if (finalQuery !== '') {
            debounceFiltering(finalQuery);
        } else {
            setFilteredBeers([]);
            getDefaultBeers();
        }
    }, [finalQuery, debounceFiltering]);

    useEffect(() => {
       const pagination = async () => {
           if (filteredBeers.length > 0) {
               if (filteredBeers.length > beersPerPage) {
                   const beers = filteredBeers.slice(currentPage * beersPerPage - beersPerPage, currentPage * beersPerPage);
                   setBeers(beers);
               } else {
                   setBeers(filteredBeers);
               }
           } else {
               let page = 1;
               switch (currentPage) {
                   case (currentPage <= 1):
                       page = 1;
                       break;
                   case (currentPage >= (Math.ceil(ALL_BEERS / beersPerPage) + 1)):
                       page = currentPage - 1;
                       break;
                   default:
                       page = currentPage;
                       break;
               }
               const query = `?page=${page}&per_page=${beersPerPage}`;
               const beers = await getBeers(query);
               setBeers(beers);
           }
       };
       pagination();
     }, [beersPerPage, currentPage, filteredBeers]);

    return (isDataLoaded
            ? <div>
                   <SearchBar handleFilter={handleFilter} beerName={query.beer_name}/>
                   <div className={styles.flexContainer}>
                       <ButtonSecondary
                           onClick={getRandomBeer}
                           text='Get Random Beer'
                       />
                       <ButtonSecondary
                           onClick={() => setAreFiltersShown(!areFiltersShown)}
                           text={areFiltersShown ? 'Hide Filters' : 'Show Filters'}
                       />
                   </div>
                   <CSSTransition in={areFiltersShown} timeout={300} classNames="filters" mountOnEnter unmountOnExit>
                       <Filters handleFilter={handleFilter} query={query} removeFilters={removeFilters}/>
                   </CSSTransition>
                   <div className={styles.flexContainer}>
                       <label>Choose how many items to be displayed: </label>
                       <Select
                           className={styles.select}
                           value={options.filter(({value}) => value === beersPerPage)}
                           onChange={({value}) => setBeersPerPage(value)}
                           options={options}
                       />
                   </div>
                   <Pagination
                       currentPage={currentPage}
                       allBeers={filteredBeers.length > 0 ? (beers.length < 1 ? beers.length : filteredBeers.length) : ALL_BEERS}
                       turnPage={turnPage}
                       beersPerPage={beersPerPage}
                   />
                  <main className={styles.mainContainer}>
                      {beers.length < 1
                          ? <h1>NO RESULTS</h1>
                          : beers.map(beer => (
                          <BeerCard
                              key={beer.id}
                              beer={beer}
                              toggleFavorite={() => toggleFavorite(beer)}
                              isFavorite={beer.isFavorite}
                          />
                      ))}
                  </main>
              </div>
            : beers.error ? <ErrorPage/> : <Loader/>
   );
};

export default HomeScreen;