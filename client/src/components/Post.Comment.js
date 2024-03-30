import React from "react";
import { CommentContainer, CommentTitle, CommentContent } from "./Post.Comment.styles";
import { UserLink } from "./Post.styles";

// Component that shows content of one comment
export default function Comment({ username, content }) {
    return (
        <CommentContainer>
            <CommentTitle>
                <UserLink>{username}</UserLink>:
            </CommentTitle>
            <CommentContent>{content}</CommentContent>
        </CommentContainer>
    );
}