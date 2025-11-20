import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix para iconos de Leaflet en React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Componente para capturar clicks en el mapa
function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onMapClick(lat, lng);
    },
  });
  return null;
}

const PastoMap: React.FC = () => {
  const center: [number, number] = [1.208, -77.277];
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(null);

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedPosition([lat, lng]);
    alert(`📍 Ubicación seleccionada:\nLat: ${lat.toFixed(6)}\nLng: ${lng.toFixed(6)}`);
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer 
        center={center} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        <MapClickHandler onMapClick={handleMapClick} />
        
        <Marker position={center}>
          <Popup>
            <strong>🎯 Pasto Center</strong><br/>
            Nariño, Colombia
          </Popup>
        </Marker>

        {selectedPosition && (
          <Marker position={selectedPosition}>
            <Popup>
              <strong>📍 Selected location</strong><br/>
              Click the map to select locations
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default PastoMap;