import React, { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainContent, Input, InputLabel, FormWrapper, Form, InfoLabel, FormButton, Title, CenteredText } from 'components';
import { validatePassword, validateUsername, checkNameAvailable } from 'utils/validateUserInfo';

export default function SignUp({ serverUrl }) {
    const navigate = useNavigate();
    // Input fields
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');

    // User visited field
    const [usernameInputVisited, setUsernameInputVisited] = useState(false);
    const [pwInputVisited, setPwInputVisited] = useState(false);
    const [pwConfInputVisited, setPwConfInputVisited] = useState(false);

    // Info texts
    const [usernameInfo, setUsernameInfo] = useState("");
    const [pwInfo, setPwInfo] = useState("");
    const [pwConfInfo, setPwConfInfo] = useState("");
    const [errorInfo, setErrorInfo] = useState("");

    // Creating account
    const [creating, setCreating] = useState(false);
    const [created, setCreated] = useState(false);

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handlePasswordConf = (e) => {
        setPasswordConf(e.target.value);
    };

    const handleUsernameFocus = () => {
        setUsernameInputVisited(true);
    };

    const handlePwFocus = () => {
        setPwInputVisited(true);
    };

    const handlePwConfFocus = () => {
        setPwConfInputVisited(true);
    };

    const handleUsernameBlur = async () => {
        if (username.length > 0 && usernameInfo === "") {
            try {
                const available = await checkNameAvailable(username, serverUrl);
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

    useEffect(() => {
        if (pwInputVisited) {
            const validstr = validatePassword(password);
            if (validstr === "") {
                setPwInfo("");
            }
            else {
                setPwInfo("Password doesn't fulfill the following requirements:\n" + validstr);
            }
        }
    }, [password, pwInputVisited]);

    useEffect(() => {
        if (pwConfInputVisited) {
            if (password !== passwordConf && passwordConf.length > 0) {
                setPwConfInfo("Passwords don't match");
            } else {
                setPwConfInfo("");
            }
        }
    }, [passwordConf, pwConfInputVisited, password]);

    useEffect(() => {
        let timer;
        if (created) {
            timer = setTimeout(() => { navigate('/signin') }, 5000);
        }
        return () => clearTimeout(timer);
    }, [created, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username.length > 0 && password.length > 0 && passwordConf.length > 0 &&
            usernameInfo === "" && pwInfo === "" && pwConfInfo === "") {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "username": username, "password": password }),
            };
            try {
                setCreating(true);
                const result = await fetch(serverUrl + "users", requestOptions);
                const response = await result.json();
                if (response.success) {
                    setCreated(true);
                } else {
                    setErrorInfo("Something went wrong while creating an account");
                }
            } catch (err) {
                setErrorInfo("Something went wrong while creating an account");
            } finally {
                setCreating(false);
            }
        }
    };

    return (
        <MainContent>
            <Title>Create account</Title>
            <FormWrapper>
                {created ? <CenteredText>Account created, you are now redirected to sign in.</CenteredText> :
                    creating ? <CenteredText>Creating account...</CenteredText> :
                        <Form action='' onSubmit={handleSubmit}>
                            <InputLabel htmlFor='username'>Username</InputLabel>
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

                            <InputLabel htmlFor='password'>Password</InputLabel>
                            <Input type='password'
                                name='password'
                                id='password'
                                required
                                value={password}
                                onChange={handlePassword}
                                onFocus={handlePwFocus}
                                maxLength="20"
                            />
                            {pwInfo.length > 0 ? <InfoLabel>{pwInfo}</InfoLabel> : null}

                            <InputLabel htmlFor='passwordConf'>Confirm password</InputLabel>
                            <Input type='password'
                                name='passwordConf'
                                id='passwordConf'
                                required
                                value={passwordConf}
                                onChange={handlePasswordConf}
                                onFocus={handlePwConfFocus}
                                maxLength="20"
                            />
                            {pwConfInfo.length > 0 ? <InfoLabel>{pwConfInfo}</InfoLabel> : null}

                            <FormButton type='submit' >Sign up</FormButton>
                            {errorInfo.length > 0 ? <InfoLabel>{errorInfo}</InfoLabel> : null}
                        </Form>
                }
            </FormWrapper>
        </MainContent>
    );
}