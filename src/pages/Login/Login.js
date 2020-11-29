import React, { useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { CSSTransition } from 'react-transition-group';
import { THEME_LIGHT } from '../../constants';
import { GOOGLE_CLIENT } from '../../google';
import { toast } from 'react-toastify';
import { setUserData, getUserData } from '../../SessionContext';
import { getUserPreferences, setUserPreferences } from '../../LocalContext';
import { setTheme } from '../../helperMethods';

import styles from './Login.module.scss';
import Logo from '../../images/logoRed.svg';
import ButtonSecondary from '../../components/ButtonSecondary/ButtonSecondary';

const Login = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [profileData, setProfileData] = useState({});
    const [isTextVisible, setIsTextVisible] = useState(false);
    const history = useHistory();
    const session = getUserData();

    setTheme(THEME_LIGHT);

    const getGoogleResponse = (response) => {
        if (response.error) {
            toast.error('Something went wrong! Please try again!');
        } else {
            setProfileData(response.profileObj);
            setIsLogged(true);
            if (!getUserPreferences(response.profileObj.googleId)) {
                setUserPreferences(response.profileObj.googleId, {favorites: [], randomFromFavorites: false, notifications: true, theme: THEME_LIGHT});
            }
        }
    };

    useEffect(() => {
        if (isLogged) {
            const sessionData = {...profileData, isLogged: isLogged};
            setUserData(sessionData);
            history.push('/home');
        }
    },[isLogged, history, profileData]);

    return (
        session
            ?
            <Redirect to="/home"/>
            : <div className={styles.container}>
                <h3>Welcome to BeerMania!</h3>
                    <div className={styles.info}>
                        <CSSTransition in={isTextVisible} timeout={300} classNames="login-img">
                            <img src={Logo} alt="logo" onMouseOver={() => setIsTextVisible(true)} onMouseOut={() => setIsTextVisible(false)}/>
                        </CSSTransition>
                        <CSSTransition in={isTextVisible} timeout={300} classNames="login-text" mountOnEnter unmountOnExit>
                            <p>Hello, this is our website for beer maniacs.
                                If you love beer, this is the place for you.
                                You can order beers from all around the world,
                                read very thorough information about each beer,
                                add it to your favourites and much more...
                                Please login to continue.</p>
                        </CSSTransition>
                    </div>
                    <GoogleLogin
                        clientId={GOOGLE_CLIENT}
                        render={renderProps => (
                            <ButtonSecondary text="Login" onClick={renderProps.onClick} disabled={renderProps.disabled}/>
                        )}
                        onSuccess={getGoogleResponse}
                        onFailure={getGoogleResponse}
                        cookiePolicy={'single_host_origin'}
                    />
              </div>
    );
};

export default Login;