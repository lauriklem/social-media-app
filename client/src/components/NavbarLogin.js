import React from "react";
import { Navbar, Navbtn, NavbtnWrapper } from "./Navbar.styles";

// This navigation bar is shown BEFORE logging in
export default function NavbarComponent() {
    return (
        <Navbar>
            <NavbtnWrapper>
                <Navbtn isactivenav="active" to="/">About</Navbtn>
                <Navbtn isactivenav="active" to="/signup">Sign up</Navbtn>
                <Navbtn isactivenav="active" to="/signin">Sign in</Navbtn>
            </NavbtnWrapper>
        </Navbar>
    );
}