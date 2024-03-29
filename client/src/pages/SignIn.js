import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainContent, Input, InputLabel, FormWrapper, Form, InfoLabel, FormButton, Title, CenteredText } from 'components';

// Page for signing/logging in
export default function SignIn({ setLoginToken, setUser, serverUrl }) {
    const navigate = useNavigate();
    // Input fields
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Info text
    const [errorInfo, setErrorInfo] = useState("");

    // Signing in
    const [signing, setSigning] = useState(false);

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    // Sign in to the app, server returns login token
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username.length > 0 && password.length > 0) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "username": username, "password": password }),
            };
            try {
                setSigning(true)
                const result = await fetch(serverUrl + "login", requestOptions);
                const response = await result.json();
                if (response.success) {
                    // Set login token and username, then navigate to home of the app
                    setLoginToken(response.token);
                    setUser(username);
                    navigate('/');
                } else {
                    setErrorInfo("Incorrect username or password");
                }
            } catch (err) {
                setErrorInfo("Something went wrong while logging in");
            } finally {
                setSigning(false);
            }
        }
    };

    return (
        <MainContent>
            <Title>Sign in</Title>
            <FormWrapper>
                {signing ? <CenteredText>Signing in...</CenteredText> :
                    <Form action='' onSubmit={handleSubmit}>
                        <InputLabel htmlFor='username'>Username</InputLabel>
                        <Input type='text'
                            name='username'
                            id='username'
                            required
                            value={username}
                            onChange={handleUsername}
                            maxLength="15"
                        />

                        <InputLabel htmlFor='password'>Password</InputLabel>
                        <Input type='password'
                            name='password'
                            id='password'
                            required
                            value={password}
                            onChange={handlePassword}
                            maxLength="20"
                        />
                        <FormButton type='submit'>Sign in</FormButton>
                        {errorInfo.length > 0 ? <InfoLabel>{errorInfo}</InfoLabel> : null}
                    </Form>
                }
            </FormWrapper>
        </MainContent>
    );
}