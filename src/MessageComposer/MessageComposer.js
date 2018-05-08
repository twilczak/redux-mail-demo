import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { MessageForm } from './MessageForm/MessageForm';
import { sendMessage } from './MessageComposerActions';
import './MessageComposer.css';

export class MessageComposerComponent extends Component {

    constructor(props) {
        super(props);

        this.onSend = this.onSend.bind(this);
    }

    componentDidUpdate() {
        const {id} = this.props.message;
        if(id) {
            const mailbox = this.props.match.path.split('/')[1];
            const destination = mailbox === 'inbox' ? '/inbox' : `/outbox/view/${id}`;
            this.props.history.push(destination);
        }
    }

    onSend (message) {
        this.props.sendMessage(message);
    }

    render() {
        return (
            <MessageForm match={this.props.match} onSend={this.onSend}/>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.messageComposer.isLoading,
    message: state.messageComposer.message,
});

const mapDispatchToProps = dispatch => ({
    sendMessage: bindActionCreators(sendMessage, dispatch)
});

export const MessageComposer = connect(mapStateToProps, mapDispatchToProps)(MessageComposerComponent);