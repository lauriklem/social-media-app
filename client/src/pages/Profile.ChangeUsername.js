import React, { useState, useEffect } from "react";
import { FormWrapper, Form, InfoLabel, FormButton, Input, InputLabel, Title, CenteredText } from 'components';
import { validateUsername, checkNameAvailable } from 'utils/validateUserInfo';
import { url as serverUrl } from 'connection';

export default function ChangeUsername({ cookies, setUser, setLoginToken }) {
    // Input field
    const [username, setUsername] = useState('');
    const [usernameInputVisited, setUsernameInputVisited] = useState(false);

    // Info texts
    const [usernameInfo, setUsernameInfo] = useState("");
    const [errorInfo, setErrorInfo] = useState("");
    const [successText, setSuccessText] = useState("");

    // Changing username
    const [changing, setChanging] = useState(false);

    const handleUsername = (e) => {
        setUsername(e.target.value);
        setErrorInfo("");
    };

    const handleUsernameFocus = () => {
        setUsernameInputVisited(true);
    };

    const handleUsernameBlur = async () => {
        if (username.length > 0) {
            try {
                const available = await checkNameAvailable(username);
                if (available) {
                    setUsernameInfo("");
                } else {
                    setUsernameInfo("Username is already in use");
                }
            } catch (err) {
                setUsernameInfo("Error checking username availability");
            }
        }
    };

    useEffect(() => {
        if (usernameInputVisited) {
            const validstr = validateUsername(username);
            if (validstr === "") {
                setUsernameInfo("");
            } else {
                setUsernameInfo("Username doesn't fulfill the following requirements:\n" + validstr);
            }
        }
    }, [username, usernameInputVisited]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username.length > 0 && usernameInfo === "") {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + cookies['login-token'],
                },
                body: JSON.stringify({
                    "oldUsername": cookies['username'],
                    "newUsername": username,
                }),
            };
            try {
                setChanging(true);
                const result = await fetch(serverUrl + "users", requestOptions);
                const response = await result.json();
                if (response.success) {
                    setLoginToken(response.token);
                    setUser(username);
                    setSuccessText("Username changed successfully");
                } else {
                    setErrorInfo("Something went wrong while changing username");
                }
            } catch (err) {
                setErrorInfo("Something went wrong while changing username");
            } finally {
                setChanging(false);
            }
        }
    };

    return (
        <FormWrapper>
            <Title>Change username</Title>
            {changing ? <CenteredText>Changing username...</CenteredText> :
                successText.length > 0 ? <CenteredText>{successText}</CenteredText> :
                    <Form action='' onSubmit={handleSubmit}>
                        <InputLabel htmlFor='username'>New username</InputLabel>
                        <Input type='text'
                            name='username'
                            id='username'
                            required
                            value={username}
                            onChange={handleUsername}
                            onFocus={handleUsernameFocus}
                            onBlur={handleUsernameBlur}
                            maxLength="15"
                        />
                        {usernameInfo.length > 0 ? <InfoLabel>{usernameInfo}</InfoLabel> : null}
                        <FormButton type='submit' >Change username</FormButton>
                        {errorInfo.length > 0 ? <InfoLabel>{errorInfo}</InfoLabel> : null}
                    </Form>
            }
        </FormWrapper>
    );
}