import React from 'react';
import { render } from 'enzyme';

import { MemoryRouter } from 'react-router-dom';

import App from './App';

it('renders without crashing', () => {

    render (
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
});
