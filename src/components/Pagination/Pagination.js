import React from 'react';
import styles from './Pagination.module.scss';
import { Link } from 'react-router-dom';
import { ELEMENTS_NEXT_TO_CURRENT } from '../../constants';

const Pagination = ({ allBeers, beersPerPage, currentPage, turnPage }) => {
    const allPages = Math.ceil(allBeers / beersPerPage);

    const displayPagination = () => {
        const leftSide = currentPage - ELEMENTS_NEXT_TO_CURRENT;
        const rightSide = currentPage + ELEMENTS_NEXT_TO_CURRENT;
        const pagesForDisplay = [];
        const rangeWithDots = [];
        let currentActivePage = null;
        let areDotsIncluded = false;

        for (let i = 1; i <= allPages; i++) {
            if (i === 1 || i === allPages || i >= leftSide && i <= rightSide) {
                pagesForDisplay.push(i)
            }
        }

        for (let currentDisplayedPage of pagesForDisplay) {
            if (currentActivePage && currentDisplayedPage - currentActivePage !== ELEMENTS_NEXT_TO_CURRENT) {
                rangeWithDots.push(
                    <li key={areDotsIncluded ? -1 : 0} className={`${styles.page} ${styles.disabled}`}>
                        <span>. . .</span>
                    </li>
                );
                areDotsIncluded = true;
            }
            rangeWithDots.push(
                <li key={currentDisplayedPage} onClick={(e) => turnPage(currentDisplayedPage)}>
                    <Link to={`/home/${currentDisplayedPage}`}
                          className={`${styles.page} ${currentPage === currentDisplayedPage ? styles.disabled : null}`} >
                            {currentDisplayedPage}
                    </Link>
                </li>
            );
            currentActivePage = currentDisplayedPage;
        }
        return rangeWithDots;
    };

    return (
        <div className={styles.pagination}>
            <ul>
                <li onClick={() => turnPage(currentPage - 1)}>
                    <Link to={`/home/${currentPage - 1}`}
                          className={`${styles.page} ${currentPage === 1 ? styles.disabled : null}`}>
                            &#8249;
                    </Link>
                </li>
                {displayPagination()}
                <li onClick={() => turnPage(currentPage + 1)}>
                    <Link to={`/home/${currentPage + 1}`}
                          className={`${styles.page} ${currentPage === allPages ? styles.disabled : null}`}>
                            &#8250;
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;