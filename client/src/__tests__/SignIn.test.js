import { SignIn } from "pages";
import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'; // have to wrap links inside a router
import { act } from "react-dom/test-utils";

afterEach(() => {
    jest.clearAllMocks();
});

test('Signin should render', () => {
    render(
        <BrowserRouter>
            <SignIn serverUrl={''} setLoginToken={(token) => { }} setUser={(username) => { }} />
        </BrowserRouter>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('Sign in is successful (server returns success)', async () => {
    global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ success: true }), });

    render(
        <BrowserRouter>
            <SignIn serverUrl={''} setLoginToken={(token) => { }} setUser={(username) => { }} />
        </BrowserRouter>
    );

    userEvent.type(screen.getByLabelText(/username/i), 'user');
    userEvent.type(screen.getByLabelText(/^password$/i), 'Password123');
    await act(async () => {
        userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    });
    expect(screen.queryByText(/incorrect username/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
});

test('Sign in is not successful (server returns not success)', async () => {
    global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ success: false }), });

    render(
        <BrowserRouter>
            <SignIn serverUrl={''} setLoginToken={(token) => { }} setUser={(username) => { }} />
        </BrowserRouter>
    );

    userEvent.type(screen.getByLabelText(/username/i), 'user');
    userEvent.type(screen.getByLabelText(/^password$/i), 'Password123');
    await act(async () => {
        userEvent.click(screen.getByRole('button', { name: /sign in/i }));
    });
    expect(await screen.findByText(/incorrect username/i)).toBeInTheDocument();
});