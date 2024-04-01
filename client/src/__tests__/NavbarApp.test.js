import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { NavbarApp } from "components";
import { BrowserRouter } from 'react-router-dom'; // have to wrap links inside a router

test('Navbar should render with given navlinks', () => {
    render(
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

    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
})