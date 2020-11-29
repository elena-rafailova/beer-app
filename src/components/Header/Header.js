import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SessionContext } from '../../SessionContext';

import styles from './Header.module.scss';
import Logo from '../../images/logoRed.svg';
import HeartIcon from '../../images/heartIcon.svg';
import ProfileIcon from '../../images/profileImg.png';

const Header = () => {
    const session = useContext(SessionContext);

    return (
        <header className={styles.header}>
            <div className={styles.alignLeft}>
                <Link to="/home">
                    <img className={styles.logo} src={Logo} alt="Logo" />
                </Link>
            </div>
            <div className={styles.centerText}>
                <h1>BeerMania</h1>
            </div>
            {session
                ? <React.Fragment>
                    <div className={styles.alignRight}>
                        <Link to="/favorites">
                            <img className={`${styles.icons} ${styles.heartIcon}`} src={HeartIcon} alt="Favorites icon"/>
                        </Link>
                        <Link to="/profile">
                            <img className={styles.icons} src={session.imageUrl} alt="Profile"/>
                        </Link>
                    </div>
                  </React.Fragment>
                : <React.Fragment>
                    <div className={styles.alignRight}>
                        <Link to="/profile">
                            <img className={styles.icons} src={ProfileIcon} alt="Profile Icon"/>
                        </Link>
                    </div>
                </React.Fragment>
            }
        </header>
    );
};

export default Header;