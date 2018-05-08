import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import { MemoryRouter, Route } from 'react-router-dom';
import { MailboxComponent } from "./Mailbox";

describe(MailboxComponent, () => {
    const mockMessages = [{id: 'test'}];
    const fetchMessages = jest.fn();

    const component = shallow(
        <MailboxComponent match={{path: '/inbox'}} fetchMessages={fetchMessages} messages={mockMessages}/>
    );

    it('renders and matches the snapshot', () => {
        const TestMailbox = () => {
            return (
                <MailboxComponent match={{path: '/inbox'}} messages={mockMessages} fetchMessages={fetchMessages}/>
            );
        };
        const component = renderer.create(
            <MemoryRouter initialEntries={['/inbox']}>
                <Route path="/inbox" render={TestMailbox}/>
            </MemoryRouter>
        );
        expect(component).toMatchSnapshot();
    });

    it('renders the mailbox markup', () => {
        expect(component.find('.mailbox')).toBeTruthy();
        expect(component.find('MailboxControls')).toBeTruthy();
        expect(component.find('MailboxList')).toBeTruthy();
        expect(component.find('.mailbox-border')).toBeTruthy();
    });

    it('calls props.fetchMessages() with props.match.path', () => {
        expect(fetchMessages.mock.calls[0][0]).toEqual('/inbox');
    });

    it('renders the MailboxList', () => {
        const mailboxListProps = component.find('MailboxList').props();
        expect(mailboxListProps.match).toEqual({path: '/inbox'});
        expect(mailboxListProps.messages).toEqual(mockMessages);
    });

    it('calls props.fetchMessages() when component updates', () => {
        component.setProps({match:{path: '/outbox'}});
        expect(fetchMessages.mock.calls[2][0]).toEqual('/outbox');
    });
});
