import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import { MemoryRouter, Route } from 'react-router-dom';
import { Mailbox } from "./Mailbox";

import { MailService } from "../MailService";

jest.mock('../MailService');

describe(Mailbox, () => {
    const mockMessages = [{id: 'test'}];
    const promise = new Promise((resolve, reject) => {
        resolve(mockMessages);
    });

    MailService.getMessages.mockReturnValue(promise);

    const component = shallow(
        <Mailbox match={{path: '/inbox'}}/>
    );

    it('renders and matches the snapshot', () => {
        const component = renderer.create(
            <MemoryRouter initialEntries={['/inbox']}>
                <Route path="/inbox" component={Mailbox}/>
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

    it('calls MailService.getMessages()', () => {
        expect(MailService.getMessages).toBeCalledWith('/inbox');
        expect(component.state()).toEqual({messages: [{id: 'test'}]});
    });
});
