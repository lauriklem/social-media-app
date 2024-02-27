import React, { useState, useEffect } from "react";
import { FormWrapper, Form, InfoLabel, FormButton, Input, InputLabel, Title, CenteredText } from 'components';
import { validatePassword } from 'utils/validateUserInfo';
import { url as serverUrl } from 'connection';

export default function ChangePassword({ cookies }) {
    // Input fields
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');

    // User visited field
    const [pwInputVisited, setPwInputVisited] = useState(false);
    const [pwConfInputVisited, setPwConfInputVisited] = useState(false);

    // Info texts
    const [pwInfo, setPwInfo] = useState("");
    const [pwConfInfo, setPwConfInfo] = useState("");
    const [errorInfo, setErrorInfo] = useState("");
    const [successText, setSuccessText] = useState("");

    // Changing password
    const [changing, setChanging] = useState(false);

    const handleOldPassword = (e) => {
        setOldPassword(e.target.value);
    };

    const handleNewPassword = (e) => {
        setNewPassword(e.target.value);
    };

    const handlePasswordConf = (e) => {
        setPasswordConf(e.target.value);
    };

    const handlePwFocus = () => {
        setPwInputVisited(true);
    };

    const handlePwConfFocus = () => {
        setPwConfInputVisited(true);
    };

    useEffect(() => {
        if (pwInputVisited) {
            const validstr = validatePassword(newPassword);
            if (validstr === "") {
                setPwInfo("");
            } else {
                setPwInfo("Password doesn't fulfill the following requirements:\n" + validstr);
            }
        }
    }, [newPassword, pwInputVisited]);

    useEffect(() => {
        if (pwConfInputVisited) {
            if (newPassword !== passwordConf) {
                setPwConfInfo("Passwords don't match");
            } else {
                setPwConfInfo("");
            }
        }
    }, [passwordConf, pwConfInputVisited, newPassword]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (oldPassword.length > 0 && newPassword.length > 0 && passwordConf.length > 0 &&
            pwInfo === "" && pwConfInfo === "") {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + cookies['login-token'],
                },
                body: JSON.stringify({
                    "oldUsername": cookies['username'],
                    "oldPassword": oldPassword,
                    "newPassword": newPassword,
                }),
            };
            try {
                setChanging(true);
                const result = await fetch(serverUrl + "users", requestOptions);
                const response = await result.json();
                if (response.success) {
                    setSuccessText("Password changed successfully");
                } else {
                    setErrorInfo("Something went wrong while changing password");
                }
            } catch (err) {
                setErrorInfo("Something went wrong while changing password");
            } finally {
                setChanging(false);
            }
        }
    };

    return (
        <FormWrapper>
            <Title>Change password</Title>
            {changing ? <CenteredText>Changing password...</CenteredText> :
                successText.length > 0 ? <CenteredText>{successText}</CenteredText> :
                    <Form action='' onSubmit={handleSubmit}>
                        <InputLabel htmlFor='password'>Current password</InputLabel>
                        <Input type='password'
                            name='oldPassword'
                            id='oldPassword'
                            required
                            value={oldPassword}
                            onChange={handleOldPassword}
                            maxLength="20"
                        />
                        <InputLabel htmlFor='password'>New password</InputLabel>
                        <Input type='password'
                            name='newPassword'
                            id='newPassword'
                            required
                            value={newPassword}
                            onChange={handleNewPassword}
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
                        <FormButton type='submit' >Change password</FormButton>
                        {errorInfo.length > 0 ? <InfoLabel>{errorInfo}</InfoLabel> : null}
                    </Form>

            }
        </FormWrapper>
    );
}