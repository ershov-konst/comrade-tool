import { CONNECTED, DISCONNECTED } from './types';


export function connected(info) {
    return {
        type: CONNECTED,
        info
    }
}

export function disconnected() {
    return {
        type: DISCONNECTED
    }
}
