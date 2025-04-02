import React, { useState } from "react";
import serviceProviderService from "../../services/serviceprovider.service";
import { useNavigate } from 'react-router-dom';

const ServiceProviderRegistration = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    ownerName: "",
    contactNumber: "",
    email: "",
    address: "",
    servicesOffered: [], // Array to hold multiple selected services
    operatingHours: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const servicesOptions = [
    { id: "oilChange", label: "Oil Change" },
    { id: "tireReplacement", label: "Tire Replacement" },
    { id: "engineRepair", label: "Car Repair" },
    { id: "towService", label: "Tow Service" },
    { id: "carWash", label: "Car Wash" },
    { id: "brakeService", label: "Brake Service" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "servicesOffered") {
      const selectedOptions = Array.from(e.target.selectedOptions).map(
        (option) => option.value
      );
      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedOptions,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    for (const key in formData) {
      if (
        !formData[key] ||
        (key === "servicesOffered" && formData[key].length === 0)
      ) {
        setMessage(
          "All fields are mandatory, including selecting at least one service!"
        );
        return;
      }
    }

    console.log("Form data:", formData);
    const data = {
      name: formData.companyName,
      owner: formData.ownerName,
      email: formData.email,
      phone: formData.contactNumber,
      address: formData.address,
      services: formData.servicesOffered.join(','),
      operatingHours: formData.operatingHours,
    };

    try {
      const response = await serviceProviderService.registerDetails(data);
      setMessage("Registration successful!");
      setTimeout(redirectToHome,2000);
    } catch (error) {
      console.log(error);
    }
  };

  const redirectToHome = () => {
    navigate('/home');
  }
  const handleServiceToggle = (serviceId) => {
    setFormData((prevData) => {
      const isSelected = prevData.servicesOffered.includes(serviceId);
      return {
        ...prevData,
        servicesOffered: isSelected
          ? prevData.servicesOffered.filter((id) => id !== serviceId) // Remove if already selected
          : [...prevData.servicesOffered, serviceId], // Add if not selected
      };
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded mt-25 mb-5">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Service Provider Registration
        </h2>
        {message && (
          <p className="text-center text-green-500 mb-4">{message}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-700"
            >
              Company Name<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Enter your company name"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border-1  border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="ownerName"
              className="block text-sm font-medium text-gray-700"
            >
              Owner Name<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              placeholder="Enter owner's name"
              value={formData.ownerName}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border-1  border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="contactNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Number<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              placeholder="Enter contact number"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border-1  border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border-1  border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address<span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border-1  border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="servicesOffered"
              className="block text-sm font-medium text-gray-700"
            >
              Services Offered<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {servicesOptions.map((service) => (
                <button
                  type="button"
                  key={service.id}
                  className={`px-3 py-2 text-sm rounded border focus:outline-none ${
                    formData.servicesOffered.includes(service.id)
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                  }`}
                  onClick={() => handleServiceToggle(service.id)}
                >
                  {service.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="operatingHours"
              className="block text-sm font-medium text-gray-700"
            >
              Operating Hours<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="operatingHours"
              name="operatingHours"
              placeholder="Enter operating hours"
              value={formData.operatingHours}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border-1  border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceProviderRegistration;
