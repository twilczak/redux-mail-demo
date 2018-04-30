import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './MailboxList.css'

export class MailboxList extends Component {

    constructor(props) {
        super(props);

        this.renderMessage = this.renderMessage.bind(this);
    }

    componentDidUpdate() {
        const url = this.props.location.pathname.split('/');
        if(url.length > 2) {
            this.scrollMessageIntoView(url[3]);
        }
    }

    scrollMessageIntoView(messageId) {
        const element = document.getElementById(messageId);
        if( element ) {
            element.scrollIntoView();
        }
    }

    renderHeader() {
        const recipientOrSender = this.props.match.path === '/inbox' ?
            <span className="sender">Sender</span>:
            <span className="recipient">To</span>;

        return (
            <li className="mailbox-list-header">
                {recipientOrSender}
                <span className="subject">Subject</span>
                <span className="date-sent">Date</span>
            </li>
        );
    }

    renderMessages() {
        return this.props.messages.map(this.renderMessage);
    }

    renderMessage(message) {
        const recipientOrSender =  this.props.match.path === '/inbox' ?
            <span className="sender">{message.sender}</span> :
            <span className="recipient">{message.recipient}</span>;

        return (
            <li className="mailbox-list-item" key={message.id} id={message.id}>
                <NavLink to={this.props.match.path + "/view/" + message.id}
                         className="mailbox-item-link"
                         activeClassName="is-active">
                    {recipientOrSender}
                    <span className="subject">{message.subject}</span>
                    <span className="date-sent">{message.dateSent}</span>
                </NavLink>
            </li>
        );
    }

    render() {
        return (
            <ol className="mailbox-list">
                { this.renderHeader() }
                { this.renderMessages() }
            </ol>
        );
    }
}