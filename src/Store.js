import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const reducers = () => {};
const initialState = {};


export const Store = createStore(reducers, initialState, applyMiddleware(thunk));