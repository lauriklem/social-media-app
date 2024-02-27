import React from "react";
import { Title } from "components";

export default function ViewProfile({ cookies }) {
    return (
        <>
            <Title>{cookies['username']}</Title>
        </>
    );
}