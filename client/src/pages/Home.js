import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <h1>This is the home page</h1>
            <Link to="signup">Sign up</Link>
            <Link to="signin">Sign in</Link>
        </>
    );
}