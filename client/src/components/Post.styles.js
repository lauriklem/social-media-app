import styled from "styled-components";
import colors from 'styles/colors';
import { NavLink } from 'react-router-dom';

export const PostContainer = styled.div`
    padding: 10px;
    margin: 8px 0;
    border: 2px solid ${colors.accent};
`;

export const PostTitle = styled.p`
    font-weight: bold;
    color: ${colors.primary};
`;

export const PostText = styled.p`
    margin-top: 10px;
    white-space: pre-wrap;
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