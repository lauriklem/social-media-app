import React from "react";
import { PostContainer, PostText, PostTitle, TextLink, UserLink } from "./Post.styles";
import { formatDate } from "utils/dateUtils";

export default function Post({ content, username, created, short }) {
    const formattedDate = formatDate(created);

    let trimmedContent = content;
    if (short) {
        trimmedContent = trimmedContent.substring(0, 300) + "...";
    }

    return (
        <PostContainer>
            <PostTitle>
                <UserLink><em>{username}</em></UserLink> on {formattedDate}</PostTitle>
            <TextLink>
                <PostText>{trimmedContent}</PostText>
            </TextLink>
        </PostContainer>
    );
}