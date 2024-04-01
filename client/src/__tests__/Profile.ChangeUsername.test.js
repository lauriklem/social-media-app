import { ChangeUsername } from "pages";
import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom'; // have to wrap links inside a router
import { act } from "react-dom/test-utils";

afterEach(() => {
    jest.clearAllMocks();
});

test('Change username should render', () => {
    render(
        <BrowserRouter>
            <ChangeUsername cookies={{}} serverUrl='' setUser={() => { }} setLoginToken={() => { }} />
        </BrowserRouter>
    );

    expect(screen.getByLabelText(/new username/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /change username/i })).toBeInTheDocument();
});

test('New username input with invalid input', async () => {
    render(
        <BrowserRouter>
            <ChangeUsername cookies={{}} serverUrl='' setUser={() => { }} setLoginToken={() => { }} />
        </BrowserRouter>
    );

    userEvent.type(screen.getByLabelText(/new username/i), 'use');
    expect(await screen.findByText(/username doesn't fulfill/i)).toBeInTheDocument();
});

test('New username input with valid input', () => {
    render(
        <BrowserRouter>
            <ChangeUsername cookies={{}} serverUrl='' setUser={() => { }} setLoginToken={() => { }} />
        </BrowserRouter>
    );

    userEvent.type(screen.getByLabelText(/new username/i), 'user');
    expect(screen.queryByText(/username doesn't fulfill/i)).not.toBeInTheDocument();
});


test('Changing username is successful (server returns success)', async () => {
    global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ success: true }), });

    render(
        <BrowserRouter>
            <ChangeUsername cookies={{}} serverUrl='' setUser={() => { }} setLoginToken={() => { }} />
        </BrowserRouter>
    );

    userEvent.type(screen.getByLabelText(/new username/i), 'user');
    userEvent.click(screen.getByRole('button', { name: /change username/i }));
    expect(await screen.findByText(/username changed/i)).toBeInTheDocument();
});

test('Changing username fails (server returns not success)', async () => {
    global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ success: false }), });

    render(
        <BrowserRouter>
            <ChangeUsername cookies={{}} serverUrl='' setUser={() => { }} setLoginToken={() => { }} />
        </BrowserRouter>
    );

    userEvent.type(screen.getByLabelText(/new username/i), 'user');
    userEvent.click(screen.getByRole('button', { name: /change username/i }));
    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
});

test('Changing username should use given functions', async () => {
    global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ success: true }), });
    const setUser = jest.fn();
    const setLoginToken = jest.fn();

    render(
        <BrowserRouter>
            <ChangeUsername cookies={{}} serverUrl='' setUser={setUser} setLoginToken={setLoginToken} />
        </BrowserRouter>
    );

    userEvent.type(screen.getByLabelText(/new username/i), 'user');

    await act(async () => {
        userEvent.click(screen.getByRole('button', { name: /change username/i }));
    });
    expect(setUser).toHaveBeenCalledTimes(1);
    expect(setLoginToken).toHaveBeenCalledTimes(1);
});