import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './components/AuthProvider'
import Navbar from './components/Navbar'

// Page Imports
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import TradingPlans from './pages/TradingPlans'
import Transactions from './pages/Transactions'
import Profile from './pages/Profile'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import ComingSoon from './pages/ComingSoon'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Navbar />
          <main className="pt-16 sm:pt-20">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/trading-plans" element={<TradingPlans />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />

              {/* Catch-All for undefined routes */}
              <Route path="*" element={<ComingSoon />} />
            </Routes>
          </main>
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </Router>
    </AuthProvider>
  )
}

export default App
