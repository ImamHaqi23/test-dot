// components/Login.tsx
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'user' && password === 'password') {
      Cookies.set('username', username);
      navigate('/home');
    } else {
      alert('Invalid username or password');
    }
  };

  useEffect(() => {
    if (Cookies.get('username')) {
      navigate('/home');
    }
  }, []);

  return (
    <div className="bg-gradient-to-b from-slate-600 to-slate-800 min-h-screen flex justify-center items-center">
      <div className="bg-slate-900 w-[400px] h-[400px] rounded-lg shadow-lg p-5">
        <h1 className="text-3xl font-semibold mb-4 text-center text-white">
          Login
        </h1>
        <div className="my-6">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-300"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-input mt-1 block w-full rounded py-1 px-2"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="my-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-input mt-1 block w-full rounded py-1 px-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-6"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
