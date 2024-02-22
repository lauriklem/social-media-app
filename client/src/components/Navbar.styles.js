import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import colors from 'styles/colors';

export const Navbar = styled.nav`
    background: ${colors.tertiary};
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
`;

export const Navbtn = styled(NavLink)`
    display: flex;
    align-items: center;
    margin: 0 10px;
    font-size: large;
    text-decoration: none;
    color: white;
    height: 100%;
    width: 100px;
    justify-content: center;
    
    &.${props => props.isactivenav} {
        background: ${colors.secondary};
  }
`;

export const NavbtnWrapper = styled.div`
    height: 100%;
    display: flex;
`;