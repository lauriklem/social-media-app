import { ListComments } from "components";
import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // have to wrap links inside a router

const data = [
    {
        username: 'user1',
        created: 'created1',
        postid: 'postid1',
        content: 'first comment',
        commentid: 1
    },
    {
        username: 'user2',
        created: 'created2',
        content: 'second comment',
        commentid: 2
    }
];

afterEach(() => {
    jest.clearAllMocks();
});

test('ListComments should render comments', async () => {
    global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ success: true, data: data }), });

    render(
        <BrowserRouter>
            <ListComments cookies={{}} serverUrl={''} postid={''}/>
        </BrowserRouter>);

    expect(await screen.findByText(/first comment/i)).toBeInTheDocument();
    expect(await screen.findByText(/second comment/i)).toBeInTheDocument();
    expect(await screen.findByText(/user1/i)).toBeInTheDocument();
    expect(await screen.findByText(/user2/i)).toBeInTheDocument();
});

test('Server returns not success', async () => {
    global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ success: false }), });

    render(
        <BrowserRouter>
            <ListComments cookies={{}} serverUrl={''} postid={''}/>
        </BrowserRouter>);

    expect(await screen.findByText(/nobody has commented/i)).toBeInTheDocument();
});