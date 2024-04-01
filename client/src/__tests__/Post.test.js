import { Post } from 'components'
import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from "react-dom/test-utils";
import { BrowserRouter } from 'react-router-dom'; // have to wrap links inside a router

const contentArray = [
    {
        ctype: 'text',
        content: "First content"
    },
    {
        ctype: 'text',
        content: "Second content"
    },
]

afterEach(() => {
    jest.clearAllMocks();
});

test('Post should render', async () => {
    render(
        <BrowserRouter>
            <Post
                cookies={{}}
                serverUrl={''}
                contentArray={contentArray}
                created={'created'}
                username={'username'}
                short={true}
                buttons={false}
                postid={''}
            />
        </BrowserRouter>);

    expect(await screen.findByText(/first content/i)).toBeInTheDocument();
    expect(await screen.findByText(/second content/i)).toBeInTheDocument();
});

test('Post buttons should render', async () => {
    render(
        <BrowserRouter>
            <Post
                cookies={{}}
                serverUrl={''}
                contentArray={contentArray}
                created={'created'}
                username={'username'}
                short={true}
                buttons={true}
                postid={''}
            />
        </BrowserRouter>);

    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
});

test('Post content functionality with long content', async () => {
    contentArray[1] = { ctype: 'text', content: "word ".repeat(1000) + " test"};

    render(
        <BrowserRouter>
            <Post
                cookies={{}}
                serverUrl={''}
                contentArray={contentArray}
                created={'created'}
                username={'username'}
                short={true}
                buttons={false}
                postid={''}
            />
        </BrowserRouter>);

    expect(await screen.findByText(/word/i)).toBeInTheDocument();
    expect(screen.queryByText(/test/i)).not.toBeInTheDocument();

    await act(async () => {
        userEvent.click(await screen.findByText(/word/i));
    });

    expect(await screen.findByText(/test/i)).toBeInTheDocument();
});