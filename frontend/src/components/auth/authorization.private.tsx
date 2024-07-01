import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PrivateRoute: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {

        const urlActive = `${API_BASE_URL}/api/v1/auth/active`;
        const params = new URLSearchParams();
        params.append('token', token);
        const res = await axios.post(urlActive, params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        if(res.data.active) {
          setIsAuthenticated(res.data.active);
        } else {
          const response = await axios.get(`${API_BASE_URL}/api/v1/auth/verify`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIsAuthenticated(response.data.valid);
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return <div className='loading'><h1>Loading....</h1></div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
