import { NoPage } from "pages";
import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';

test('No page should render', async () => {
    render(<NoPage />);
    expect(await screen.findByText(/page not found/i)).toBeInTheDocument();
});