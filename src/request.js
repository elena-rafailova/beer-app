import { URL } from './constants';

const request = async (params = '') => {
    try {
        const data = await fetch(`${URL}${params}`);
        if (!data.ok) {
            throw Error(`Code: ${data.status}`);
        } else {
            return await data.json();
        }
    } catch (error) {
        return {error: true};
    }
};

export default request;