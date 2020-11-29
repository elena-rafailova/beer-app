import { createContext } from 'react';

export const LocalContext = createContext({});

export const getUserPreferences = (userId) => {
    return JSON.parse(localStorage.getItem(userId));
};

export const setUserPreferences = (userId, data) => {
    localStorage.setItem(userId, JSON.stringify(data));
};