import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from '@mui/material/MenuItem';
import { Box, ListItemIcon, Typography } from '@mui/material'
import Menu from '@mui/material/Menu';
import { AccountPicker } from "./AccountPicker";
import { useUser } from '../contexts/UserContext'
import LogoutIcon from '@mui/icons-material/Logout';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import SettingsIcon from '@mui/icons-material/Settings'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FeedbackIcon from '@mui/icons-material/Feedback';


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
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Avatar src={profileImageUrl} alt="Profile" /> 
                    </ListItemIcon>
                    <Box sx={{ ml: 2, overflow: 'hidden' }}>
                        <Typography variant='subtitle1' noWrap>
                            {userData?.displayName}
                        </Typography>
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: 'text.secondary',
                                fontSize: '0.75rem',
                                lineHeight: 1,
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap'
                            }}
                            >
                            {userData?.userPrincipalName}
                        </Typography>
                    </Box>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => handleAccountSelection()} key="switchAccount">
                <ListItemIcon>
                        <SwitchAccountIcon />
                    </ListItemIcon>
                    <Typography>
                        Switch Accounts
                    </Typography>                
                </MenuItem>
                <MenuItem onClick={() => handleLogout("redirect")} key="logoutRedirect">
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <Typography>
                        Sign Out
                    </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <Typography>
                        Settings
                    </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <HelpOutlineIcon />
                    </ListItemIcon>
                    <Typography>
                        Help
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <FeedbackIcon />
                    </ListItemIcon>
                    <Typography>
                        Send Feedback
                    </Typography>
                </MenuItem>
            </Menu>
            <AccountPicker open={accountSelectorOpen} onClose={handleClose} />
        </div>
    )
};