import { messageReaderActions } from './MessageReaderActions';

export const messageReader = (state = {isLoading: false, message: {}}, action) => {
    switch(action.type) {
        case messageReaderActions.FETCH_MESSAGE:
            return {
                ...state,
                isLoading: true,
                error: null,
                message: {},
            };
        case messageReaderActions.FETCH_MESSAGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: action.message,
            };
        case messageReaderActions.FETCH_MESSAGE_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.error,
                message: {}
            };
        case messageReaderActions.DELETE_MESSAGE:
            return {
                ...state,
                isLoading: true,
            };
        case messageReaderActions.DELETE_MESSAGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: {}
            };
        case messageReaderActions.DELETE_MESSAGE_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        default:
            return state;
    }
};