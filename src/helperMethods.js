import { THEMES } from './constants';

export const formatString = (string) => {
    return string.replace(/[^a-zA-Z0-9а-яА-Я\s_]/g, '').toLowerCase();
};

export const formatDate = (date) => {
    const string = `${date.getMonth()+1}-${date.getFullYear()}`;
    return date.getMonth() < 10 ? `0${string}` :  string;
};

export const reformatDate = (string) => {
    string = string.split('-');
    return new Date(parseInt(string[1]), parseInt(string[0]) - 1);
};

export const isEmpty = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
};

export const findIndexById = (data, value) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === value.id) {
            return i;
        }
    }
    return -1;
};

export const setTheme = (themeName) => {
    const theme = THEMES[themeName];
    Object.keys(theme).forEach((key) => {
        const cssKey = `--${key}`;
        const cssValue = theme[key];
        document.body.style.setProperty(cssKey, cssValue);
    })};
