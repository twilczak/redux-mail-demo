import { messageReaderActions } from './MessageReaderActions';

export const messageReader = (state = {isLoading: false, message: {}}, action) => {
    switch(action.type) {
        case messageReaderActions.FETCH_MESSAGE:
            return {
                ...state,
                isLoading: true,
                error: null,
                message: {},
                messageId: null,
            };
        case messageReaderActions.FETCH_MESSAGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: action.message,
                messageId: null,
            };
        case messageReaderActions.FETCH_MESSAGE_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.error,
                messageId: action.messageId,
                message: {}
            };
        default:
            return state;
    }
};