import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Mailbox } from "./Mailbox/Mailbox";

import './App.css';

const App = () => {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" render={() =>
                    <Redirect to="/inbox"/>
                }/>
                <Route path="/inbox" component={Mailbox}/>
                <Route path="/outbox" component={Mailbox}/>
            </Switch>
        </div>
    );
};

export default App;