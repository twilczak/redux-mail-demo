import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

import { MemoryRouter } from 'react-router-dom';
import { MailboxControls } from './MailboxControls';

describe( MailboxControls, () => {
    const component = mount(
        <MemoryRouter>
            <MailboxControls match={{path: '/inbox'}}/>
        </MemoryRouter>
    );

    it('renders and matches the snapshot', () => {
        const component = renderer.create(
            <MemoryRouter>
                <MailboxControls match={{path: '/inbox'}}/>
            </MemoryRouter>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders /inbox link', () => {
        const inboxLink = component.find('.mailbox-button').at(0);
        expect(inboxLink.text()).toContain('Inbox');
        expect(inboxLink.getDOMNode().href).toContain('/inbox');
    });

    it('renders /outbox link', () => {
        const outboxLink = component.find('.mailbox-button').at(4);
        expect(outboxLink.text()).toContain('Outbox');
        expect(outboxLink.getDOMNode().href).toContain('/outbox');
    });

    it('renders compose link', () => {
        const outboxLink = component.find('.mailbox-button').at(6);
        expect(outboxLink.text()).toContain('Compose');
        expect(outboxLink.getDOMNode().href).toContain('/inbox/compose');
    });
});