import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

import './MailboxControls.css';

export class MailboxControls extends Component {
    render() {
        return (
            <div>
                <NavLink to="/inbox" className="mailbox-button" activeClassName="is-active">Inbox</NavLink>
                <NavLink to="/outbox" className="mailbox-button" activeClassName="is-active">Outbox</NavLink>
                <Link to={this.props.match.path + "/compose"} className="mailbox-button">Compose</Link>
            </div>
        );
    }
}