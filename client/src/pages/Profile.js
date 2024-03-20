import React from "react";
import { Route, Routes } from 'react-router-dom';
import { MainContent, Sidebar, SideBySide } from "components";
import { ViewProfile, ChangeUsername, ChangePassword, DeleteAccount } from 'pages';

// Parent page for current user's profile pages
export default function Profile({ cookies, setUser, setLoginToken, deleteLoginToken, removeUser, serverUrl }) {

    const links = [
        {
            to: '/profile',
            text: "View profile"
        },
        {
            to: 'changeusername',
            text: "Change username"
        },
        {
            to: 'changepassword',
            text: "Change password"
        },
        {
            to: 'deleteaccount',
            text: "Delete account"
        },

    ];

    return (
        <MainContent>
            <SideBySide>
                <Sidebar links={links} />
                <Routes>
                    <Route path="/"
                        element={<ViewProfile cookies={cookies} />}
                    />
                    <Route path="changeusername"
                        element={
                            <ChangeUsername
                                cookies={cookies}
                                setUser={setUser}
                                setLoginToken={setLoginToken}
                                serverUrl={serverUrl}
                            />} />
                    <Route path="changepassword"
                        element={<ChangePassword cookies={cookies} serverUrl={serverUrl}/>} />
                    <Route path="changepassword"
                        element={<ChangePassword cookies={cookies} serverUrl={serverUrl}/>} />
                    <Route path="deleteaccount"
                        element={
                            <DeleteAccount
                                cookies={cookies}
                                deleteLoginToken={deleteLoginToken}
                                removeUser={removeUser}
                                serverUrl={serverUrl}
                            />} />
                </Routes>
            </SideBySide>
        </MainContent>
    );
};