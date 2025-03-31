import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import './signin.css';

const Singin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://serverainote.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // If login is successful, redirect to the main page
      
      navigate('/mainpage');  // Redirect to the main page

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex screen">
      <div className="w-1/2 bg-orange-500 flex items-center justify-center">
        <div className="text-white">
          <h1 className="text-5xl font-bold mb-2 fontstl">ΛI ПӨƬΣMΛƬΣ</h1>
          <p className="text-xl">A summarizer for all your notes</p>
        </div>
      </div>

      <div className="w-1/2 bg-gray-100 flex flex-col justify-center p-16">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-4xl font-semibold text-orange-500 mb-12">Sign In</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-orange-400 uppercase text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mb-8">
              <label className="block text-orange-400 uppercase text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full bg-orange-500 text-white p-3 rounded uppercase font-medium hover:bg-orange-600"
            >
              Sign In
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link to="/signup" className="text-orange-500 hover:text-orange-600">
              I don't have an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singin;
