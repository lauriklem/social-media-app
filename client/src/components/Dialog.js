import React, { useEffect, createRef } from "react";
import { DialogForm, DialogContainer, DialogButton, DialogTitle, DialogText, BtnContainer } from "./Dialog.styles";

// Dialog component
export default function Dialog({ open, handleClose, title, text, confirmText, cancelText }) {
    const dialogRef = createRef();

    // Opens of closes dialog (modal)
    useEffect(() => {
        const dialogComponent = dialogRef.current;
        if (dialogComponent) {
            if (open) {
                dialogComponent.showModal();
            } else {
                dialogComponent.close();
            }
        }
    }, [open, dialogRef])

    return (
        <DialogContainer onClose={handleClose} ref={dialogRef}>
            <DialogForm method="dialog">
                <DialogTitle>{title}</DialogTitle>
                <DialogText>{text}</DialogText>
                <BtnContainer>
                    <DialogButton value={cancelText} autoFocus>{cancelText}</DialogButton>
                    <DialogButton value={confirmText}>{confirmText}</DialogButton>
                </BtnContainer>
            </DialogForm>
        </DialogContainer>
    );
}