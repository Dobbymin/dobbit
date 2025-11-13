-- Create market_orders table for real-time orderbook data
CREATE TABLE IF NOT EXISTS market_orders (
  id BIGSERIAL PRIMARY KEY,
  market VARCHAR(20) NOT NULL UNIQUE,
  orderbook_units JSONB NOT NULL,
  timestamp BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster market lookup
CREATE INDEX IF NOT EXISTS idx_market_orders_market ON market_orders(market);
CREATE INDEX IF NOT EXISTS idx_market_orders_timestamp ON market_orders(timestamp);

-- Enable Row Level Security
ALTER TABLE market_orders ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for authenticated users
CREATE POLICY "Allow all operations for authenticated users" 
  ON market_orders 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- Create policy to allow read access for anonymous users
CREATE POLICY "Allow read access for anonymous users" 
  ON market_orders 
  FOR SELECT 
  TO anon 
  USING (true);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE market_orders;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_market_orders_updated_at 
  BEFORE UPDATE ON market_orders 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
