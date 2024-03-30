import React, { useEffect, useState } from "react";
import { PostContainer, PostText, PostTitle, UserLink, PostInfo, InfoContainer, ContentContainer, CommentsContainer } from "./Post.styles";
import { formatDate } from "utils/dateUtils";
import { SmallButton, ButtonContainer } from "./Button";
import EditPost from "./Post.EditPost";
import ListComments from "./Post.ListComments";

// Post component, shows information of one post
export default function Post({ cookies, serverUrl, contentArray, username, created, short, buttons, postid }) {
    // Trim content that is longer than 300 characters
    const trimLimit = 300;

    // Content of the post
    const [postContent, setPostContent] = useState(contentArray);
    const [trimmedContent, setTrimmedContent] = useState("");

    // Show only part of text
    const [doTrim, setDoTrim] = useState(short);

    // Shown title when hovering mouse over text
    const [hoverTitle, setHoverTitle] = useState("");

    // User is editing post
    const [editing, setEditing] = useState(false);

    // Show comments or not
    const [showComments, setShowComments] = useState(false);

    // Is fetching content or not
    const [fetching, setFetching] = useState(false);

    // Should fetch content again or not
    const [doFetch, setDoFetch] = useState(false);

    // Change the visible content if user clicks the text
    const handleTextClick = () => {
        setDoTrim(prev => !prev);
        if (username) {
            setShowComments(prev => !prev);
        }
    };

    // Cancel editing
    const handleCancelEdit = () => {
        setEditing(false);
    };

    // Formatted date
    const formattedDate = formatDate(created);

    // Title text
    let postInfo = null;
    if (username) {
        postInfo = <><UserLink>{username}</UserLink> {formattedDate}</>;
    } else {
        postInfo = formattedDate;
    }

    // Change the visible content if user clicks the text
    useEffect(() => {
        let cnt = postContent[1].content;
        if (doTrim) {
            cnt = cnt.substring(0, trimLimit) + "... \n(Click to see full post)";
            setHoverTitle("Show more");
        } else {
            setHoverTitle("Show less");
        }
        setTrimmedContent(cnt);
    }, [doTrim, postContent, hoverTitle]);

    // Fetch content again after editing
    useEffect(() => {
        const fetchPost = async () => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + cookies['login-token'],
                }
            };
            try {
                setFetching(true);
                const result = await fetch(serverUrl + `posts/${postid}`, requestOptions);
                const response = await result.json();
                if (response.success) {
                    setPostContent(response.data[0].contentArray);
                }
            } catch (err) {
            } finally {
                setFetching(false);
            }
        };
        if (doFetch) {
            fetchPost();
            setDoFetch(false);
            setEditing(false);
            setDoTrim(short);
        }
    }, [doFetch, cookies, serverUrl, postid, short]);

    return (
        <PostContainer>
            {editing ?
                <EditPost
                    cookies={cookies}
                    serverUrl={serverUrl}
                    title={postContent[0].content}
                    content={postContent[1].content}
                    postid={postid}
                    handleCancel={handleCancelEdit}
                    setDoFetch={setDoFetch}
                />
                :
                fetching ? <PostText>Loading...</PostText> :
                    <>
                        <InfoContainer>
                            <PostInfo>
                                {postInfo}
                            </PostInfo>
                        </InfoContainer>

                        <ContentContainer>
                            <PostTitle>
                                {postContent[0].content}
                            </PostTitle>
                            <PostText onClick={handleTextClick} title={hoverTitle}>{trimmedContent}</PostText>

                            {
                                buttons && !editing &&
                                <ButtonContainer>
                                    <SmallButton onClick={() => setEditing(true)}>Edit</SmallButton>
                                    <SmallButton>Delete</SmallButton>
                                </ButtonContainer>
                            }

                        </ContentContainer>
                        {showComments &&
                            <CommentsContainer>
                                <ListComments cookies={cookies} serverUrl={serverUrl} postid={postid} />
                            </CommentsContainer>}
                    </>
            }
        </PostContainer>
    );
}