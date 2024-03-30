import styled from "styled-components";
import colors from 'styles/colors';
import { NavLink } from 'react-router-dom';

// Styles of the post component
export const PostContainer = styled.div`
    margin: 12px 0;
    background-color: ${colors.background};
    box-shadow: 1px 1px 2px 3px ${colors.accent};
`;

export const InfoContainer = styled.div`
    border-bottom: 2px solid ${colors.accent};
`;

export const PostInfo = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px;
    font-size: large;
    font-weight: bold;
    color: ${colors.primary};
`;

export const ContentContainer = styled.div`
    padding: 12px;
`;

export const PostTitle = styled.p`
    font-weight: bold;
    color: ${colors.accent};
`;

export const PostText = styled.p`
    white-space: pre-wrap;
    cursor: pointer;
`;

export const UserLink = styled(NavLink)`
    text-decoration: none;
    font-style: italic;
    font-weight: bold;
    color: ${colors.primary};
    &:hover{
        text-decoration: underline;
	}
`;

export const CommentsContainer = styled.div`
    padding: 12px;
`;