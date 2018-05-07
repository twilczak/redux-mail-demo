import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import { History } from './History';
import { Store } from './Store';

import './index.css';

ReactDOM.render((
    <Provider store={Store}>
        <ConnectedRouter history={History}>
            <App/>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));

registerServiceWorker();
