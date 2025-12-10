/*
  # Fix users table insert policy

  1. Changes
    - Drop existing restrictive insert policy
    - Add new policy that allows public (unauthenticated) inserts
    - This enables user registration without authentication

  2. Security Notes
    - Users can self-register by inserting their email and password
    - Password hashing should be handled at the application level
    - Once registered, users should authenticate using Supabase Auth or custom logic
*/

-- Drop the existing policy
DROP POLICY IF EXISTS "Anyone can create user" ON users;

-- Create a new policy that allows public inserts
CREATE POLICY "Enable insert for public"
  ON users
  FOR INSERT
  TO public
  WITH CHECK (true);
