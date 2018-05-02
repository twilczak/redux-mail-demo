import { mailboxActions } from './MailboxActions';

export const mailbox = (state = {isLoading: false, inbox: [], outbox: []}, action) => {
    switch(action.type) {
        case mailboxActions.FETCH_MESSAGES:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case mailboxActions.FETCH_MESSAGES_SUCCESS:
            return {
                ...state,
                [action.mailbox]: action.messages,
                isLoading: false,
            };
        case mailboxActions.FETCH_MESSAGES_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        default:
            return state;
    }
};