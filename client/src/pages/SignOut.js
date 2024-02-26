import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainContent, InputLabel, FormWrapper, Form, FormButton, Title } from 'components';

export default function SignOut(props) {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        props.deleteLoginToken();
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