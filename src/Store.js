import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { mailbox } from './Mailbox/MailboxReducers';

const reducers = combineReducers({mailbox});
const initialState = {};


export const Store = createStore(reducers, initialState, applyMiddleware(thunk));