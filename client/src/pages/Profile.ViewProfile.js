import React from "react";
import { Title } from "components";

// Page for viewing your own profile information
export default function ViewProfile({ cookies, serverUrl }) {
    return (
        <>
            <Title>{cookies['username']}</Title>
        </>
    );
}