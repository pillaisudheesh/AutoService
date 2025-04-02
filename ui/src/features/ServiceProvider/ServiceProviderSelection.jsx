import React, { useEffect, useState, useRef } from "react";
import images from "../../common/assets";
import {
  FaCar,
  FaTools,
  FaOilCan,
  FaBatteryFull,
  FaMapMarkerAlt,
  FaUserCircle,
  FaEnvelope,
  FaStar,
} from "react-icons/fa";

import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { fromLonLat } from "ol/proj";
import { Style, Icon, Stroke } from "ol/style";

import { GiTowTruck } from "react-icons/gi";
import { useSelector } from "react-redux";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import ServiceBooking from "./ServiceBooking";
import Cookies from "js-cookie";
import bookingService from "../../services/booking.service";
import PopupModal from "../../components/PopupModal";

const ServiceProviderSelection = () => {
  const mapRefs = useRef([]);
  const [selectedService, setSelectedService] = useState("all"); // Default: Show all providers
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const { user: userInfo } = useSelector((x) => x.auth);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const mockUserDetails = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Customer", // Example roles: "Customer" or "Service Provider"
  };
  useEffect(() => {
    // Simulate fetching user details
    checkIfAuthenticated();
  }, []);

  const checkIfAuthenticated = () => {
    console.log(userInfo);
    let authToken = Cookies.get("authToken");
    if (authToken) {
      const decodedToken = decodeToken(authToken);
      setLoggedInUser({
        name: decodedToken.name,
        email: decodedToken.email,
        role: "Customer",
      });
    } else {
      navigate("/login");
    }
  };

  // Example list of service providers and their services
  const serviceProviders = [
    {
      id: 1,
      name: "Speedy Auto Repairs",
      image: images.carRepair, // Replace with actual image URLs
      address: "123, Auto Lane, Aluva",
      services: ["Oil Change", "Engine Repair", "Tire Replacement"],
      rating: 4.5,
      lat: 10.12183,
      lng: 76.341783,
    },
    {
      id: 2,
      name: "Pro Mechanics",
      image: images.carRepair1, // Replace with actual image URLs
      address: "456 Repair Road, Angamaly",
      services: ["Brake Service", "Car Wash", "Battery Replacement"],
      rating: 4,
      lat: 10.13818,
      lng: 76.353713,
    },
    {
      id: 3,
      name: "Elite Car Care",
      image: images.carRepair2, // Replace with actual image URLs
      address: "789 Garage Street, Edappally",
      services: ["Transmission Repair", "Alignment Check", "Engine Tuning"],
      rating: 3.5,
      lat: 10.242792,
      lng: 76.374875,
    },
  ];

  const serviceOptions = [
    { id: "all", name: "All Services", icon: <FaTools /> },
    { id: "towing", name: "Towing", icon: <GiTowTruck /> },
    { id: "oilChange", name: "Oil Change", icon: <FaOilCan /> },
    { id: "carWash", name: "Car Wash", icon: <FaCar /> },
    { id: "batteryReplacement", name: "Battery", icon: <FaBatteryFull /> },
  ];

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    setSelectedProvider(null); // Reset selected provider when service changes
  };

  const handleProviderSelect = (providerId) => {
    const provider = serviceProviders.find((p) => p.id === providerId);
    setSelectedProvider(provider);
  };

  // Filter providers based on selected service
  const filteredProviders =
    selectedService === "all"
      ? serviceProviders
      : serviceProviders.filter((provider) =>
          provider.services.some((service) =>
            service.toLowerCase().includes(selectedService.toLowerCase())
          )
        );

  useEffect(() => {
    serviceProviders.forEach((provider, index) => {
      if (
        mapRefs.current[index] &&
        !mapRefs.current[index].mapInstance &&
        userLocation
      ) {
        // Initialize map for each provider if not already initialized

        const userPoint = fromLonLat([userLocation.lng, userLocation.lat]);
        const providerPoint = fromLonLat([provider.lng, provider.lat]);

        const routeLine = new LineString([userPoint, providerPoint]);

        const routeFeature = new Feature({
          geometry: routeLine,
        });
        routeFeature.setStyle(
          new Style({
            stroke: new Stroke({
              color: "#FF5733", // Route color
              width: 3,
            }),
          })
        );

        const userFeature = new Feature({
          geometry: new Point(userPoint),
        });
        userFeature.setStyle(
          new Style({
            image: new Icon({
              anchor: [0.5, 1],
              src: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", // User marker
            }),
          })
        );

        const providerFeature = new Feature({
          geometry: new Point(providerPoint),
        });
        providerFeature.setStyle(
          new Style({
            image: new Icon({
              anchor: [0.5, 1],
              src: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // Provider marker
            }),
          })
        );

        const mapInstance = new Map({
          target: mapRefs.current[index],
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
            new VectorLayer({
              source: new VectorSource({
                features: [routeFeature, userFeature, providerFeature],
              }),
            }),
          ],
          view: new View({
            center: fromLonLat([provider.lng, provider.lat]),
            zoom: 12,
          }),
        });
        mapRefs.current[index].mapInstance = mapInstance; // Attach map instance to DOM node
      }
    });
  }, [serviceProviders]);

  // Retrieve user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Geolocation error:", error);
        setUserLocation({ lat: 10.118153, lng: 76.338323 });
      }
    );
  }, []);

  const handleCancel = (e) => {
    e.preventDefault();
    setSelectedProvider(null);
  };

  const handleBookingSubmit = async (data) => {
    try {
      // Simulate API call

      console.log(data);
      const response = await bookingService.bookService(data);
      setMessage("Service booked successfully!");
      setSelectedProvider(null);
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while booking the service.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl p-8 bg-white shadow-md rounded mt-25 mb-6">
          {loggedInUser && (
            <>
              {/* try out */}
              <div className="w-full bg-gray-50 flex">
                <div className="w-full container flex items-center  justify-between rounded-md border border-gray-100 bg-white px-4 py-3 shadow-lg">
                 
                 <div className="flex items-center">
                 <FaUserCircle className="text-4xl text-blue-500 mr-4" />
                  <p class="ml-4 w-56">
                    <strong class="block text-lg font-medium">
                      {loggedInUser.name}
                    </strong>
                    <span className="text-xs text-gray-400">
                      {" "}
                      <FaEnvelope className="inline-block mr-1" />{" "}
                      {loggedInUser.email}
                    </span>
                  </p>
                 </div>
                  
                  <button className=" px-6 py-2.5 rounded-lg border bg-gray-200  text-gray-700 border-gray-300 hover:bg-gray-300 text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100">
              My Orders
            </button>
                </div>
                
              </div>
            </>
          )}

          {/* Top Filter Card */}
          {!selectedProvider && (
            <div className="flex items-center justify-between mb-6 p-4 bg-gray-100 rounded shadow">
              {serviceOptions.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service.id)}
                  className={`flex flex-col items-center p-4 rounded ${
                    selectedService === service.id
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700 border border-gray-300"
                  }`}
                >
                  <div className="text-2xl">{service.icon}</div>
                  <span className="mt-2 text-sm">{service.name}</span>
                </button>
              ))}
            </div>
          )}
          {/* Service Provider Cards */}
          {!selectedProvider && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProviders.map((provider, index) => (
                <div
                  key={provider.id}
                  className={`p-4 border rounded shadow hover:shadow-lg ${
                    selectedProvider?.id === provider.id
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {/* Services Header */}
                  <div className="text-sm text-white bg-blue-500 px-2 py-1 rounded-t mb-2">
                    {provider.services.join(" | ")}
                  </div>
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="w-full h-32 object-cover rounded mb-4"
                  />
                  <h3 className="text-lg font-bold text-gray-700">
                    {provider.name}
                  </h3>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <FaMapMarkerAlt className="text-blue-500 mr-2" />
                    <span>{provider.address}</span>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <FaStar className="text-yellow-500 mr-2" />{" "}
                    {/* Star Icon */}
                    <span>{provider.rating} / 5.0</span>
                  </div>
                  {/* <ul className="mt-2 text-sm text-gray-600">
              {provider.services.map((service, index) => (
                <li key={index} className="list-disc list-inside">
                  {service}
                </li>
              ))}
            </ul> */}
                  {/* Location Map */}
                  <div
                    ref={(el) => (mapRefs.current[index] = el)} // Assign each map container to the ref array
                    className="w-full h-40 mt-4 rounded"
                    style={{ border: "1px solid #ddd" }}
                  ></div>
                  <button
                    onClick={() => handleProviderSelect(provider.id)}
                    className={`mt-4 w-full px-4 py-2 rounded text-white ${
                      selectedProvider?.id === provider.id
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {selectedProvider?.id === provider.id ? "Selected" : "Book"}
                  </button>
                </div>
              ))}
            </div>
          )}

          {selectedProvider && (
            <ServiceBooking
              selectedProvider={selectedProvider}
              handleCancel={handleCancel}
              handleBookingSubmit={(data) => handleBookingSubmit(data)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ServiceProviderSelection;
