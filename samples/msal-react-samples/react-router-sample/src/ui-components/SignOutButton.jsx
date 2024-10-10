import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar'
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { AccountPicker } from "./AccountPicker";
import { useUser } from '../contexts/UserContext'


export const SignOutButton = () => {
    const { instance } = useMsal();
    const [accountSelectorOpen, setOpen] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState(null);

    const open = Boolean(anchorEl);
    const { userData, refreshUserData } = useUser();


    useEffect(() => {
        if (userData?.profile_image) {
            setProfileImageUrl(URL.createObjectURL(userData.profile_image));
        }
    }, [userData]);

    const handleLogout = (logoutType) => {
        setAnchorEl(null);

        if (logoutType === "popup") {
            instance.logoutPopup();
        } else if (logoutType === "redirect") {
            instance.logoutRedirect();
        }
    }

    const handleAccountSelection = () => {
        setAnchorEl(null);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton
                onClick={(event) => setAnchorEl(event.currentTarget)}
                color="inherit">
                {profileImageUrl ? (
                    <Avatar src={profileImageUrl} alt="Profile" />
                ) : (
                    <AccountCircle />
                )}
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={() => handleAccountSelection()} key="switchAccount">Switch Account</MenuItem>
                <MenuItem onClick={() => handleLogout("popup")} key="logoutPopup">Logout using Popup</MenuItem>
                <MenuItem onClick={() => handleLogout("redirect")} key="logoutRedirect">Logout using Redirect</MenuItem>
            </Menu>
            <AccountPicker open={accountSelectorOpen} onClose={handleClose} />
        </div>
    )
};