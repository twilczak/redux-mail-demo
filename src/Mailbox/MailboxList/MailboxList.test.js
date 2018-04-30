import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

import { MemoryRouter } from 'react-router-dom';
import { MailboxList } from './MailboxList';

describe( MailboxList, () => {
    const messages = [{id: '123', dateSent: '2017.11.06', sender: 'testSender', recipient: 'testUser', subject: 'testing'}];

    it('renders and matches the snapshot', () => {
        const component = renderer.create(
            <MemoryRouter>
                <MailboxList match={{path: '/inbox'}} messages={messages}/>
            </MemoryRouter>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    describe('/inbox', () => {
        const component = mount(
            <MemoryRouter>
                <MailboxList match={{path: '/inbox'}} messages={messages}/>
            </MemoryRouter>
        );

        it('renders the mailbox headers', () => {
            const headers = component.find('.mailbox-list-header');
            expect(headers.find('.sender').text()).toContain('Sender');
            expect(headers.find('.subject').text()).toContain('Subject');
            expect(headers.find('.date-sent').text()).toContain('Date');
        });

        it('renders message contents', () => {
            const messageItem = component.find('.mailbox-list-item');
            expect(messageItem.find('.sender').text()).toContain('testSender');
            expect(messageItem.find('.subject').text()).toContain('testing');
            expect(messageItem.find('.date-sent').text()).toContain('2017.11.06');
        });
    });

    describe('/outbox', () => {
        const component = mount(
            <MemoryRouter>
                <MailboxList match={{path: '/outbox'}} messages={messages}/>
            </MemoryRouter>
        );

        it('renders the mailbox headers', () => {
            const headers = component.find('.mailbox-list-header');
            expect(headers.find('.recipient').text()).toContain('To');
            expect(headers.find('.subject').text()).toContain('Subject');
            expect(headers.find('.date-sent').text()).toContain('Date');
        });

        it('renders message contents', () => {
            const messageItem = component.find('.mailbox-list-item');
            expect(messageItem.find('.recipient').text()).toContain('testUser');
            expect(messageItem.find('.subject').text()).toContain('testing');
            expect(messageItem.find('.date-sent').text()).toContain('2017.11.06');
        });
    });

});