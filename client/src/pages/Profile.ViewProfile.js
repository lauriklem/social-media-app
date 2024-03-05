import React from "react";
import { Title } from "components";

export default function ViewProfile({ cookies, serverUrl }) {
    return (
        <>
            <Title>{cookies['username']}</Title>
        </>
    );
}