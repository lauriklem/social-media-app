import React from "react";
import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { Dialog } from "components";

// To make modal work
beforeAll(() => {
    HTMLDialogElement.prototype.show = jest.fn();
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

test('Dialog should render with texts', async () => {
    const { getByText } = render(
        <Dialog
            open={true}
            handleClose={() => {}}
            title="Title"
            text="Text"
            confirmText="Confirm"
            cancelText="Cancel"
        />);
    const title = getByText('Title');
    const text = getByText('Text');
    const confirm = getByText('Confirm');
    const cancel = getByText('Cancel');
    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(confirm).toBeInTheDocument();
    expect(cancel).toBeInTheDocument();
});