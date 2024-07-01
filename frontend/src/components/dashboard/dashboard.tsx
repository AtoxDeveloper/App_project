import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface UserInfo {
  idUser?: string;
  username?: string;
  email?: string;
  name?: string;
  lastname?: string;
  // otros campos según sea necesario
}

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo: UserInfo = location.state?.userInfo;
  console.log(userInfo);
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="bg-white shadow-md rounded-lg p-6 mt-10 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
        {userInfo && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{userInfo.name} {userInfo.lastname}</h2>
            <p className="text-gray-700">Username: {userInfo.username}</p>
            <p className="text-gray-700">Email: {userInfo.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
