import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const customIcon = new L.Icon({
    iconUrl: `https://res.cloudinary.com/di5bma0gm/image/upload/v1759595925/location_xqieu7.png`,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

export function PostMap({ latitude, longitude }: { latitude: number; longitude: number }) {
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
