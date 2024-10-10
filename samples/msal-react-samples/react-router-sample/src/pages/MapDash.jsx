import { useState, useEffect } from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box"
import { Link as RouterLink } from "react-router-dom";
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


export function MapDash() {
    const [map, setMap] = useState(null);
    const [layers, setLayers] = useState({
      openStreetMap: true,
      satellite: false,
      // Add more layers as needed
    });
  
    useEffect(() => {
      if (!map) return;
  
      // You can add more map initialization logic here
    }, [map]);
  
    const toggleLayer = (layerName) => {
      setLayers(prevLayers => ({
        ...prevLayers,
        [layerName]: !prevLayers[layerName]
      }));
    };

    const center = [-31.8759, 147.2869];
    // Zoom level to show all of NSW (you may need to adjust this)
    const zoom = 6;

    return (
      <>
          <AuthenticatedTemplate>
          <Box sx={{ height: 'calc(100vh - 64px - 20px)', width: '100vw' }}>

        <MapContainer
          center={center}
          zoom={zoom}
          style={{ 
            position: 'absolute', 
            top: '64px', 
            bottom: 0, 
            left: 0, 
            right: 0,
            margin: 0,
            padding: 0,
          }}
          whenCreated={setMap}
        >
          <LayersControl position="topright">
            {layers.openStreetMap && (
              <LayersControl.BaseLayer checked name="OpenStreetMap">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
              </LayersControl.BaseLayer>
            )}
            {layers.satellite && (
              <LayersControl.BaseLayer name="Satellite">
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                />
              </LayersControl.BaseLayer>
            )}
            {/* Add more layers as needed */}
          </LayersControl>
        </MapContainer>
      </Box>
          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>
            <Typography variant="h6">
              <center>Please sign-in to Access this resource.</center>
            </Typography>
          </UnauthenticatedTemplate>
      </>
  );
}