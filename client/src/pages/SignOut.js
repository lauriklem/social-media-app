import React, { useState } from 'react';
import { MainContent, Input, InputLabel, FormWrapper, Form, InfoLabel, FormButton, Title } from 'components';

export default function SignOut() {
    return (
        <MainContent>
            <Title>Sign out</Title>
            <FormWrapper>
                <Form action='' onSubmit={handleSubmit}>
                    <InputLabel htmlFor=''>Are you sure you want to sign out?</InputLabel>
                    <FormButton type='submit' >Sign out</FormButton>
                </Form>
            </FormWrapper>
        </MainContent>
    );
}