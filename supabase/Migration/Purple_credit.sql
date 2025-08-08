/*
  # AI Trading Genie Database Schema

  1. New Tables
    - `portfolios` - User portfolio data and balances
    - `trades` - Trading history and records  
    - `trading_signals` - AI-generated trading signals
    - `subscriptions` - User subscription plans
    - `payments` - Payment history and transactions
    - `notifications` - User notifications
    - `risk_settings` - Risk management settings

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Public read access for trading signals

  3. Performance
    - Add indexes for frequently queried columns
    - Optimize for user-based queries
*/

-- Update existing profiles table to match our needs
DO $$
BEGIN
  -- Add missing columns to profiles table if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'subscription_tier'
  ) THEN
    ALTER TABLE profiles ADD COLUMN subscription_tier text DEFAULT 'free';
  END IF;
END $$;

-- Create portfolios table
CREATE TABLE IF NOT EXISTS portfolios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  total_value decimal(15,2) DEFAULT 0,
  available_balance decimal(15,2) DEFAULT 0,
  invested_amount decimal(15,2) DEFAULT 0,
  total_profit decimal(15,2) DEFAULT 0,
  total_loss decimal(15,2) DEFAULT 0,
  risk_score decimal(3,1) DEFAULT 5.0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create trades table (updated to match existing Trades table structure)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'trades') THEN
    CREATE TABLE trades (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
      trade_id text UNIQUE NOT NULL,
      symbol text NOT NULL,
      side text NOT NULL CHECK (side IN ('buy', 'sell')),
      amount decimal(15,8) NOT NULL,
      price decimal(15,2) NOT NULL,
      type text NOT NULL CHECK (type IN ('market', 'limit')),
      status text DEFAULT 'pending' CHECK (status IN ('pending', 'filled', 'cancelled', 'failed')),
      profit decimal(15,2) DEFAULT 0,
      fees decimal(15,2) DEFAULT 0,
      executed_at timestamptz DEFAULT now(),
      created_at timestamptz DEFAULT now()
    );
  END IF;
END $$;

-- Create trading_signals table
CREATE TABLE IF NOT EXISTS trading_signals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol text NOT NULL,
  action text NOT NULL CHECK (action IN ('buy', 'sell', 'hold')),
  confidence decimal(3,2) NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
  target_price decimal(15,2),
  stop_loss decimal(15,2),
  reasoning text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  plan_name text NOT NULL,
  plan_price decimal(10,2) NOT NULL,
  billing_cycle text DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'yearly')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  started_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  subscription_id uuid REFERENCES subscriptions(id),
  amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'USD',
  payment_method text,
  stripe_payment_id text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  created_at timestamptz DEFAULT now()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create risk_settings table
CREATE TABLE IF NOT EXISTS risk_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  max_position_size decimal(5,2) DEFAULT 10.0,
  max_daily_loss decimal(5,2) DEFAULT 5.0,
  stop_loss_percentage decimal(5,2) DEFAULT 2.0,
  take_profit_percentage decimal(5,2) DEFAULT 5.0,
  risk_tolerance text DEFAULT 'medium' CHECK (risk_tolerance IN ('low', 'medium', 'high')),
  auto_trading_enabled boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security on new tables
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE trading_signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_settings ENABLE ROW LEVEL SECURITY;

-- Enable RLS on trades table if it exists and doesn't have RLS
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'trades') THEN
    ALTER TABLE trades ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Create RLS Policies

-- Portfolios policies
CREATE POLICY "Users can read own portfolio"
  ON portfolios FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own portfolio"
  ON portfolios FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own portfolio"
  ON portfolios FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Trades policies (only create if table exists and policies don't exist)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'trades') THEN
    -- Check if policies already exist before creating them
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE tablename = 'trades' AND policyname = 'Users can read own trades'
    ) THEN
      CREATE POLICY "Users can read own trades"
        ON trades FOR SELECT
        TO authenticated
        USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_policies 
      WHERE tablename = 'trades' AND policyname = 'Users can insert own trades'
    ) THEN
      CREATE POLICY "Users can insert own trades"
        ON trades FOR INSERT
        TO authenticated
        WITH CHECK (auth.uid() = user_id);
    END IF;
  END IF;
END $$;

-- Trading signals policies (public read access)
CREATE POLICY "Anyone can read active trading signals"
  ON trading_signals FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Subscriptions policies
CREATE POLICY "Users can read own subscriptions"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscriptions"
  ON subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Payments policies
CREATE POLICY "Users can read own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payments"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Notifications policies
CREATE POLICY "Users can read own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Risk settings policies
CREATE POLICY "Users can read own risk settings"
  ON risk_settings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own risk settings"
  ON risk_settings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own risk settings"
  ON risk_settings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_portfolios_user_id ON portfolios(user_id);
CREATE INDEX IF NOT EXISTS idx_trading_signals_symbol ON trading_signals(symbol);
CREATE INDEX IF NOT EXISTS idx_trading_signals_active ON trading_signals(is_active);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_risk_settings_user_id ON risk_settings(user_id);

-- Create indexes on trades table if it exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'trades') THEN
    CREATE INDEX IF NOT EXISTS idx_trades_user_id ON trades(user_id);
    CREATE INDEX IF NOT EXISTS idx_trades_symbol ON trades(symbol);
    CREATE INDEX IF NOT EXISTS idx_trades_executed_at ON trades(executed_at);
  END IF;
END $$;

-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER set_portfolios_updated_at
  BEFORE UPDATE ON portfolios
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_risk_settings_updated_at
  BEFORE UPDATE ON risk_settings
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
