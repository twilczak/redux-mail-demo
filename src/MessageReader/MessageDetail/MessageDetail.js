import React, { Component } from 'react';

import './MessageDetail.css';

export class MessageDetail extends Component {

    constructor (props) {
        super(props);
        this.deleteMessage = this.deleteMessage.bind(this);
    }

    deleteMessage() {
        this.props.onDelete(this.props.message);
    }

    renderMessageControls () {
        return (
            <div className="message-controls">
                <button className="message-button" onClick={this.deleteMessage}>Delete</button>
                <button className="message-button" disabled="disabled">Reply</button>
            </div>
        );
    }

    renderMessageDetail () {
        const message = this.props.message;
        return (
            <div className="message-detail">
                <div className="recipient"><span className="label">To: </span>{ message.recipient }</div>
                <div className="sender"><span className="label">From: </span>{ message.sender }</div>
                <div className="date-sent"><span className="label">Sent: </span>{ message.dateSent }</div>
                <div className="subject"><span className="label">Subject: </span>{ message.subject }</div>
                <div className="body">{ message.body }</div>
            </div>
        );
    }

    render() {
        return (
            <div className="inherit-grid">
                {this.renderMessageControls()}
                {this.renderMessageDetail()}
            </div>
        );
    }
}