import { FETCH_WEATHER} from '..actions/index';

export defualt function(state = [], action) {
    switch (action.type) {
    case FETCH_WEATHER:
        // return state.push([action.payload.data]); //do not mutate state
        return [ action.payload.data, ...state ]; // create new array new record on top of array
    }
    return state;
}