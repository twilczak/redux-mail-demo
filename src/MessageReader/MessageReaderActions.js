import 'whatwg-fetch';
import { hostUrl } from '../constants';

export const FETCH_MESSAGE = 'FETCH_MESSAGE';
export const FETCH_MESSAGE_SUCCESS = 'FETCH_MESSAGE_SUCCESS';
export const FETCH_MESSAGE_FAILED = 'FETCH_MESSAGE_FAILED';

export const messageReaderActions = {
    FETCH_MESSAGE,
    FETCH_MESSAGE_FAILED,
    FETCH_MESSAGE_SUCCESS,
};

export const fetchMessage = (mailbox, messageId) => dispatch => {
    const parsedMailbox = mailbox.split('/').join('');
    const url = `${hostUrl}/${parsedMailbox}`;

    dispatch({type: FETCH_MESSAGE, mailbox: parsedMailbox});

    fetch(url)
        .then(response => response.json())
        .then(jsonResponse => {
            const message = jsonResponse.find(message => message.id === messageId);
            dispatch({type: FETCH_MESSAGE_SUCCESS, message: message});
        })
        .catch(error => {
            dispatch({type: FETCH_MESSAGE_FAILED, error, messageId});
        });
};