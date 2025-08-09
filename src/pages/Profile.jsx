import React, { useState } from 'react';
import { useAuth } from '../components/AuthProvider';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || 'Trader');
  const [email, setEmail] = useState(user?.email || '');
  const [tradingPreference, setTradingPreference] = useState('Conservative'); // Example preference

  const handleSave = () => {
    // Placeholder for saving profile changes (e.g., API call)
    console.log('Saving profile:', { fullName, email, tradingPreference });
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            User Profile
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your personal information and trading preferences
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 mt-4 sm:mt-0">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Profile Active</span>
        </div>
      </div>

      {/* User Details */}
      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{fullName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{email}</p>
            )}
          </div>
        </div>
      </div>

      {/* Trading Preferences */}
      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Trading Preferences</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">Risk Profile</label>
          {isEditing ? (
            <select
              value={tradingPreference}
              onChange={(e) => setTradingPreference(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Conservative</option>
              <option>Moderate</option>
              <option>Aggressive</option>
            </select>
          ) : (
            <p className="mt-1 text-gray-900">{tradingPreference}</p>
          )}
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>
        <div className="flex space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
