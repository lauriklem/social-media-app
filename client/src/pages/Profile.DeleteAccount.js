import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, InputLabel, FormWrapper, Form, FormButton, Title, Dialog, CheckboxWrapper, InfoLabel, CenteredText } from 'components';

export default function DeleteUser({ cookies, deleteLoginToken, removeUser, serverUrl }) {
    const navigate = useNavigate();

    // User has agreed to delete
    const [agreed, setAgreed] = useState(false);

    // Dialog open or not
    const [dialogOpen, setDialogOpen] = useState(false);

    // Deleting account
    const [deleting, setDeleting] = useState(false);

    // Info text
    const [errorInfo, setErrorInfo] = useState("");

    const handleCheckClick = () => {
        setAgreed(prev => !prev);
    };

    const handleCheckChange = () => {};

    const handleBtnClick = () => {
        if (agreed) {
            setDialogOpen(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
    };

    const handleDialogClose = async (e) => {
        e.preventDefault()
        setDialogOpen(false);
        if (e.target.returnValue === "Delete") {
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + cookies['login-token'],
                },
            };
            try {
                setDeleting(true);
                const result = await fetch(serverUrl + "users/" + cookies['username'], requestOptions);
                const response = await result.json();
                if (response.success) {
                    deleteLoginToken();
                    removeUser();
                    navigate('/');
                } else {
                    setErrorInfo("Something went wrong while deleting account");
                }
            } catch (err) {
                setErrorInfo("Something went wrong while deleting account");
            } finally {
                setDeleting(false);
            }
        }
    };

    return (
        <>
            <FormWrapper>
                <Title>Delete account</Title>
                {deleting ? <CenteredText>Deleting account...</CenteredText> :
                    <Form action='' onSubmit={handleSubmit}>
                        <InputLabel>Note: Deleting your account will permanently delete all posts, comments, etc. done by you.</InputLabel>
                        <CheckboxWrapper>
                            <Input type='checkbox'
                                name='agree'
                                id='agree'
                                checked={agreed}
                                onClick={handleCheckClick}
                                onChange={handleCheckChange}
                            />
                            <InputLabel htmlFor='agree'>I understand, I want to delete my account.</InputLabel>
                        </CheckboxWrapper>
                        <FormButton disabled={!agreed} onClick={handleBtnClick}>Delete account</FormButton>
                        {errorInfo.length > 0 ? <InfoLabel>{errorInfo}</InfoLabel> : null}
                    </Form>}
            </FormWrapper>
            <Dialog
                open={dialogOpen}
                handleClose={handleDialogClose}
                title="Delete account?"
                text="This action is final, and you cannot get your account back."
                confirmText="Delete"
                cancelText="Cancel"
            />
        </>
    );
}