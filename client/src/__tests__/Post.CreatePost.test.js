import { CreatePost } from "pages";
import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from "react-dom/test-utils";

afterEach(() => {
    jest.clearAllMocks();
});

test('Create post should render', async () => {
    render(<CreatePost cookies={[]} serverUrl={""} />);

    expect(await screen.findByText(/reate new post/i)).toBeInTheDocument();
    expect(await screen.findByText(/title/i)).toBeInTheDocument();
    expect(await screen.findByText(/send/i)).toBeInTheDocument();
});

test('Creating post succeeds', async () => {
    global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ success: true }), });

    render(<CreatePost cookies={[]} serverUrl={""} />);

    userEvent.type(screen.getByLabelText(/title/i), 'title of post');
    userEvent.type(screen.getByLabelText(/post/i), 'content');

    await act(async () => {
        userEvent.click(screen.getByRole('button', { name: /send/i }));
    });

    expect(await screen.findByText(/new post created/i)).toBeInTheDocument();
});

test('Creating post succeeds', async () => {
    global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ success: false }), });

    render(<CreatePost cookies={[]} serverUrl={""} />);

    userEvent.type(screen.getByLabelText(/title/i), 'title of post');
    userEvent.type(screen.getByLabelText(/post/i), 'content');

    await act(async () => {
        userEvent.click(screen.getByRole('button', { name: /send/i }));
    });

    expect(screen.queryByText(/new post created/i)).not.toBeInTheDocument();
    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
});