import styled from 'styled-components';
import colors from 'styles/colors';
import { NavLink } from 'react-router-dom';

// Styles of the sidebar component
export const SidebarWrapper = styled.div`
    min-width: 300px;
`;

export const LinkWrapper = styled.div`
    display: grid;
    margin: 50px 30px 0;
`;

export const SidebarLink = styled(NavLink)`
    display: flex;
    align-items: center;
    margin: 20px 10px;
    font-size: large;
    text-decoration: none;
    color: ${colors.darkgray};
    justify-content: center;
    
    &.${props => props.isactivenav} {
        color: ${colors.primary};
        text-decoration: underline;
  }
`;