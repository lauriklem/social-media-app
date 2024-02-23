import React from "react";
import { Navbar, Navbtn, NavbtnWrapper } from "./Navbar.styles";

// This navigation bar is shown AFTER logging in
export default function NavbarApp() {
    return (
        <Navbar>
            <NavbtnWrapper>
                <Navbtn isactivenav="active" to="/">Home</Navbtn>
                <Navbtn isactivenav="active" to="/profile">Profile</Navbtn>
                <Navbtn isactivenav="active" to="/signout">Sign out</Navbtn>
            </NavbtnWrapper>
        </Navbar>
    );
}