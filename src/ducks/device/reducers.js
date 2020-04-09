import { CONNECTED, DISCONNECTED } from './types';

const INITIAL_STATE = {};


export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CONNECTED:
            return state;
        case DISCONNECTED:
            return state;
        default:
            return state;
    }
}