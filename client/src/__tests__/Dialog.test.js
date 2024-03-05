import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { Dialog } from "components";

// To make modal work
beforeAll(() => {
    HTMLDialogElement.prototype.show = jest.fn();
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
});

test('Dialog should render with texts', async () => {
    render(
        <Dialog
            open={true}
            handleClose={() => { }}
            title="Title"
            text="Text"
            confirmText="Confirm"
            cancelText="Cancel"
        />);

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
});