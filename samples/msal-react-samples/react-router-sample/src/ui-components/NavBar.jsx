//import * as React from 'react';
import React, { useState } from "react";
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MapIcon from '@mui/icons-material/Map';
import HomeIcon from '@mui/icons-material/Home';
import CellTowerIcon from '@mui/icons-material/CellTower';
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Drawer } from '@mui/material';
import Link from "@mui/material/Link";
import WelcomeName from "./WelcomeName";
import SignInSignOutButton from "./SignInSignOutButton";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import SearchBox from './SearchBox'

const NavBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Typography
                variant="h6"
                noWrap
                component="div">
                    Resources
            </Typography>
            <List>
                <ListItem>
                    <ListItemButton component={RouterLink} to="/" variant="contained">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText>Home</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton component={RouterLink} to="/resource/maps" variant="contained">
                        <ListItemIcon>
                            <MapIcon />
                        </ListItemIcon>
                        <ListItemText>Maps</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <CellTowerIcon />
                        </ListItemIcon>
                        <ListItemText>Sites</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );


    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <div sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" color="primary" sx={{ width: '100%', top: 0, left: 0 }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleMenuClose}>Home</MenuItem>
                        <MenuItem onClick={handleMenuClose}>About</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Services</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Contact</MenuItem>
                    </Menu>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        NSW Telco Authority
                    </Typography>
                    <SearchBox />
                    <Box sx={{ flexGrow: 1 }} />
                    <SignInSignOutButton />
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;