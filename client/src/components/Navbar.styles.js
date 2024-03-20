import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import colors from 'styles/colors';

// Styles of the navigation bar in the app
export const Navbar = styled.nav`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0 10px;
    margin: 0 auto 10px;
    border-bottom: 2px solid ${colors.lightgray};
`;

export const Navbtn = styled(NavLink)`
    display: flex;
    align-items: center;
    margin: 10px;
    font-size: large;
    text-decoration: none;
    color: ${colors.gray};
    height: 100%;
    justify-content: center;
    font-weight: bold;
    
    &.${props => props.isactivenav} {
        color: ${colors.primary};
    } 

    &:hover{
        color: ${colors.primary};
	}
`;

export const NavbtnWrapper = styled.div`
    height: 100%;
    display: flex;
`;