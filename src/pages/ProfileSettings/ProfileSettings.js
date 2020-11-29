import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import { THEME_COLORFUL, THEME_DARK, THEME_LIGHT } from '../../constants';
import { GOOGLE_CLIENT } from '../../google';
import withSession from '../../withSession';
import { getUserPreferences, LocalContext, setUserPreferences } from '../../LocalContext';
import { clearUserData, SessionContext } from '../../SessionContext';
import { setTheme } from '../../helperMethods';

import styles from './ProfileSettings.module.scss';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import ButtonSecondary from '../../components/ButtonSecondary/ButtonSecondary';
import Select from 'react-select';

const ProfileSettings = () => {
    const session = useContext(SessionContext);
    const userPreferences = useContext(LocalContext);
    const history = useHistory();
    const [randomFromFavorites, setRandomFromFavorites] = useState(userPreferences.randomFromFavorites !== null
        ? userPreferences.randomFromFavorites
        : false);
    const [areNotificationsOn, setAreNotificationsOn] = useState(userPreferences.notifications !== null
        ? userPreferences.notifications
        : true);
    const [currentThemeName, setCurrentThemeName] = useState(userPreferences.theme || THEME_LIGHT);

    const options =  [
        {value: THEME_LIGHT, label: THEME_LIGHT},
        {value: THEME_DARK, label: THEME_DARK},
        {value: THEME_COLORFUL, label: THEME_COLORFUL},
    ];

    const logout = () => {
        clearUserData();
        history.push('/login');
    };

    useEffect(() => {
        const preferences = getUserPreferences(session.googleId);
        setUserPreferences(session.googleId, {...preferences,
            randomFromFavorites: randomFromFavorites,
            notifications: areNotificationsOn,
            theme: currentThemeName});
        setTheme(currentThemeName);
    }, [randomFromFavorites, areNotificationsOn, currentThemeName]);

    return (
        <div className={styles.container}>
            <div>
                <img className={styles.profileImage} src={session.imageUrl} alt="profile"/>
                <h3 className={styles.profileName}>{session.name}</h3>
            </div>
            <h4>Settings</h4>
            <div className={styles.setting}>
                <label>Get random beer from favorites: </label>
                <ToggleSwitch
                    id="randomBeer"
                    value={randomFromFavorites}
                    onChange={setRandomFromFavorites}
                />
                <label>Notifications: </label>
                <ToggleSwitch
                    id="notifications"
                    value={areNotificationsOn}
                    onChange={setAreNotificationsOn}
                />
                <label>Select Theme:</label>
                <Select
                    className={styles.select}
                    value={options.filter(({value}) => value === currentThemeName)}
                    onChange={({value}) => setCurrentThemeName(value)}
                    options={options}
                    />
                <div className={styles.logoutButton}>
                    <GoogleLogout
                        clientId={GOOGLE_CLIENT}
                        render={renderProps => (
                            <ButtonSecondary
                                text='Logout'
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                />
                        )}
                        onLogoutSuccess={logout}
                    >
                    </GoogleLogout>
                </div>
            </div>
        </div>
    );
};

export default withSession(ProfileSettings);