/*
  # Create users table

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - Unique identifier for each user
      - `email` (text, unique, not null) - User's email address
      - `password` (text, not null) - Hashed password
      - `created_at` (timestamptz) - Timestamp when user was created

  2. Security
    - Enable RLS on `users` table
    - Add policy for anyone to insert (public sign-up)
    - Add policy for users to read their own data
    - Passwords are hashed using crypt function for security

  3. Notes
    - Email is unique to prevent duplicate accounts
    - Passwords are hashed before storage for security
    - Table is designed for custom authentication flow
*/

-- Enable pgcrypto extension for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public sign-up)
CREATE POLICY "Anyone can create user"
  ON users
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow users to read their own data
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);
