import React, { useState } from 'react'
import { X, Mail, Lock, User, Eye, EyeOff, Shield, RefreshCw } from 'lucide-react'
import { useAuth } from './AuthProvider'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const LoginModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [captcha, setCaptcha] = useState({ question: '', answer: 0, userAnswer: '' })
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  })

  const { signIn, signUp } = useAuth()

  // Generate CAPTCHA question
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    const operators = ['+', '-', '*']
    const operator = operators[Math.floor(Math.random() * operators.length)]
    
    let answer
    let question
    
    switch (operator) {
      case '+':
        answer = num1 + num2
        question = `${num1} + ${num2}`
        break
      case '-':
        // Ensure positive result
        const larger = Math.max(num1, num2)
        const smaller = Math.min(num1, num2)
        answer = larger - smaller
        question = `${larger} - ${smaller}`
        break
      case '*':
        // Use smaller numbers for multiplication
        const smallNum1 = Math.floor(Math.random() * 5) + 1
        const smallNum2 = Math.floor(Math.random() * 5) + 1
        answer = smallNum1 * smallNum2
        question = `${smallNum1} × ${smallNum2}`
        break
      default:
        answer = num1 + num2
        question = `${num1} + ${num2}`
    }
    
    setCaptcha({ question, answer, userAnswer: '' })
  }

  // Initialize CAPTCHA when modal opens or switches to signup
  React.useEffect(() => {
    if (isOpen && !isLogin) {
      generateCaptcha()
    }
  }, [isOpen, isLogin])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password)
        if (error) throw error
        toast.success('Welcome back!')
        onClose()
      } else {
        // Verify CAPTCHA for signup
        if (parseInt(captcha.userAnswer) !== captcha.answer) {
          throw new Error('CAPTCHA verification failed. Please try again.')
        }
        
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match')
        }
        const { error } = await signUp(formData.email, formData.password, {
          full_name: formData.fullName
        })
        if (error) throw error
        toast.success('Account created successfully!')
        onClose()
      }
    } catch (error) {
      toast.error(error.message)
      // Regenerate CAPTCHA on error for signup
      if (!isLogin) {
        generateCaptcha()
      }
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleCaptchaChange = (e) => {
    setCaptcha({
      ...captcha,
      userAnswer: e.target.value
    })
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Confirm your password"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Security Verification
                </label>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-gray-700">
                        Please solve: <span className="font-bold text-lg text-blue-600">{captcha.question} = ?</span>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                      title="Generate new question"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="number"
                    value={captcha.userAnswer}
                    onChange={handleCaptchaChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your answer"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    This helps us prevent automated signups and keep our platform secure.
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-blue-600 hover:text-blue-700 font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default LoginModal
