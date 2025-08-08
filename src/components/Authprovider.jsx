import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription?.unsubscribe()
  }, [])

  const signUp = async (email, password, userData = {}) => {
    // Additional validation can be added here
    if (!email || !password) {
      return { data: null, error: { message: 'Email and password are required' } }
    }

    if (password.length < 6) {
      return { data: null, error: { message: 'Password must be at least 6 characters long' } }
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })

    if (data.user && !error) {
      // Create user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: data.user.email,
          full_name: userData.full_name || '',
          subscription_tier: 'free'
        })

      if (profileError) {
        console.error('Error creating profile:', profileError)
      }

      // Create initial portfolio
      const { error: portfolioError } = await supabase
        .from('portfolios')
        .insert({
          user_id: data.user.id,
          total_value: 0,
          available_balance: 0,
          invested_amount: 0
        })

      if (portfolioError) {
        console.error('Error creating portfolio:', portfolioError)
      }

      // Create default risk settings
      const { error: riskError } = await supabase
        .from('risk_settings')
        .insert({
          user_id: data.user.id,
          max_position_size: 10.0,
          max_daily_loss: 5.0,
          stop_loss_percentage: 2.0,
          take_profit_percentage: 5.0,
          risk_tolerance: 'medium'
        })

      if (riskError) {
        console.error('Error creating risk settings:', riskError)
      }
    }

    return { data, error }
  }

  const signIn = async (email, password) => {
    return await supabase.auth.signInWithPassword({ email, password })
  }

  const signOut = async () => {
    return await supabase.auth.signOut()
  }

  const resetPassword = async (email) => {
    return await supabase.auth.resetPasswordForEmail(email)
  }

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
