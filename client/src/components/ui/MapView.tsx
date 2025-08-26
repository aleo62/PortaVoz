import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
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
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]} icon={customIcon}>
                <Popup>Localização da denúncia</Popup>
            </Marker>
        </MapContainer>
    );
}
