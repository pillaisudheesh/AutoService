import React, { useState } from "react";
import * as bcrypt from 'bcryptjs';
import userService from "../../services/users.service";
import { useNavigate } from 'react-router-dom';

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: value ? '' : 'This field is required',
      }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    // Check if there are errors
    if (Object.keys(newErrors).length > 0) {
      setMessage('Please fill in all required fields correctly!');
      return;
    }
    if (formData.password.length < 8) {
        setMessage('Password must be at least 8 characters long!');
        return;
      }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      // Encrypt the password before sending it over the API
      const encryptedPassword = bcrypt.hashSync(formData.password, bcrypt.genSaltSync());
      const data = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: encryptedPassword
      }

      const response = await userService.registerUser(data);

    //   const response = await axios.post(
    //     "http://localhost:3000/users/register",
    //     {
    //       name: formData.name,
    //       email: formData.email,
    //       password: encryptedPassword, // Send the encrypted password
    //     }
    //   );

      setMessage(`Registration successful`);
      setIsRegistered(true);
    } catch (error) {
        if (error.response && error.response.status === 400) {
            setMessage(error.response.data.message); // Show message from backend, e.g., "User already exists"
          } else {
            setMessage('Registration failed. Please try again.');
          }
    }
  };
  const handleCancel = () => {
    navigate('/login'); // Navigate back to the login page
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          {isRegistered ? 'Success!' : 'Register'}
        </h2>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
        {!isRegistered ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700">
                Name<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 mt-1 border-1  border-gray-300 rounded focus:outline-none focus:ring-1 ${
                  errors.name ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700">
                Email<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 mt-1 border-1  border-gray-300 rounded focus:outline-none focus:ring-1 ${
                  errors.email ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700">
                Contact No<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Enter your Contact Number"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-3 py-2 mt-1 border-1  border-gray-300 rounded focus:outline-none focus:ring-1 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="flex items-center text-sm font-medium text-gray-700"
              >
                Password<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 mt-1 border-1  border-gray-300 rounded focus:outline-none focus:ring-1 ${
                  errors.password ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="flex items-center text-sm font-medium text-gray-700"
              >
                Confirm Password<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-3 py-2 mt-1 border-1  border-gray-300 rounded focus:outline-none focus:ring-1 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
            <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
            >
              Register
            </button>
            <button
                type="button"
                onClick={handleCancel}
                className="w-full px-4 py-2 text-blue-500 border border-blue-500 rounded hover:bg-blue-100 focus:outline-none"
              >
                Cancel
              </button>
              </div>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-gray-700 mb-4">
              Your registration is complete. Click the link below to log in.
            </p>
            <a href="/login" className="text-blue-500 hover:underline">
              Go to Login Page
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRegistration;
