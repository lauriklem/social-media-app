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
];

const commentData = [
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

test('Post should render', async () => {
    render(
        <BrowserRouter>
            <Post
                cookies={{}}
                serverUrl={''}
                contentArray={contentArray}
                created={'year-month-dayTtime'}
                username={'username'}
                short={true}
                buttons={false}
                postid={''}
            />
        </BrowserRouter>);

    expect(await screen.findByText(/first content/i)).toBeInTheDocument();
    expect(await screen.findByText(/second content/i)).toBeInTheDocument();
    expect(await screen.findByText(/username/i)).toBeInTheDocument();
    expect(await screen.findByText(/year/i)).toBeInTheDocument();
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

test('Post should render without username', async () => {
    render(
        <BrowserRouter>
            <Post
                cookies={{}}
                serverUrl={''}
                contentArray={contentArray}
                created={'year-month-dayTtime'}
                short={true}
                buttons={false}
                postid={''}
            />
        </BrowserRouter>);

    expect(await screen.findByText(/first content/i)).toBeInTheDocument();
    expect(await screen.findByText(/second content/i)).toBeInTheDocument();
    expect(await screen.findByText(/month/i)).toBeInTheDocument();
});

test('Post content functionality with long content', async () => {
    global.fetch = () => Promise.resolve({ json: () => Promise.resolve({ success: true, data: commentData }), });
    contentArray[1] = { ctype: 'text', content: "word ".repeat(1000) + " test" };

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
    expect(await screen.findByText(/click to see/i)).toBeInTheDocument();
    expect(screen.queryByText(/test/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/second comment/i)).not.toBeInTheDocument();

    await act(async () => {
        userEvent.click(await screen.findByText(/word/i));
    });

    expect(await screen.findByText(/test/i)).toBeInTheDocument();
    expect(await screen.findByText(/second comment/i)).toBeInTheDocument();
    expect(screen.queryByText(/click to see/i)).not.toBeInTheDocument();

    await act(async () => {
        userEvent.click(await screen.findByText(/test/i));
    });

    expect(screen.queryByText(/test/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/second comment/i)).not.toBeInTheDocument();
    expect(await screen.findByText(/click to see/i)).toBeInTheDocument();
});

test('Post editing', async () => {
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

    await act(async () => {
        userEvent.click(await screen.findByText(/edit/i));
    });

    expect(screen.getByRole('textbox', { name: /post/i })).toBeInTheDocument();
});