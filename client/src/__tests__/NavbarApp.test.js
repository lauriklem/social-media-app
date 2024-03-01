import React from "react";
import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { NavbarApp } from "components";
import { BrowserRouter } from 'react-router-dom'; // have to wrap links inside a router

test('Navbar should render with given navlinks', () => {
    const { getByText } = render(
        <BrowserRouter>
            <NavbarApp
                buttons={[
                    {
                        to: '/first',
                        text: 'First'
                    },
                    {
                        to: '/second',
                        text: 'Second'
                    },
                    {
                        to: '/third',
                        text: 'Third'
                    },
                ]}
            />
        </BrowserRouter>);

    const first = getByText('First');
    const second = getByText('Second');
    const third = getByText('Third');
    expect(first).toBeInTheDocument();
    expect(second).toBeInTheDocument();
    expect(third).toBeInTheDocument();
})