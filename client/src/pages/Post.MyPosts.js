import React from "react";
import ListPosts from "./Post.ListPosts";

// Home page of the app (after logging in), shows list of posts
export default function MyPosts({ cookies, serverUrl }) {
    return (
        <ListPosts
            cookies={cookies}
            serverUrl={serverUrl}
            username={cookies['username']}
            buttons={true}
        />
    );
}