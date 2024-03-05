import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { Sidebar } from "components";
import { BrowserRouter } from 'react-router-dom'; // have to wrap links inside a router

test('Sidebar should render with given links', () => {
    render(
        <BrowserRouter>
            <Sidebar
                links={[
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