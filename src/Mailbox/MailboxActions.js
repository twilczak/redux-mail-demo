import 'whatwg-fetch';
import { hostUrl } from '../constants';

export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAILED = 'FETCH_MESSAGES_FAILED';

export const mailboxActions = {
    FETCH_MESSAGES,
    FETCH_MESSAGES_FAILED,
    FETCH_MESSAGES_SUCCESS,
};

export const fetchMessages = (mailbox) => dispatch => {
    const parsedMailbox =  mailbox.split('/').join('');
    const url = `${hostUrl}/${parsedMailbox}`;

    dispatch({type: FETCH_MESSAGES, mailbox: parsedMailbox});

    fetch(url)
        .then(response => response.json())
        .then(jsonResponse => {
            dispatch({type: FETCH_MESSAGES_SUCCESS, mailbox: parsedMailbox, messages: jsonResponse});
        })
        .catch(error => {
            dispatch({type: FETCH_MESSAGES_FAILED, mailbox: parsedMailbox, error});
        });
};

