-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_email VARCHAR(255) NOT NULL,
  client_name VARCHAR(255),
  appointment_date TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  google_calendar_event_id VARCHAR(255),
  google_meet_link TEXT,
  status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'rescheduled')),
  notes TEXT,
  reminder_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_email ON appointments(client_email);
CREATE INDEX idx_appointments_status ON appointments(status);

-- Enable RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users (admin) to see all appointments
CREATE POLICY "Admin can view all appointments" ON appointments
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for authenticated users (admin) to insert appointments
CREATE POLICY "Admin can insert appointments" ON appointments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy for authenticated users (admin) to update appointments
CREATE POLICY "Admin can update appointments" ON appointments
  FOR UPDATE
  TO authenticated
  USING (true);

-- Policy for authenticated users (admin) to delete appointments
CREATE POLICY "Admin can delete appointments" ON appointments
  FOR DELETE
  TO authenticated
  USING (true);

-- Policy for anonymous users to insert their own appointments
CREATE POLICY "Anyone can book appointments" ON appointments
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_appointments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_appointments_updated_at();
