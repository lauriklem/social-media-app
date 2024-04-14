import React, { useEffect, useState } from "react";
import Comment from "./Post.Comment";
import AddComment from "./Post.AddComment";
import { CommentsListTitle, CommentInfo } from "./Post.Comment.styles";

export default function ListComments({ cookies, serverUrl, postid }) {
    const [comments, setComments] = useState([]);
    const [doFetch, setDoFetch] = useState(1);
    const [fetching, setFetching] = useState(false);

    const commentList = comments.map((c, index) => {
        return <Comment
            key={index + c.commentid}
            username={c.username}
            content={c.content}
        />
    })

    // Fetch comments from db
    useEffect(() => {
        const fetchComments = async () => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + cookies['login-token'],
                }
            };
            try {
                setFetching(true);
                const result = await fetch(serverUrl + `posts/${postid}/comments`, requestOptions);
                const response = await result.json();
                if (response.success) {
                    setComments(response.data)
                }
            } catch (err) {
            } finally {
                setFetching(false);
            }
        };
        if (doFetch > 0) {
            fetchComments();
            setDoFetch(0);
        }
    }, [cookies, serverUrl, postid, doFetch]);

    return (
        <>
            <CommentsListTitle>Comments</CommentsListTitle>
            {
                fetching ? <CommentInfo>Loading comments...</CommentInfo> :
                    comments.length > 0 ? commentList : <CommentInfo>Nobody has commented this post yet.</CommentInfo>
            }
            <AddComment cookies={cookies} serverUrl={serverUrl} postid={postid} setDoFetch={setDoFetch}/>
        </>
    );
}