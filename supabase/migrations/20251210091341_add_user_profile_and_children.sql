/*
  # Add User Profile and Children Tables

  1. Changes to users table
    - Add profile fields:
      - `user_name` (text, unique) - User's nickname/username (required)
      - `first_name` (text, optional) - User's first name
      - `last_name` (text, optional) - User's last name
      - `street_address` (text, optional) - Street address
      - `apartment` (text, optional) - Apartment, suite, etc.
      - `city` (text, optional) - City
      - `state` (text, optional) - State
      - `zip_code` (text, optional) - Zip code

  2. New Tables
    - `children`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `first_name` (text, optional)
      - `last_name` (text, optional)
      - `birthdate` (text, optional)
      - `gender` (text, optional)
      - `age` (text, optional)
      - `school_name` (text, optional)
      - `created_at` (timestamp)

  3. Security
    - Enable RLS on `children` table
    - Add policies for authenticated users to manage their own children
*/

-- Add profile fields to users table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'user_name'
  ) THEN
    ALTER TABLE users ADD COLUMN user_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'first_name'
  ) THEN
    ALTER TABLE users ADD COLUMN first_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'last_name'
  ) THEN
    ALTER TABLE users ADD COLUMN last_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'street_address'
  ) THEN
    ALTER TABLE users ADD COLUMN street_address text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'apartment'
  ) THEN
    ALTER TABLE users ADD COLUMN apartment text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'city'
  ) THEN
    ALTER TABLE users ADD COLUMN city text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'state'
  ) THEN
    ALTER TABLE users ADD COLUMN state text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'zip_code'
  ) THEN
    ALTER TABLE users ADD COLUMN zip_code text;
  END IF;
END $$;

-- Create children table
CREATE TABLE IF NOT EXISTS children (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  first_name text DEFAULT '',
  last_name text DEFAULT '',
  birthdate text DEFAULT '',
  gender text DEFAULT '',
  age text DEFAULT '',
  school_name text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on children table
ALTER TABLE children ENABLE ROW LEVEL SECURITY;

-- Policies for children table
CREATE POLICY "Users can view own children"
  ON children FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own children"
  ON children FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own children"
  ON children FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own children"
  ON children FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);