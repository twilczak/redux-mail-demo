import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import { History } from './History';
import { Mailbox } from './Mailbox/Mailbox';
import { Store } from './Store';

import './App.css';

const App = () => {
    return (
        <Provider store={Store}>
            <ConnectedRouter history={History}>
                <div className="App">
                    <Switch>
                        <Route exact path="/" render={() =>
                            <Redirect to="/inbox"/>
                        }/>
                        <Route path="/inbox" component={Mailbox}/>
                        <Route path="/outbox" component={Mailbox}/>
                    </Switch>
                </div>
            </ConnectedRouter>
        </Provider>
    );
};

export default App;