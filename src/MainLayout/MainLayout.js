import React from 'react';
import Header from '../components/Header/Header';
import { SessionContext, getUserData } from '../SessionContext';
import { LocalContext, getUserPreferences } from '../LocalContext';
import styles from './MainLayout.module.scss';
import { setTheme } from '../helperMethods';
import { THEME_LIGHT } from '../constants';

const MainLayout = ({ component })  => {
    const session = getUserData();
    const preferences = session ? getUserPreferences(session.googleId) : {};
    setTheme(preferences.theme || THEME_LIGHT);

    return (
        <SessionContext.Provider value={session}>
            <LocalContext.Provider value={preferences}>
                <div className={styles.container}>
                    <Header/>
                    {component}
                </div>
            </LocalContext.Provider>
        </SessionContext.Provider>
    );
};

export default MainLayout;