import { AddComment } from "components";
import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from "react-dom/test-utils";

afterEach(() => {
    jest.clearAllMocks();
});

test('Add comment should render', () => {
    render(<AddComment />);
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
});

test('Adding comment is successful (server returns success)', async () => {
    global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ success: true }), });
    const setDoFetch = jest.fn();

    render(<AddComment cookies={{}} serverUrl={''} postid={''} setDoFetch={setDoFetch} />);

    userEvent.type(screen.getByRole('textbox'), 'comment');

    await act(async () => {
        userEvent.click(screen.getByRole('button', { name: /send/i }));
    });
    expect(setDoFetch).toHaveBeenCalledTimes(1);
});

test('Adding comment fails (server returns not success)', async () => {
    global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ success: false }), });
    const setDoFetch = jest.fn();

    render(<AddComment cookies={{}} serverUrl={''} postid={''} setDoFetch={setDoFetch} />);

    userEvent.type(screen.getByRole('textbox'), 'comment');

    await act(async () => {
        userEvent.click(screen.getByRole('button', { name: /send/i }));
    });
    expect(setDoFetch).toHaveBeenCalledTimes(0);
});