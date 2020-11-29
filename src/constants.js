
export const URL = 'https://api.punkapi.com/v2/beers';

export const FILTERS = {
  random: '/random',
  single_beer : '/',
  beer_name : 'beer_name',
  abv : 'abv',
  ibu : 'ibu',
  ebc : 'ebc',
  yeast : 'yeast',
  brewed_before : 'brewed_before',
  brewed_after: 'brewed_after',
  hops: 'hops',
  malt: 'malt',
  food: 'food',
  ids: 'ids'
};

//Home Screen
export const ALL_BEERS = 325;

//Pagination
export const ELEMENTS_NEXT_TO_CURRENT = 1;

export const USER_DATA = 'UserData';

export const MAX_AMOUNT_OF_FAVORITES = 15;

export const FAVORITES_VISIBLE = 3;

export const MAX_ABV = 56;

export const MAX_EBC = 601;

export const MAX_IBU = 1158;

export const THEMES = {
  light: {
    headerBackground: 'rgba(45, 44, 42, 0.5)',
    mainBackgroundColor: 'rgba(234, 210, 172, 0.4)',
    backgroundColor: 'rgba(234, 210, 172, 0.5)',
    backgroundColorHover: 'rgba(234, 210, 172, 0.7)',
    textColor: 'black',
    iconFilter: 'invert(0)',
    backgroundColorButton: 'rgba(45, 44, 42, 0.3)',
    backgroundColorHoverButton: 'rgba(45, 44, 42, 0.6)',
    textColorButton: 'white',
    progressBarColor: 'rgba(163, 84, 74, 1)',
  },
  dark: {
    headerBackground: 'rgba(45, 44, 42, 0.7)',
    mainBackgroundColor: 'rgba(45, 44, 42, 0.4)',
    backgroundColor: 'rgba(45, 44, 42, 0.3)',
    backgroundColorHover: 'rgba(45, 44, 42, 0.6)',
    textColor: 'white',
    iconFilter: 'invert(1)',
    backgroundColorButton: 'rgba(234, 210, 172, 0.7)',
    backgroundColorHoverButton: 'rgba(234, 210, 172, 0.5)',
    textColorButton: 'black',
    progressBarColor: 'rgba(163, 84, 74, 1)',
  },
  colorful: {
    headerBackground: 'rgba(236, 185, 86, 0.8)',
    mainBackgroundColor: 'rgba(234, 210, 172, 0.6)',
    backgroundColor: 'rgba(163, 84, 74, 0.4)',
    backgroundColorHover: 'rgba(163, 84, 74, 0.7)',
    textColor: 'white',
    iconFilter: 'invert(1)',
    backgroundColorButton: 'rgba(236, 185, 86, 1)',
    backgroundColorHoverButton: 'rgba(236, 185, 86, 0.6)',
    textColorButton: 'black',
    progressBarColor: 'rgba(236, 185, 86, 1)',
  },
};

export const THEME_LIGHT = 'light';
export const THEME_DARK = 'dark';
export const THEME_COLORFUL = 'colorful';