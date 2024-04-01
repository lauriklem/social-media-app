import { EditPost } from "components";
import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from "react-dom/test-utils";

afterEach(() => {
    jest.clearAllMocks();
});

test('EditPost should render', async () => {
    render(<EditPost
        cookies={{}}
        serverUrl={''}
        content={'content of post'}
        title={'title of post'}
        postid={''}
        handleCancel={() => { }}
        setDoFetch={() => { }}
    />);
    expect(screen.getByRole('button', { name: /accept/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(await screen.findByText(/content of post/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
});

test('Editing post is successful (server returns success)', async () => {
    global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ success: true }), });
    const setDoFetch = jest.fn();

    render(<EditPost
        cookies={{}}
        serverUrl={''}
        content={'content of post'}
        title={'title of post'}
        postid={''}
        handleCancel={() => { }}
        setDoFetch={setDoFetch}
    />);

    userEvent.type(screen.getByRole('textbox' , { name: /post/i }), 'some edited content');

    await act(async () => {
        userEvent.click(screen.getByRole('button', { name: /accept/i }));
    });
    expect(setDoFetch).toHaveBeenCalledTimes(1);
});

test('Editing post is not succesfull (server returns not success)', async () => {
    global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ success: false }), });

    render(<EditPost
        cookies={{}}
        serverUrl={''}
        content={'content of post'}
        title={'title of post'}
        postid={''}
        handleCancel={() => { }}
        setDoFetch={() => {}}
    />);

    userEvent.type(screen.getByRole('textbox' , { name: /post/i }), 'some edited content');

    await act(async () => {
        userEvent.click(screen.getByRole('button', { name: /accept/i }));
    });
    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
});

test('Editing post is cancelled', async () => {
    const handleCancel = jest.fn();

    render(<EditPost
        cookies={{}}
        serverUrl={''}
        content={'content of post'}
        title={'title of post'}
        postid={''}
        handleCancel={handleCancel}
        setDoFetch={() => { }}
    />);

    userEvent.type(screen.getByRole('textbox', { name: /post/i }), 'some edited content');

    await act(async () => {
        userEvent.click(screen.getByRole('button', { name: /cancel/i }));
    });
    expect(handleCancel).toHaveBeenCalledTimes(1);
});
