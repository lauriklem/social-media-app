import React from "react";
import { Route, Routes } from 'react-router-dom';
import { MainContent, Sidebar, SideBySide } from "components";
import { ViewProfile, ChangeUsername, ChangePassword, DeleteAccount } from 'pages';

export default function Profile({ cookies, setUser, setLoginToken, deleteLoginToken, removeUser }) {

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
                            />} />
                    <Route path="changepassword"
                        element={<ChangePassword cookies={cookies} />} />
                    <Route path="changepassword"
                        element={<ChangePassword cookies={cookies} />} />
                    <Route path="deleteaccount"
                        element={
                            <DeleteAccount
                                cookies={cookies}
                                deleteLoginToken={deleteLoginToken}
                                removeUser={removeUser}
                            />} />
                </Routes>
            </SideBySide>
        </MainContent>
    );
};