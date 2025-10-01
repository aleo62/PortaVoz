import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const customIcon = new L.Icon({
    iconUrl: `https://i.pinimgproxy.com/?url=aHR0cHM6Ly9jZG4taWNvbnMtcG5nLmZsYXRpY29uLmNvbS8yNTYvODU0Lzg1NDg1My5wbmc=&ts=1758240201&sig=11015bddd7581f7e7d8f020757fe78b289ee06ef378f606238b5cbf3c666b57f`,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

export function MapView({ latitude, longitude }: { latitude: number; longitude: number }) {
    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={15}
            style={{ height: "250px", width: "100%", borderRadius: "10px", zIndex: 1 }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[latitude, longitude]} icon={customIcon}>
                <Popup>Localização da denúncia</Popup>
            </Marker>
        </MapContainer>
    );
}
