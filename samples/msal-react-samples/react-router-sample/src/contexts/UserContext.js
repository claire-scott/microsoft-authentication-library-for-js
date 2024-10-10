import React, { createContext, useState, useEffect, useContext } from 'react';
import { useMsal } from "@azure/msal-react";
import { callMsGraph } from "../utils/MsGraphApiCall";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { instance, accounts } = useMsal();
    const [userData, setUserData] = useState(null);

    const fetchUserData = async () => {
        try {
            const data = await callMsGraph();
            setUserData(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        if (accounts[0]) {
            fetchUserData();
        }
    }, [accounts]);

    // Refresh data periodically or on app focus
    useEffect(() => {
        const refreshInterval = setInterval(fetchUserData, 30 * 60 * 1000); // 30 minutes

        const handleFocus = () => {
            fetchUserData();
        };

        window.addEventListener('focus', handleFocus);

        return () => {
            clearInterval(refreshInterval);
            window.removeEventListener('focus', handleFocus);
        };
    }, []);

    return (
        <UserContext.Provider value={{ userData, refreshUserData: fetchUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);