import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trading-plans" element={<TradingPlans />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<ComingSoon />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
