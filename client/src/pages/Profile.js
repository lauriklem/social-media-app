import React from "react";
import { Route, Routes } from 'react-router-dom';
import { MainContent, Sidebar, SideBySide } from "components";
import { ViewProfile, ChangeUsername, ChangePassword, DeleteUser } from 'pages';

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
            to: 'deleteuser',
            text: "Delete user"
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
                    <Route path="deleteuser"
                        element={
                            <DeleteUser
                                cookies={cookies}
                                deleteLoginToken={deleteLoginToken}
                                removeUser={removeUser}
                            />} />
                </Routes>
            </SideBySide>
        </MainContent>
    );
};