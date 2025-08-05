import { useEffect, useRef } from "react";

declare global {
  interface Window {
    L: any;
  }
}

interface MapComponentProps {
  center: [number, number];
  zoom: number;
  markers?: Array<{
    position: [number, number];
    popup: string;
  }>;
}

export function MapComponent({ center, zoom, markers = [] }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Load Leaflet CSS and JS
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    if (!window.L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    function initializeMap() {
      if (mapRef.current && window.L && !mapInstanceRef.current) {
        mapInstanceRef.current = window.L.map(mapRef.current).setView(center, zoom);

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapInstanceRef.current);

        // Add markers
        markers.forEach(marker => {
          const customIcon = window.L.divIcon({
            html: '<div style="background-color: rgb(185, 55, 93); width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>',
            iconSize: [20, 20],
            className: 'custom-marker'
          });

          window.L.marker(marker.position, { icon: customIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup(marker.popup);
        });

        // Add default marker if no markers provided
        if (markers.length === 0) {
          const customIcon = window.L.divIcon({
            html: '<div style="background-color: rgb(185, 55, 93); width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>',
            iconSize: [20, 20],
            className: 'custom-marker'
          });

          window.L.marker(center, { icon: customIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup('<strong>Your Location</strong><br>Bangalore, Karnataka')
            .openPopup();
        }
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom, markers]);

  return <div ref={mapRef} className="leaflet-container rounded-lg" />;
}
