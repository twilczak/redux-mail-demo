import 'whatwg-fetch';
import { hostUrl } from '../constants';

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED';

export const messageComposerActions = {
    SEND_MESSAGE_FAILED,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE,
};

export const sendMessage = (message) => dispatch => {
    const url = `${hostUrl}/outbox`;
    message.dateSent = getDateSent();
    const options =  {
        method: 'POST',
        body: JSON.stringify(message),
    };

    dispatch({type: SEND_MESSAGE});

    fetch(url, options)
        .then(response => {
            if(response.ok) {
                return response.json()
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(response => {
            dispatch({type: SEND_MESSAGE_SUCCESS, message: response})
        })
        .catch(error => {
            dispatch({type: SEND_MESSAGE_FAILED, error});
        })
};

function zeroPad(value) {
    return value > 9 ?  '' + value : '0' + value;
}

function getDateSent(date = new Date()) {
    const day = zeroPad(date.getDate());
    const month = zeroPad(date.getMonth() + 1);
    const year = date.getFullYear();

    return `${year}.${month}.${day}`;
}