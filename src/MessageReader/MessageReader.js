import React, { Component } from 'react';

import './MessageReader.css'

import { MailService } from "../MailService";
import { MessageDetail } from "./MessageDetail/MessageDetail";
import { errorHandler } from "../errorHandler";

export class MessageReader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            message: {}
        };

        this.onDelete = this.onDelete.bind(this);
    }

    componentWillReceiveProps({match}) {
        const mailboxAndId = this.getMailboxAndId(match.url);
        this.getMessage(mailboxAndId);
    }

    getMailboxAndId(url) {
        const splitUrl = url.split('/');
        return {mailbox: splitUrl[1], messageId: splitUrl[3]}
    }

    getMessage({mailbox, messageId}) {
        if( this.state.loading ) {
            return;
        }

        this.setState({loading: true, message: {}});

        MailService
            .getMessage(mailbox, messageId)
            .then(message => this.setState({message, loading: false}))
            .catch(errorHandler);
    }

    onDelete(message) {
        const mailbox = this.props.match.url.split('/')[1];
        const messageId = message.id;

        MailService
            .deleteMessage(mailbox, messageId)
            .then(() => this.props.history.replace(`/${mailbox}`))
            .catch(errorHandler);
    }

    render() {
        return (
            <MessageDetail message={this.state.message} onDelete={this.onDelete}/>
        );
    }
}