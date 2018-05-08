import { mailboxActions } from './MailboxActions';
import { messageReaderActions } from '../MessageReader/MessageReaderActions';
import { messageComposerActions } from '../MessageComposer/MessageComposerActions';

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
        case messageReaderActions.DELETE_MESSAGE_SUCCESS:
            return {
                ...state,
                [action.mailbox] : state[action.mailbox].filter(message => message.id !== action.messageId),
            };
        case messageComposerActions.SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                outbox: [...state.outbox, action.message],
            };
        default:
            return state;
    }
};