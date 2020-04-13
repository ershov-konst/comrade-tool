import { CONNECTED, DISCONNECTED } from './types';

const INITIAL_STATE = {};


export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CONNECTED:
            return {
                ...state,
                info: action.info
            };
        case DISCONNECTED:
            return INITIAL_STATE;
        default:
            return state;
    }
}