import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './Mailbox.css';

import { MailService } from "../MailService";
import { errorHandler } from "../errorHandler";

import { MailboxControls } from "./MailboxControls/MailboxControls";
import { MailboxList } from "./MailboxList/MailboxList";
import { MessageReader } from "../MessageReader/MessageReader";
import { MessageComposer } from "../MessageComposer/MessageComposer";

export class Mailbox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: []
        };
    }

    componentDidMount() {
        this.loadMessages(this.props.match.path);
    }

    componentWillReceiveProps({match}) {
        this.loadMessages(match.path);
    }

    loadMessages(path) {
        this.setState({messages: []});
        MailService
            .getMessages(path)
            .then((messages) => this.setState({messages: messages}))
            .catch(errorHandler);
    }

    render() {
        return (
            <section className="mailbox">

                <MailboxControls match={this.props.match}/>
                <MailboxList match={this.props.match} location={this.props.location} messages={this.state.messages}/>

                <hr className="mailbox-border"/>

                <Switch>
                    <Route exact path="/inbox/view/:messageId" component={MessageReader}/>
                    <Route exact path="/outbox/view/:messageId" component={MessageReader}/>

                    <Route exact path="/inbox/compose" component={MessageComposer}/>
                    <Route exact path="/outbox/compose" component={MessageComposer}/>
                </Switch>

            </section>
        );
    }
}