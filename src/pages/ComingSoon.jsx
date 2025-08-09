import React from 'react'
import { useLocation } from 'react-router-dom'

const ComingSoon = () => {
  const location = useLocation()

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-blue-600 mb-4">🚧 Coming Soon</h1>
      <p className="text-gray-600 text-lg">
        The page <span className="font-mono text-blue-500">{location.pathname}</span> is under construction.
      </p>
    </div>
  )
}

export default ComingSoon
