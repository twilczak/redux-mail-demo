import { messageComposerActions } from './MessageComposerActions';

export const messageComposer = (state = {message: {}, loading: false, error: null}, action) => {
    switch (action.type) {
        case messageComposerActions.SEND_MESSAGE:
            return {
                ...state,
                loading: true,
                error: null,
                message: {}
            };
        case messageComposerActions.SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.message,
            };
        case messageComposerActions.SEND_MESSAGE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};