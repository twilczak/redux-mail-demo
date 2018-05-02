import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { MailboxControls } from "./MailboxControls/MailboxControls";
import { MailboxList } from "./MailboxList/MailboxList";
import { MessageReader } from "../MessageReader/MessageReader";
import { MessageComposer } from "../MessageComposer/MessageComposer";

import { fetchMessages } from './MailboxActions';

import './Mailbox.css';

class MailboxComponent extends Component {

    componentDidMount() {
        this.props.fetchMessages(this.props.match.path);
    }

    render() {
        return (
            <section className="mailbox">

                <MailboxControls match={this.props.match}/>
                <MailboxList match={this.props.match} location={this.props.location} messages={this.props.messages}/>

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

const mapInboxToProps = (state, ownProps) => ({
    messages: state.mailbox.inbox,
    isLoading: state.mailbox.isLoading,
});

const mapOutboxToProps = (state, ownProps) => ({
    messages: state.mailbox.outbox,
    isLoading: state.mailbox.isLoading,
});

const mapDispatchToProps = dispatch => ({
    fetchMessages: bindActionCreators(fetchMessages, dispatch)
});

export const Inbox = connect(mapInboxToProps, mapDispatchToProps)(MailboxComponent);
export const Outbox = connect(mapOutboxToProps, mapDispatchToProps)(MailboxComponent);