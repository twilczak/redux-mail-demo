import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './MessageForm.css';

export class MessageForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipient: '',
            subject: '',
            body: ''
        };

        this.sendMessage = this.sendMessage.bind(this);
        this.validateAndUpdateState = this.validateAndUpdateState.bind(this);
    }

    validateAndUpdateState(event) {
        const update = {};
        update[event.target.name] = event.target.value;
        this.setState(update);

        if(!event.target.value.trim()) {
            event.target.classList.add('invalid');
        } else {
            event.target.classList.remove('invalid');
        }
    }

    sendMessage() {
        const message = {sender: 'Me', ...this.state};
        this.props.onSend(message);
    }

    sendDisabled() {
        return !(this.state.recipient.trim() && this.state.subject.trim() && this.state.body.trim());
    }


    render() {
        const mailbox = this.props.match.url.split('/')[1];
        return (
            <div className="inherit-grid">
                <div className="message-controls">
                    <Link className="message-button message-button--link" to={`/${mailbox}`}>Cancel</Link>
                    <button className="message-button" onClick={this.sendMessage} disabled={this.sendDisabled()}>Send</button>
                </div>
                <form className="message-composer">
                    <input className="composer-input" placeholder="recipient" name="recipient" type="text" onChange={this.validateAndUpdateState}/>
                    <input className="composer-input" placeholder="subject" name="subject" type="text" onChange={this.validateAndUpdateState}/>
                    <textarea className="composer-input" placeholder="body" name="body" rows="10"onChange={this.validateAndUpdateState}/>
                </form>
            </div>
        );
    }
}