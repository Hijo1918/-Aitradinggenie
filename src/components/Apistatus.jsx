import React, { useState, useEffect } from 'react'
import { Wifi, WifiOff, AlertCircle, CheckCircle } from 'lucide-react'
import { apiUtils } from '../lib/supabase'

const ApiStatus = () => {
  const [status, setStatus] = useState({
    isOnline: true,
    lastCheck: new Date(),
    apiHealth: 'unknown'
  })

  useEffect(() => {
    checkApiStatus()
    const interval = setInterval(checkApiStatus, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const checkApiStatus = async () => {
    try {
      const isHealthy = await apiUtils.checkHealth()
      setStatus({
        isOnline: navigator.onLine,
        lastCheck: new Date(),
        apiHealth: isHealthy ? 'healthy' : 'error'
      })
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        isOnline: navigator.onLine,
        lastCheck: new Date(),
        apiHealth: 'error'
      }))
    }
  }

  const getStatusIcon = () => {
    if (!status.isOnline) return <WifiOff className="w-4 h-4 text-red-500" />
    if (status.apiHealth === 'healthy') return <CheckCircle className="w-4 h-4 text-green-500" />
    if (status.apiHealth === 'error') return <AlertCircle className="w-4 h-4 text-red-500" />
    return <Wifi className="w-4 h-4 text-yellow-500" />
  }

  const getStatusText = () => {
    if (!status.isOnline) return 'Offline'
    if (status.apiHealth === 'healthy') return 'Online'
    if (status.apiHealth === 'error') return 'API Error'
    return 'Checking...'
  }

  const getStatusColor = () => {
    if (!status.isOnline || status.apiHealth === 'error') return 'text-red-600'
    if (status.apiHealth === 'healthy') return 'text-green-600'
    return 'text-yellow-600'
  }

  return (
    <div className="flex items-center space-x-2 text-sm">
      {getStatusIcon()}
      <span className={getStatusColor()}>
        {getStatusText()}
      </span>
      <span className="text-gray-500 text-xs">
        {status.lastCheck.toLocaleTimeString()}
      </span>
    </div>
  )
}

export default ApiStatus
