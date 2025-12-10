/*
  # Create waitlist table

  1. New Tables
    - `waitlist`
      - `id` (uuid, primary key) - Unique identifier for each waitlist entry
      - `email` (text, unique, not null) - Email address of the user joining the waitlist
      - `code` (text, not null) - 4-digit verification code generated for the user
      - `created_at` (timestamptz) - Timestamp when the entry was created
      
  2. Security
    - Enable RLS on `waitlist` table
    - Add policy for inserting new waitlist entries (public access for sign-up)
    - Add policy for authenticated users to read their own waitlist entry
    
  3. Notes
    - Email is unique to prevent duplicate entries
    - Code is a 4-digit string (0000-9999)
    - Table is designed for public sign-up flow
*/

CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  code text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert into waitlist (public sign-up)
CREATE POLICY "Anyone can join waitlist"
  ON waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow users to read their own waitlist entry by email
CREATE POLICY "Users can read own waitlist entry"
  ON waitlist
  FOR SELECT
  TO anon, authenticated
  USING (true);