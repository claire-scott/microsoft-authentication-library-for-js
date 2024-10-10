import { loginRequest, graphConfig } from "../authConfig";
import { msalInstance } from "../index";

export async function callMsGraph(accessToken) {
    if (!accessToken) {
        const account = msalInstance.getActiveAccount();
        if (!account) {
            throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
        }

        const response = await msalInstance.acquireTokenSilent({
            ...loginRequest,
            account: account
        });
        accessToken = response.accessToken;
    }

    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    try {
        // Fetch user profile data
        const profileResponse = await fetch(graphConfig.graphMeEndpoint, options);
        const profileData = await profileResponse.json();

        // Fetch user photo
        const photoResponse = await fetch("https://graph.microsoft.com/v1.0/me/photo/$value", options);

        let photoBlob = null;
        if (photoResponse.ok) {
            photoBlob = await photoResponse.blob();
        }

        // Combine profile data and photo
        const graphData = {
            ...profileData,
            profile_image: photoBlob
        };

        return graphData;
    } catch (error) {
        console.error("Error fetching data from Microsoft Graph", error);
        throw error;
    }

    return fetch(graphConfig.graphMeEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}
