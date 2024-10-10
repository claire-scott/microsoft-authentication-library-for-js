import { Routes, Route, useNavigate } from "react-router-dom";
// Material-UI imports
import Grid from "@mui/material/Grid";

// MSAL imports
import { MsalProvider } from "@azure/msal-react";
import { CustomNavigationClient } from "./utils/NavigationClient";

// Sample app imports
import { PageLayout } from "./ui-components/PageLayout";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Logout } from "./pages/Logout";

// Class-based equivalents of "Profile" component
import { ProfileWithMsal } from "./pages/ProfileWithMsal";
import { ProfileRawContext } from "./pages/ProfileRawContext";
import { MapDash } from "./pages/MapDash"
import { ProfileUseMsalAuthenticationHook } from "./pages/ProfileUseMsalAuthenticationHook";
import { UserProvider } from "./contexts/UserContext";


import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#002664',
        },
        secondary: {
          main: '#f50057',
        },
      },
      typography: {
        fontFamily: '"Public Sans", "Arial", sans-serif',
      },
  });

function App({ pca }) {
    // The next 3 lines are optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
    const navigate = useNavigate();
    const navigationClient = new CustomNavigationClient(navigate);
    pca.setNavigationClient(navigationClient);

    return (
        <MsalProvider instance={pca}>
            <UserProvider>
                <ThemeProvider theme={theme}>
                    <PageLayout>
                        <Grid container justifyContent="center">
                            <Pages />
                        </Grid>
                    </PageLayout>
                </ThemeProvider>
            </UserProvider>
        </MsalProvider>
    );
}

function Pages() {
    return (
        <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profileWithMsal" element={<ProfileWithMsal />} />
            <Route path="/profileRawContext" element={<ProfileRawContext />} />
            <Route
                path="/profileUseMsalAuthenticationHook"
                element={<ProfileUseMsalAuthenticationHook />}
            />
            <Route path="/logout" element={<Logout />} />
            <Route path="/resource/maps" element={<MapDash />} />
            <Route path="/" element={<Home />} />
        </Routes>
    );
}

export default App;
