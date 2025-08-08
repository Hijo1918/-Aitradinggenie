import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Bell, Menu, X, User, Settings, LogOut, Zap } from 'lucide-react'
import { useAuth } from './AuthProvider'
import NotificationDropdown from './NotificationDropdown'
import LoginModal from './LoginModal'
import ApiStatus from './ApiStatus'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { user, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Trading Plans', path: '/trading-plans' },
    { name: 'Transactions', path: '/transactions' },
    { name: 'Profile', path: '/profile' },
    { name: 'About', path: '' }, // Coming Soon
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '' } // Coming Soon
  ]

  const isActive = (path) => location.pathname === path

  const handleNavClick = (path) => {
    setIsMenuOpen(false)
    if (!path) {
      navigate('/coming-soon')
    } else {
      navigate(path)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl sm:text-2xl font-bold text-blue-600">
              <div className="flex items-center">
                <Zap className="w-6 h-6 mr-2" />
                AI Trading Genie
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.path)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white shadow-blue-200'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* API Status */}
            <div className="hidden md:block">
              <ApiStatus />
            </div>

            {user ? (
              <>
                <div className="relative">
                  <button
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    className="p-3 rounded-xl bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg relative"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  </button>

                  <NotificationDropdown
                    isOpen={isNotificationOpen}
                    onClose={() => setIsNotificationOpen(false)}
                  />
                </div>

                <div className="hidden md:flex items-center space-x-3">
                  <span className="text-sm text-gray-600">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                  <button
                    onClick={signOut}
                    className="p-3 rounded-xl bg-white text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                Sign In
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-xl bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  className={`text-left w-full px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white shadow-blue-200'
                      : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </button>
              ))}

              {user && (
                <button
                  onClick={signOut}
                  className="w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg bg-red-600 text-white hover:bg-red-700"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </nav>
  )
}

export default Navbar
