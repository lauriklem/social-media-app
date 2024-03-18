import React, { useEffect, useState } from "react";
import { MainContent, Post, InfoLabel, CenteredText } from "components";

export default function Home({ cookies, serverUrl }) {
    const [posts, setPosts] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [errorInfo, setErrorInfo] = useState("");

    const postList = posts.map((p, index) => {
        return <Post
            key={index + p.username}
            username={p.username}
            content={p.content}
            created={p.created}
            short={true}
        />
    });

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
                const result = await fetch(serverUrl + "posts", requestOptions);
                const response = await result.json();
                if (response.success) {
                    setPosts(response.data)
                } else {
                    setErrorInfo("Something went wrong while fetching posts");
                }
            } catch (err) {
                setErrorInfo("Something went wrong while fetching posts");
            } finally {
                setFetching(false);
            }
        }
        fetchPosts();
    }, [serverUrl, cookies]);

    return (
        <MainContent>
            {errorInfo.length > 0 ? <InfoLabel>{errorInfo}</InfoLabel> : 
            fetching ? <CenteredText>Loading...</CenteredText> :
                postList
            }
        </MainContent>
    );
}