import { DeleteAccount } from "pages";
import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // have to wrap links inside a router

afterEach(() => {
    jest.clearAllMocks();
});

// To make modal work
beforeAll(() => {
    HTMLDialogElement.prototype.show = jest.fn();
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
});

test('Delete account should render', async () => {
    render(
        <BrowserRouter>
            <DeleteAccount cookies={{}} serverUrl='' deleteLoginToken={() => { }} removeUser={() => { }} />
        </BrowserRouter>
    );

    expect(await screen.findByText(/note: deleting/i)).toBeInTheDocument();
    expect(await screen.findByText(/i understand/i)).toBeInTheDocument();
});