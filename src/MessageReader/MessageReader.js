import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { MessageDetail } from './MessageDetail/MessageDetail';
import { fetchMessage, deleteMessage } from './MessageReaderActions';
import './MessageReader.css'

export class MessageReaderComponent extends Component {

    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        this.getMessage();
    }

    componentDidUpdate() {
        const {messageId} = this.getMailboxAndId(this.props.match.url);
        if(!this.props.isLoading && this.props.message.id !== messageId) {
            this.getMessage();
        }
    }

    getMailboxAndId(url) {
        const splitUrl = url.split('/');
        return {mailbox: splitUrl[1], messageId: splitUrl[3]};
    }

    getMessage() {
        const {match: {url}}  = this.props;
        const {mailbox, messageId} = this.getMailboxAndId(url);
        this.props.fetchMessage(mailbox, messageId);
    }

    onDelete() {
        const {messageId, mailbox} = this.getMailboxAndId(this.props.match.url);
        this.props.deleteMessage(mailbox, messageId);
        this.props.history.replace(`/${mailbox}`);
    }

    render() {
        return (
            <MessageDetail message={this.props.message} onDelete={this.onDelete}/>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    message: state.messageReader.message,
    messageId: state.messageReader.messageId,
    isLoading: state.messageReader.isLoading,
});

const mapDispatchToProps = dispatch => ({
    fetchMessage: bindActionCreators(fetchMessage, dispatch),
    deleteMessage: bindActionCreators(deleteMessage, dispatch),
});

export const MessageReader = connect(mapStateToProps, mapDispatchToProps)(MessageReaderComponent);