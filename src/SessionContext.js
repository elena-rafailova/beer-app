import { createContext } from 'react';
import { USER_DATA } from './constants';

export const SessionContext = createContext({});

export const getUserData = () => {
   return JSON.parse(sessionStorage.getItem(USER_DATA));
};

export const setUserData = (data) => {
    sessionStorage.setItem(USER_DATA, JSON.stringify(data));
};

export const clearUserData = () => {
    sessionStorage.removeItem(USER_DATA);
};