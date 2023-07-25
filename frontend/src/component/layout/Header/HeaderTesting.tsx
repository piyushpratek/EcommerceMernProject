import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";

interface NavbarOptions {
    burgerColorHover: string;
    logo: string;
    logoWidth: string;
    navColor1: string;
    logoHoverSize: string;
    logoHoverColor: string;
    link1Text: string;
    link2Text: string;
    link3Text: string;
    link4Text: string;
    link1Url: string;
    link2Url: string;
    link3Url: string;
    link4Url: string;
    link1Size: string;
    link1Color: string;
    nav1justifyContent: string;
    nav2justifyContent: string;
    nav3justifyContent: string;
    nav4justifyContent: string;
    link1ColorHover: string;
    link1Margin: string;
    profileIconUrl: string;
    profileIconColor: string;
    searchIconColor: string;
    cartIconColor: string;
    profileIconColorHover: string;
    searchIconColorHover: string;
    cartIconColorHover: string;
    cartIconMargin: string;
}

const options: NavbarOptions = {
    burgerColorHover: "#eb4034",
    logo: logo,
    logoWidth: "20vmax",
    navColor1: "white",
    logoHoverSize: "10px",
    logoHoverColor: "#eb4034",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "rgba(35, 35, 35,0.8)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#eb4034",
    link1Margin: "1vmax",
    profileIconUrl: "/login",
    profileIconColor: "rgba(35, 35, 35,0.8)",
    searchIconColor: "rgba(35, 35, 35,0.8)",
    cartIconColor: "rgba(35, 35, 35,0.8)",
    profileIconColorHover: "#eb4034",
    searchIconColorHover: "#eb4034",
    cartIconColorHover: "#eb4034",
    cartIconMargin: "1vmax",
};

const HeaderTesting: React.FC = () => {
    return <ReactNavbar {...options} />;
};

export default HeaderTesting;
