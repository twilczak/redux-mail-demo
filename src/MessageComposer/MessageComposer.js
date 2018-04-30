import React, { Component } from 'react';

import './MessageComposer.css';

import { MailService } from '../MailService';
import { errorHandler } from '../errorHandler';

import { MessageForm } from './MessageForm/MessageForm';

export class MessageComposer extends Component {

    constructor(props) {
        super(props);

        this.onSend = this.onSend.bind(this);
    }

    onSend (message) {
        MailService
            .sendMessage(message)
            .then((message) => {
                const mailbox = this.props.match.path.split('/')[1];
                const destination = mailbox === 'inbox' ? '/inbox' : `/outbox/view/${message.id}`;
                this.props.history.push(destination);
            })
            .catch(errorHandler);
    }

    render() {
        return (
            <MessageForm match={this.props.match} onSend={this.onSend}/>
        );
    }
}