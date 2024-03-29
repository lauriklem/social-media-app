import React, { useEffect, useState } from "react";
import { PostContainer, PostText, PostTitle, UserLink } from "./Post.styles";
import { formatDate } from "utils/dateUtils";
import { SmallButton, ButtonContainer } from "./Button";
import EditPost from "./Post.EditPost";

// Post component, shows information of one post
export default function Post({ cookies, serverUrl, content, username, created, short, buttons, postid }) {
    // Trim content that is longer than 300 characters
    const trimLimit = 300;

    // Content of the post
    const [trimmedContent, setTrimmedContent] = useState("");

    // Show only part of text
    const [doTrim, setDoTrim] = useState(short);

    // Shown title when hovering mouse over text
    const [hoverTitle, setHoverTitle] = useState("");

    const [editing, setEditing] = useState(false);

    // Change the visible content if user clicks the text
    const handleTextClick = () => {
        setDoTrim(prev => !prev);
    };

    // Cancel editing
    const handleCancelEdit = () => {
        setEditing(false);
    };

    // Formatted date
    const formattedDate = formatDate(created);

    // Title text
    let postTitle = null;
    if (username) {
        postTitle = <><UserLink><em>{username}</em></UserLink> on {formattedDate}</>;
    } else {
        postTitle = formattedDate;
    }

    // Change the visible content if user clicks the text
    useEffect(() => {
        let cnt = content;
        if (cnt.length > trimLimit) {
            if (doTrim) {
                cnt = content.substring(0, trimLimit) + "... (Click to see more)";
                setHoverTitle("Show more");
            } else {
                setHoverTitle("Show less");
            }
        }
        setTrimmedContent(cnt);
    }, [doTrim, content, hoverTitle]);

    return (
        <PostContainer>
            {editing ?
                <EditPost
                    cookies={cookies}
                    serverUrl={serverUrl}
                    content={content}
                    postid={postid}
                    handleCancel={handleCancelEdit}
                />
                :
                <>
                    <PostTitle>
                        {postTitle}
                    </PostTitle>

                    <PostText onClick={handleTextClick} title={hoverTitle}>{trimmedContent}</PostText>
                    {
                        buttons && !editing ?
                            <ButtonContainer>
                                <SmallButton onClick={() => setEditing(true)}>Edit</SmallButton>
                                <SmallButton>Delete</SmallButton>
                            </ButtonContainer>
                            : null
                    }
                </>
            }
        </PostContainer>
    );
}