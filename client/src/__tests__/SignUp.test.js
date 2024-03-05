import { SignUp } from "pages";
import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'; // have to wrap links inside a router

afterEach(() => {
    jest.clearAllMocks();
});

test('Signup should render', () => {
    render(
        <BrowserRouter>
            <SignUp serverUrl={''} />
        </BrowserRouter>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
});

test('Username input with too short username', async () => {
    render(
        <BrowserRouter>
            <SignUp serverUrl={''} />
        </BrowserRouter>
    );

    userEvent.type(screen.getByLabelText(/username/i), 'use');
    expect(await screen.findByText(/username doesn't fulfill/i)).toBeInTheDocument();
});

test('Username input with valid username', () => {
    render(
        <BrowserRouter>
            <SignUp serverUrl={''} />
        </BrowserRouter>
    );

    userEvent.type(screen.getByLabelText(/username/i), 'user');
    expect(screen.queryByText(/username doesn't fulfill/i)).not.toBeInTheDocument();
});

test('Password input with invalid input', async () => {
    render(
        <BrowserRouter>
            <SignUp serverUrl={''} />
        </BrowserRouter>
    );

    userEvent.type(screen.getByLabelText(/^password$/i), 'password123');
    expect(await screen.findByText(/password doesn't fulfill/i)).toBeInTheDocument();
});

test('Password input with valid input', () => {
    render(
        <BrowserRouter>
            <SignUp serverUrl={''} />
        </BrowserRouter>
    );

    userEvent.type(screen.getByLabelText(/^password$/i), 'Password123');
    expect(screen.queryByText(/password doesn't fulfill/i)).not.toBeInTheDocument();
});

test('Confirm password input with invalid input', async () => {
    render(
        <BrowserRouter>
            <SignUp serverUrl={''} />
        </BrowserRouter>
    );

    userEvent.type(screen.getByLabelText(/^password$/i), 'Password123');
    userEvent.type(screen.getByLabelText(/confirm password/i), 'password123');
    expect(await screen.findByText(/passwords don't match/i)).toBeInTheDocument();
});

test('Confirm password input with valid input', async () => {
    render(
        <BrowserRouter>
            <SignUp serverUrl={''} />
        </BrowserRouter>
    );

    userEvent.type(screen.getByLabelText(/^password$/i), 'Password123');
    userEvent.type(screen.getByLabelText(/confirm password/i), 'Password123');
    expect(screen.queryByText(/passwords don't match/i)).not.toBeInTheDocument();
});

test('Signup is successful (server returns success)', async () => {
    global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ success: true }), });

    render(
        <BrowserRouter>
            <SignUp serverUrl={''} />
        </BrowserRouter>
    );

    userEvent.type(screen.getByLabelText(/username/i), 'user');
    userEvent.type(screen.getByLabelText(/^password$/i), 'Password123');
    userEvent.type(screen.getByLabelText(/confirm password/i), 'Password123');
    userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    expect(await screen.findByText(/account created/i)).toBeInTheDocument();
});

test('Signup fails (server returns not success)', async () => {
    global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ success: false }), });

    render(
        <BrowserRouter>
            <SignUp serverUrl={''} />
        </BrowserRouter>
    );

    userEvent.type(screen.getByLabelText(/username/i), 'user');
    userEvent.type(screen.getByLabelText(/^password$/i), 'Password123');
    userEvent.type(screen.getByLabelText(/confirm password/i), 'Password123');
    userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
});