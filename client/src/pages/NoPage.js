import React from 'react';
import { MainContent, Title } from 'components';

// This page is shown when no other page is found
export default function NoPage() {
    return (
        <MainContent>
            <Title>Page not found.</Title>
        </MainContent>
    );
}
