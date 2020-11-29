import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { FILTERS, MAX_ABV, MAX_EBC, MAX_IBU } from '../../constants';
import { formatString, formatDate, reformatDate } from '../../helperMethods';
import styles from './Filters.module.scss';
import RangeSlider from '../RangeSlider/RangeSlider';
import ButtonSecondary from '../ButtonSecondary/ButtonSecondary';

const Filters = ({ handleFilter, removeFilters, query }) => {

    return (
        <div className={styles.filtersContainer}>
            <div className={styles.sliders}>
                <p>ABV</p><RangeSlider range={[0, MAX_ABV]} handleFilter={handleFilter} name={FILTERS.abv} />
                <p>EBC</p><RangeSlider range={[0, MAX_EBC]} handleFilter={handleFilter} name={FILTERS.ebc} />
                <p>IBU</p><RangeSlider range={[0, MAX_IBU]} handleFilter={handleFilter} name={FILTERS.ibu} />
            </div>
            <div className={styles.filterInputs}>
                <div className={styles.filters}>
                    <label>yeast</label>
                    <input
                        type="text"
                        value={query.yeast || ''}
                        placeholder="Enter name..."
                        onChange={(e) => handleFilter(FILTERS.yeast, formatString(e.target.value))}
                    />
                </div>
                <div className={styles.filters}>
                    <label>brewed before</label>
                    <DatePicker
                        showMonthYearPicker
                        selected={query.brewed_before ? reformatDate(query.brewed_before) : null}
                        dateFormat="MM-yyyy"
                        placeholderText="Select date..."
                        onChange={(value) => handleFilter(FILTERS.brewed_before, formatDate(value))}
                    />
                </div>
                <div className={styles.filters}>
                    <label>brewed after</label>
                    <DatePicker
                        showMonthYearPicker
                        selected={query.brewed_after ? reformatDate(query.brewed_after) : null}
                        dropdownMode="select"
                        dateFormat="MM-yyyy"
                        placeholderText="Select date..."
                        onChange={(value) => handleFilter(FILTERS.brewed_after, formatDate(value))}
                    />
                </div>
                <div className={styles.filters}>
                    <label>hops</label>
                    <input
                        type="text"
                        value={query.hops || ''}
                        placeholder="Enter name..."
                        onChange={(e) => handleFilter(FILTERS.hops, formatString(e.target.value))}
                    />
                </div>
                <div className={styles.filters}>
                    <label>malt</label>
                    <input
                        type="text"
                        value={query.malt || ''}
                        placeholder="Enter name..."
                        onChange={(e) => handleFilter(FILTERS.malt, formatString(e.target.value))}
                    />
                </div>
                <div className={styles.filters}>
                    <label>food</label>
                    <input
                        type="text"
                        value={query.food || ''}
                        placeholder="Enter name..."
                        onChange={(e) => handleFilter(FILTERS.food, formatString(e.target.value))}
                    />
                </div>
            </div>
            <ButtonSecondary onClick={() => removeFilters()} text='Remove all filters'/>
        </div>
    );
};

export default Filters;