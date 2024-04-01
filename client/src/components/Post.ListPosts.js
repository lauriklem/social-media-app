import React, { useEffect, useState } from "react";
import { MainContent, Post, InfoLabel, CenteredText } from "components";

// Component for listing posts
export default function ListPosts({ cookies, serverUrl, username }) {
    // List of posts in db
    const [posts, setPosts] = useState([]);

    // Is fetching posts or not
    const [fetching, setFetching] = useState(false);

    const [info, setInfo] = useState("");

    // Error message
    const [errorInfo, setErrorInfo] = useState("");

    // Map each post to Post component
    let postList = null;
    if (!username) {
        postList = posts.map((p, index) => {
            return <Post
                key={index + p.username}
                username={p.username}
                contentArray={p.contentArray}
                created={p.created}
                short={true}
                postid={p.postid}
                cookies={cookies}
                serverUrl={serverUrl}
            />
        });
    } else {
        postList = posts.map((p, index) => {
            return <Post
                key={index + p.username}
                contentArray={p.contentArray}
                created={p.created}
                short={true}
                buttons={true}
                postid={p.postid}
                cookies={cookies}
                serverUrl={serverUrl}
            />
        });
    };

    // Fetch all posts when page is loaded
    useEffect(() => {
        const fetchPosts = async () => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + cookies['login-token'],
                }
            };
            try {
                setFetching(true);
                let url = "";
                if (username == null) {
                    url = serverUrl + "posts";
                } else {
                    url = serverUrl + `users/${username}/posts`;
                }
                const result = await fetch(url, requestOptions);
                const response = await result.json();
                if (response.success) {
                    setPosts(response.data)
                } else {
                    setInfo("You have not made any posts yet.");
                }
            } catch (err) {
                setErrorInfo("Something went wrong while fetching posts");
            } finally {
                setFetching(false);
            }
        }
        fetchPosts();
    }, [serverUrl, cookies, username]);

    return (
        <MainContent>
            {errorInfo.length > 0 ? <InfoLabel>{errorInfo}</InfoLabel> :
                <>
                    {
                        info.length > 0 ? <CenteredText>You have not made any posts yet.</CenteredText> :
                            fetching ? <CenteredText>Loading...</CenteredText> :
                                postList
                    }
                </>
            }
        </MainContent>
    );
}