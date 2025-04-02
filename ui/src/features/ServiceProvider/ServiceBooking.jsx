import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { decodeToken } from "react-jwt";
import Cookies from "js-cookie";
import bookingService from "../../services/booking.service";

const ServiceBooking = (props) => {
  const [bookingDetails, setBookingDetails] = useState({
    serviceProvider: "",
    selectedServices: [], // Updated to handle multiple services
    date: "",
    time: "",
    additionalNotes: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching user details
    console.log(bookingDetails);
  }, [bookingDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleServiceSelect = (service) => {
    setBookingDetails((prevDetails) => {
      const selectedServices = prevDetails.selectedServices?.includes(service)
        ? prevDetails.selectedServices.filter((s) => s !== service) // Remove service if already selected
        : [...prevDetails.selectedServices, service]; // Add service if not selected

      return { ...prevDetails, selectedServices };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Simulate API call
      const authToken = Cookies.get("authToken");
      const decodedToken = decodeToken(authToken);
      setBookingDetails({
        ...bookingDetails,
        serviceProviderId: props.selectedProvider.id,
        userId: decodedToken.id,
      });
      const data = {
        ...bookingDetails,
        serviceProviderId: props.selectedProvider.id,
        userId: decodedToken.id,
      };
      props.handleBookingSubmit(data);
      setBookingDetails(null);
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while booking the service.");
    }
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <div className="w-xl bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            className="rounded-t-lg"
            src={props?.selectedProvider?.image}
            alt=""
          />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {props?.selectedProvider?.name}
            </h5>
          </a>
          <div className="flex items-center mt-2 text-sm text-gray-600">
            <FaMapMarkerAlt className="text-blue-500 mr-2" />
            <span>{props?.selectedProvider?.address}</span>
          </div>
          <div className="flex items-center mt-2 text-sm text-gray-600">
            <FaStar className="text-yellow-500 mr-2" /> {/* Star Icon */}
            <span>{props?.selectedProvider?.rating} / 5.0</span>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              {/* Service Provider Selection */}
              <label className="block text-sm font-medium text-gray-700">
                Select Services
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {props?.selectedProvider?.services.map((service, index) => (
                  <button
                    type="button"
                    key={index}
                    className={`px-3 py-2 text-sm rounded border focus:outline-none ${
                      bookingDetails?.selectedServices?.includes(service)
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                    }`}
                    onClick={() => handleServiceSelect(service)}
                  >
                    {service}
                  </button>
                ))}
              </div>

              {/* Date */}
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={bookingDetails?.date}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded border-gray-300 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              {/* Time */}
              <div className="mb-4">
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700"
                >
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={bookingDetails?.time}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded border-gray-300 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              {/* Additional Notes */}
              <div className="mb-4">
                <label
                  htmlFor="additionalNotes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Additional Notes
                </label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={bookingDetails?.additionalNotes}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded border-gray-300 focus:ring-1 focus:ring-blue-500"
                  placeholder="Provide any additional notes"
                ></textarea>
              </div>
              {/* Submit Button */}
              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                >
                  Book Service
                </button>
                <button
                  type="button"
                  onClick={props.handleCancel}
                  className="w-full px-4 py-2 text-blue-500 border border-blue-500 rounded hover:bg-blue-100 focus:outline-none"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBooking;
