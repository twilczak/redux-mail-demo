import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { History } from './History';

import { mailbox } from './Mailbox/MailboxReducer';
import { messageReader } from './MessageReader/MessageReaderReducer';
import { messageComposer } from './MessageComposer/MessageComposerReducer';

const reducers = combineReducers({mailbox, messageReader, messageComposer, routerReducer});
const initialState = {};

export const Store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk, routerMiddleware(History))));