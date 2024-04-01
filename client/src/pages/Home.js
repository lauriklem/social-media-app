import React from "react";
import { ListPosts } from "components";

// Home page of the app (after logging in), shows list of posts
export default function Home({ cookies, serverUrl }) {
    return (
        <ListPosts cookies={cookies} serverUrl={serverUrl} />
    );
}