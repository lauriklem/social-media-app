import { Comment } from "components";
import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // have to wrap links inside a router

test('Comment should render', async () => {
    render(
        <BrowserRouter>
            <Comment username={'username'} content={'content'} />
        </BrowserRouter>
    );
    expect(await screen.findByText(/username/i)).toBeInTheDocument();
    expect(await screen.findByText(/content/i)).toBeInTheDocument();
});