import React from "react";
import { ListPosts } from "components";

// Page for showing users own posts
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