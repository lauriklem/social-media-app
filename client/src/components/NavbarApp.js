import React from "react";
import { Navbar, Navbtn, NavbtnWrapper } from "./Navbar.styles";

// Navigation bar component on top of the screen
export default function NavbarApp({ buttons }) {
    const navButtons = buttons.map((btn) => {
        return <Navbtn isactivenav="active" to={btn.to} key={btn.to}>{btn.text}</Navbtn>
    }); 
    
    return (
        <Navbar>
            <NavbtnWrapper>
                {navButtons}
            </NavbtnWrapper>
        </Navbar>
    );
}