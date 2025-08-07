import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Navbar from './components/Navbar'; // From your list of 25 components
import Dashboard from './pages/Dashboard';
import Trading from './pages/Trading';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

const NotFound = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-3xl font-bold text-gray-900">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-2">The page you are looking for does not exist.</p>
    </div>
  );
};

function App() {
  const navItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Trading', href: '/trading' },
    { label: 'Analytics', href: '/analytics' },
    { label: 'Settings', href: '/settings' },
  ];

  return (
    <Layout>
      <Navbar items={navItems} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/trading" element={<Trading />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
