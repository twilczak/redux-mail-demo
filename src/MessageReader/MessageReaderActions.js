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
        .then(response => {
            if(response.ok) {
                return response.json()
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(jsonResponse => {
            const message = jsonResponse.find(message => message.id === messageId);
            dispatch({type: FETCH_MESSAGE_SUCCESS, message: message});
        })
        .catch(error => {
            dispatch({type: FETCH_MESSAGE_FAILED, error});
        });
};

export const deleteMessage = (mailbox, messageId) => dispatch => {
    const url = `${hostUrl}/${mailbox}/${messageId}`;

    dispatch({type: DELETE_MESSAGE, mailbox, messageId});

    fetch(url, {method: 'DELETE'})
        .then(response => {
            if(response.ok) {
                dispatch({type: DELETE_MESSAGE_SUCCESS, mailbox, messageId})
            } else {
                throw new Error(response.statusText);
            }
        })
        .catch(error => {
            dispatch({type: DELETE_MESSAGE_FAILED, mailbox, error, messageId});
        });
};