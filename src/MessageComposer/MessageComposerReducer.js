import { messageComposerActions } from './MessageComposerActions';

export const messageComposer = (state = {message: {}, isLoading: false, error: null}, action) => {
    switch (action.type) {
        case messageComposerActions.SEND_MESSAGE:
            return {
                ...state,
                isLoading: true,
                error: null,
                message: {}
            };
        case messageComposerActions.SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                message: action.message,
            };
        case messageComposerActions.SEND_MESSAGE_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        default:
            return state;
    }
};