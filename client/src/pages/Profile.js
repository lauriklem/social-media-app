import React, { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import { MainContent, Title, Sidebar, SideBySide } from "components";
import ViewProfile from './ViewProfile';
import ChangeUsername from "./ChangeUsername";
import ChangePassword from "./ChangePassword";

export default function Profile({ cookies, setUser }) {

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
    ];

    return (
        <MainContent>
            <SideBySide>
                <Sidebar links={links} />
                <Routes>
                    <Route path="/" element={<ViewProfile cookies={cookies}/>} />
                    <Route path="changeusername" element={<ChangeUsername cookies={cookies} setUser={setUser}/>} />
                    <Route path="changepassword" element={<ChangePassword cookies={cookies}/>} />
                </Routes>
            </SideBySide>
        </MainContent>
    );
};