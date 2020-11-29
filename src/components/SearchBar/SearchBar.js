import React from 'react';
import { FILTERS } from '../../constants';
import styles from './SearchBar.module.scss';
import { formatString } from '../../helperMethods';

const SearchBar = ({ handleFilter, beerName }) => {

    return (
       <div className={styles.search}>
           <div>
               <input
                   type="text"
                   value={beerName || ''}
                   placeholder="Search . . ."
                   required
                   onChange={(e) => handleFilter(FILTERS.beer_name, formatString(e.target.value))}
               />
           </div>
       </div>
    );
};

export default SearchBar;