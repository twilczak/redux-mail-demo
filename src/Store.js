import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { mailbox } from './Mailbox/MailboxReducer';
import { messageReader } from './MessageReader/MessageReaderRecuer';

const reducers = combineReducers({mailbox, messageReader});
const initialState = {};


export const Store = createStore(reducers, initialState, applyMiddleware(thunk));