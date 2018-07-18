import {GET} from './types';
import {SET} from './types';

export const get = () => {
    return {
        type: GET
    };
};

export const set = () => {
    return {
        type: SET
    };
};