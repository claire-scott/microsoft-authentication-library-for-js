import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { InteractionStatus, InteractionType, InteractionRequiredAuthError } from "@azure/msal-browser";
import Typography from "@mui/material/Typography";
import { useUser } from '../contexts/UserContext';

const WelcomeName = () => {
    const { instance } = useMsal();
    const [name, setName] = useState(null);
    const [graphData, setGraphData] = useState(null);
    const { userData, refreshUserData } = useUser();

    if (userData) {
        return <Typography variant="h6">Welcome, {userData.givenName}</Typography>;
    } else {
        return null;
    }
};

export default WelcomeName;

