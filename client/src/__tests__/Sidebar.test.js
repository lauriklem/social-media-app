import React from "react";
import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { Sidebar } from "components";
import { BrowserRouter } from 'react-router-dom'; // have to wrap links inside a router

test('Sidebar should render with given links', () => {
    const { getByText } = render(
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

    const first = getByText('First');
    const second = getByText('Second');
    const third = getByText('Third');
    expect(first).toBeInTheDocument();
    expect(second).toBeInTheDocument();
    expect(third).toBeInTheDocument();
})