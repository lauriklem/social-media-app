import { SignOut } from "pages";
import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom'; // have to wrap links inside a router

test('Sign out should render', async () => {
    render(
        <BrowserRouter>
            <SignOut deleteLoginToken={() => {}} removeUser={() => {}} />
        </BrowserRouter>
    );

    expect(await screen.findByText(/are you sure/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument();
});

test('Signing out should use given functions', () => {
    const deleteLoginToken = jest.fn();
    const removeUser = jest.fn();

    render(
        <BrowserRouter>
            <SignOut deleteLoginToken={deleteLoginToken} removeUser={removeUser} />
        </BrowserRouter>
    );

    userEvent.click(screen.getByRole('button', { name: /sign out/i }));
    expect(deleteLoginToken).toHaveBeenCalledTimes(1);
    expect(removeUser).toHaveBeenCalledTimes(1);
});