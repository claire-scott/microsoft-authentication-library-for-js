import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from "@mui/icons-material/Work";
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const ProfileData = ({ graphData }) => {
    return (
        <div>
            <h1>test</h1>
            {graphData.profile_image && (
                <img
                    src={URL.createObjectURL(graphData.profile_image)}
                    alt="Profile"
                    style={{ width: 100, height: 100, borderRadius: '50%' }}
                />
            )}
            <List className="profileData">
                <NameListItem name={graphData.displayName} />
                <JobTitleListItem jobTitle={graphData.jobTitle} />
                <MailListItem mail={graphData.mail} />
                <PhoneListItem phone={graphData.businessPhones[0]} />
                <LocationListItem location={graphData.officeLocation} />
            </List>
        </div>
    );
};

const NameListItem = ({ name }) => (
    <ListItem>
        <ListItemAvatar>
            <Avatar>
                <PersonIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Name" secondary={name} />
    </ListItem>
);

const JobTitleListItem = ({ jobTitle }) => (
    <ListItem>
        <ListItemAvatar>
            <Avatar>
                <WorkIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Title" secondary={jobTitle} />
    </ListItem>
);

const MailListItem = ({ mail }) => (
    <ListItem>
        <ListItemAvatar>
            <Avatar>
                <MailIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Mail" secondary={mail} />
    </ListItem>
);

const PhoneListItem = ({ phone }) => (
    <ListItem>
        <ListItemAvatar>
            <Avatar>
                <PhoneIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Phone" secondary={phone} />
    </ListItem>
);

const LocationListItem = ({ location }) => (
    <ListItem>
        <ListItemAvatar>
            <Avatar>
                <LocationOnIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Location" secondary={location} />
    </ListItem>
);
