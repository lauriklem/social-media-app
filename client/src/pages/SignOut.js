import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainContent, InputLabel, FormWrapper, Form, FormButton, Title } from 'components';

// Page for signing out
export default function SignOut({ deleteLoginToken, removeUser }) {
    const navigate = useNavigate();

    // Sings the user out, deletes login token and removes user from cookies
    const handleSubmit = (e) => {
        e.preventDefault();
        deleteLoginToken();
        removeUser();
        navigate('/signoutsuccess');
    };

    return (
        <MainContent>
            <Title>Sign out</Title>
            <FormWrapper>
                <Form action='' onSubmit={handleSubmit}>
                    <InputLabel>Are you sure you want to sign out?</InputLabel>
                    <FormButton type='submit'>Sign out</FormButton>
                </Form>
            </FormWrapper>
        </MainContent>
    );
}