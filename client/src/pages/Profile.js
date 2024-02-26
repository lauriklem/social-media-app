import React, { useState } from "react";
import { Route, Routes, BrowserRouter } from 'react-router-dom';

export default function Profile() {
    const [editing, setEditing] = useState(false);

    return (
        <h1>Profile page</h1>
    );
};