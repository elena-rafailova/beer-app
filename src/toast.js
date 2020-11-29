import { getUserPreferences } from './LocalContext';
import { getUserData } from './SessionContext';
import { toast } from 'react-toastify';

const session = getUserData();

const toastWrapper = {
    warn: (message) => {
        const preferences = getUserPreferences(session ? session.googleId : null);
        if (preferences && preferences.notifications) {
            toast.warn(message);
        }
    },
    success: (message) => {
        const preferences = getUserPreferences(session ? session.googleId : null);
        if (preferences && preferences.notifications) {
            toast.success(message);
        }
    },
    error: (message) => {
        const preferences = getUserPreferences(session ? session.googleId : null);
        if (preferences && preferences.notifications) {
            toast.error(message);
        }
    },
};

export default toastWrapper;
