import React from 'react';
import { MainContent, Title } from 'components';

// Home page of the app (before logging in)
export default function Welcome() {
    return (
        <MainContent>
            <Title>This is the welcome/about page</Title>
            <p>Some information about the app could be given here.</p>
        </MainContent>
    );
}