import { ListPosts } from "components";
import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // have to wrap links inside a router

const data = [
    {
        username: 'user1',
        created: 'created1',
        postid: 'postid1',
        contentArray: [
            {
                ctype: 'text',
                content: 'First title'
            },
            {
                ctype: 'text',
                content: 'First content'
            },
        ]
    },
    {
        username: 'user2',
        created: 'created2',
        postid: 'postid2',
        contentArray: [
            {
                ctype: 'text',
                content: 'Second title'
            },
            {
                ctype: 'text',
                content: 'Second content'
            },
        ]
    }
]

afterEach(() => {
    jest.clearAllMocks();
});

test('ListPosts should render posts', async () => {
    global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ success: true, data: data }), });

    render(
        <BrowserRouter>
            <ListPosts cookies={{}} serverUrl={''} />
        </BrowserRouter>);

    expect(await screen.findByText(/first title/i)).toBeInTheDocument();
    expect(await screen.findByText(/first content/i)).toBeInTheDocument();
    expect(await screen.findByText(/user1/i)).toBeInTheDocument();
    expect(await screen.findByText(/second title/i)).toBeInTheDocument();
    expect(await screen.findByText(/second content/i)).toBeInTheDocument();
});

test('Server returns not success', async () => {
    global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ success: false }), });

    render(
        <BrowserRouter>
            <ListPosts cookies={{}} serverUrl={''} />
        </BrowserRouter>);

    expect(await screen.findByText(/did not find/i)).toBeInTheDocument();
});

test('Server returns not success', async () => {
    global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ success: false }), });

    render(
        <BrowserRouter>
            <ListPosts cookies={{}} serverUrl={''} username={'username'}/>
        </BrowserRouter>);

    expect(await screen.findByText(/you have not/i)).toBeInTheDocument();
});