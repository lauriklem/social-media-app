import React from "react";
import { SidebarWrapper, LinkWrapper, SidebarLink } from "./Sidebar.styles";


export default function Sidebar({ links }) {
    const navlinks = links.map((link) => {
        return <SidebarLink isactivenav="active" to={link.to} key={link.to} end >{link.text}</SidebarLink>
    });

    return (
        <SidebarWrapper>
            <LinkWrapper>
                {navlinks}
            </LinkWrapper>
        </SidebarWrapper>
    );
}