import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { IconButton } from "@mui/material";

const MenuOptions = [
    "New group",
    "New community",
    "Starred messages",
    "Select chats",
    "Settings",
    "Log out",
];

export const MenuMobile = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton style={{ padding: 0 }} onClick={handleOpenMenu}>
                MenuIcon
            </IconButton>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {MenuOptions.map((label) => (
                    <MenuItem key={label} onClick={handleClose}>{label}</MenuItem>
                ))}
            </Menu>
        </>
    );
};