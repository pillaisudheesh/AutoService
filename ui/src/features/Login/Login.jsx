import React, { useState, useEffect } from "react";
import loginService from "../../services/login.service";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import Cookies from 'js-cookie';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    checkIfAuthenticated();
  },[]);

  const checkIfAuthenticated = () => {
    
    let authToken = Cookies.get('authToken');
    if (authToken) {
      navigate("/serviceproviderselection");
    } else {
      navigate("/login");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : "This field is required",
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    // Check if there are errors
    if (Object.keys(newErrors).length > 0) {
      setMessage("Please fill in all required fields correctly!");
      return;
    }

    try {
      
      const data = {
        email: formData.email,
        password: formData.password
      }

      const response = await loginService.loginUser(data);

      setMessage(`Login successful`);
      if(response.accessToken) {
        Cookies.set('authToken', response.accessToken, { expires: 1, secure: true, sameSite: 'strict' });
        dispatch(authActions.setToken(response.accessToken));
        navigate('/serviceproviderselection'); 
      }
      

    } catch (error) {
      console.log(error);
        if (error.response && error.response.status === 400) {
            setMessage(error.response.data.message); // Show message from backend, e.g., "User already exists"
          } else {
            setMessage('Invalid user name or password failed. Please try again.');
          }
    }
    
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Login
        </h2>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 mt-1 border-1  border-gray-300 rounded focus:outline-none focus:ring-1 ${
                errors.name ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
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
                errors.name ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
