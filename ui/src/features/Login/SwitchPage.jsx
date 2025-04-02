import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SwitchPage = () => {
  const [selectedRole, setSelectedRole] = useState("customer"); // Default to 'customer'
  const navigate = useNavigate();

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole === "customer") {
      navigate("/login"); // Redirect to customer page
    } else {
      navigate("/service-provider"); // Redirect to service provider page
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Login as
        </h2>
        <div className="flex justify-around mb-6">
          <button
            onClick={() => handleRoleChange("customer")}
            className={`px-4 py-2 rounded focus:outline-none ${
              selectedRole === "customer"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Customer
          </button>
          <button
            onClick={() => handleRoleChange("service-provider")}
            className={`px-4 py-2 rounded focus:outline-none ${
              selectedRole === "service-provider"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Service Provider
          </button>
        </div>
        <div className="text-center">
          <p className="text-gray-700 mb-4">
            You have selected: <strong>{selectedRole}</strong>
          </p>
          <button
            onClick={handleContinue}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwitchPage;
