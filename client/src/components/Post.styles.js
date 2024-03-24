import styled from "styled-components";
import colors from 'styles/colors';
import { NavLink } from 'react-router-dom';

// Styles of the post component
export const PostContainer = styled.div`
    padding: 12px;
    margin: 12px 0;
    background-color: ${colors.background};
    box-shadow: 1px 1px 2px 2px ${colors.primary};
`;

export const PostTitle = styled.p`
    font-weight: bold;
    color: ${colors.primary};
`;

export const PostText = styled.p`
    margin-top: 12px;
    white-space: pre-wrap;
    cursor: pointer;
`;

export const TextLink = styled(NavLink)`
    text-decoration: none;
    color: ${colors.darkgray};
    &:hover{
        color: ${colors.accent};
	}
`;

export const UserLink = styled(NavLink)`
    text-decoration: none;
    color: ${colors.primary};
    &:hover{
        text-decoration: underline;
	}
`;