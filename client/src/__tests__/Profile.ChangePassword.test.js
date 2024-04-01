import { ChangePassword } from "pages";
import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom'; // have to wrap links inside a router

afterEach(() => {
    jest.clearAllMocks();
});

test('Change password should render', () => {
    render(
        <BrowserRouter>
            <ChangePassword cookies={{}} serverUrl='' />
        </BrowserRouter>
    );

    expect(screen.getByLabelText(/current password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
});

test('New password input with invalid input', async () => {
    render(
        <BrowserRouter>
            <ChangePassword cookies={{}} serverUrl='' />
        </BrowserRouter>
    );

    userEvent.type(screen.getByLabelText(/new password/i), 'password123');
    expect(await screen.findByText(/password doesn't fulfill/i)).toBeInTheDocument();
});

test('New password input with valid input', () => {
    render(
        <BrowserRouter>
            <ChangePassword cookies={{}} serverUrl='' />
        </BrowserRouter>
    );

    userEvent.type(screen.getByLabelText(/new password/i), 'Password123');
    expect(screen.queryByText(/password doesn't fulfill/i)).not.toBeInTheDocument();
});

test('Confirm password input with invalid input', async () => {
    render(
        <BrowserRouter>
            <ChangePassword cookies={{}} serverUrl='' />
        </BrowserRouter>
    );

    userEvent.type(screen.getByLabelText(/new password/i), 'Password123');
    userEvent.type(screen.getByLabelText(/confirm password/i), 'password123');
    expect(await screen.findByText(/passwords don't match/i)).toBeInTheDocument();
});

test('Confirm password input with valid input', async () => {
    render(
        <BrowserRouter>
            <ChangePassword cookies={{}} serverUrl='' />
        </BrowserRouter>
    );

    userEvent.type(screen.getByLabelText(/new password/i), 'Password123');
    userEvent.type(screen.getByLabelText(/confirm password/i), 'Password123');
    expect(screen.queryByText(/passwords don't match/i)).not.toBeInTheDocument();
});

test('Changing password is successful (server returns success)', async () => {
    global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ success: true }), });

    render(
        <BrowserRouter>
            <ChangePassword cookies={{}} serverUrl='' />
        </BrowserRouter>
    );
    
    userEvent.type(screen.getByLabelText(/current password/i), 'Password123');
    userEvent.type(screen.getByLabelText(/new password/i), 'Password123');
    userEvent.type(screen.getByLabelText(/confirm password/i), 'Password123');
    userEvent.click(screen.getByRole('button', { name: /change password/i }));
    expect(await screen.findByText(/password changed/i)).toBeInTheDocument();
});

test('Changing password fails (server returns not success)', async () => {
    global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ success: false }), });

    render(
        <BrowserRouter>
            <ChangePassword cookies={{}} serverUrl='' />
        </BrowserRouter>
    );
    
    userEvent.type(screen.getByLabelText(/current password/i), 'Password123');
    userEvent.type(screen.getByLabelText(/new password/i), 'Password123');
    userEvent.type(screen.getByLabelText(/confirm password/i), 'Password123');
    userEvent.click(screen.getByRole('button', { name: /change password/i }));
    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
});