/*
  # Remove password column from users table

  1. Changes
    - Remove `password` column from `users` table
    - Password is managed by Supabase Auth in auth.users table
    - Custom users table should only store additional user profile data

  2. Security
    - No changes to RLS policies
    - Authentication is handled by Supabase Auth

  3. Notes
    - This aligns with Supabase Auth best practices
    - Passwords are securely stored by Supabase in auth.users table
*/

-- Remove password column from users table
ALTER TABLE users DROP COLUMN IF EXISTS password;
