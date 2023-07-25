declare module "overlay-navbar" {
    import { FC } from "react";

    interface ReactNavbarProps {

        burgerColorHover: string;
        logo: string;
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

    export const ReactNavbar: FC<ReactNavbarProps>;
}
