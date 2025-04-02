import React, { useEffect, useState } from "react";
import "ol/ol.css"; // OpenLayers default CSS
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style, Icon } from "ol/style";
import { FaMapMarkerAlt } from 'react-icons/fa';

const OpenLayersMap = () => {
  const [selectedProvider] = useState({
    id: 1,
    name: "Speedy Auto Repairs",
    lat: 10.12183,
    lng: 76.341783,
    address: "123, Auto Lane, Aluva",
    services: ["Oil Change", "Engine Repair", "Tire Replacement"],
  });
  useEffect(() => {
    // Service provider locations as OpenLayers features
    const features = serviceProviders.map((provider) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([provider.lng, provider.lat])),
        name: provider.name,
      });

      // Icon style for the marker
      feature.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // Marker icon (can be replaced)
          }),
        })
      );

      return feature;
    });

    // Vector layer for markers
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: features,
      }),
    });

    // Initialize OpenLayers map
    const map = new Map({
      target: "map", // ID of the div element to display the map
      layers: [
        new TileLayer({
          source: new OSM(), // OpenStreetMap tiles
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([76.587652, 10.199417]), // Center of the US, 76.587652
        zoom: 9,
      }),
    });

    return () => {
      map.setTarget(null); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-md rounded p-4 mb-6 mt-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          {selectedProvider.name}
        </h2>
        <div className="flex items-center mb-2 text-gray-600">
          <FaMapMarkerAlt className="text-blue-500 mr-2" />
          <span>{selectedProvider.address}</span>
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Services Offered:
        </h3>
        <ul className="list-disc list-inside text-gray-600">
          {selectedProvider.services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>
      <div className="w-full max-w-4xl bg-white shadow-md rounded p-4">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Find nearby service providers
        </h2>
        <div
          id="map"
          style={{ width: "100%", height: "500px", borderRadius: "8px" }}
        ></div>
      </div>
    </div>
  );
};

const serviceProviders = [
  {
    id: 1,
    name: "Speedy Auto Repairs",
    lat: 10.12183,
    lng: 76.341783,
  },
  {
    id: 2,
    name: "Pro Mechanics",
    lat: 10.13818,
    lng: 76.353713,
  },
  {
    id: 3,
    name: "Elite Car Care",
    lat: 10.242792,
    lng: 76.374875,
  },
];

export default OpenLayersMap;
