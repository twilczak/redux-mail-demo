import 'whatwg-fetch';
import { hostUrl } from '../constants';

export const FETCH_MESSAGE = 'FETCH_MESSAGE';
export const FETCH_MESSAGE_SUCCESS = 'FETCH_MESSAGE_SUCCESS';
export const FETCH_MESSAGE_FAILED = 'FETCH_MESSAGE_FAILED';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const DELETE_MESSAGE_SUCCESS = 'DELETE_MESSAGE_SUCCESS';
export const DELETE_MESSAGE_FAILED = 'DELETE_MESSAGE_FAILED';

export const messageReaderActions = {
    FETCH_MESSAGE,
    FETCH_MESSAGE_FAILED,
    FETCH_MESSAGE_SUCCESS,
    DELETE_MESSAGE,
    DELETE_MESSAGE_FAILED,
    DELETE_MESSAGE_SUCCESS,
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
            dispatch({type: FETCH_MESSAGE_FAILED, error});
        });
};

export const deleteMessage = (mailbox, messageId) => dispatch => {
    const parsedMailbox = mailbox.split('/').join('');
    const url = `${this.hostUrl}/${parsedMailbox}/${messageId}`;

    dispatch({type: DELETE_MESSAGE, mailbox: parsedMailbox, messageId});

    fetch(url, {method: 'DELETE'})
        .then(response => response.json())
        .then(response => {
            dispatch({type: DELETE_MESSAGE_SUCCESS, mailbox: parsedMailbox, messageId})
        })
        .catch(error => {
            dispatch({type: DELETE_MESSAGE_FAILED, mailbox: parsedMailbox, error, messageId});
        });
};