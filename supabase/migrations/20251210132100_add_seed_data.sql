/*
  # Add Seed Data for Testing

  1. Seed Data
    - Add sample waitlist entries with invitation codes
    - Add sample users with profile information
    - Add sample children associated with users
  
  2. Notes
    - This data is for UI demonstration and testing purposes
    - All passwords should be reset in production
    - Email addresses are fictional
*/

-- Add waitlist entries
INSERT INTO waitlist (email, code, used, created_at) VALUES
  ('alice@example.com', '1234', false, now() - interval '2 days'),
  ('bob@example.com', '5678', true, now() - interval '1 day'),
  ('carol@example.com', '9012', false, now() - interval '3 hours')
ON CONFLICT (email) DO NOTHING;

-- Add sample users (note: these are not connected to auth.users, just app data)
INSERT INTO users (id, email, user_name, first_name, last_name, street_address, city, state, zip_code, created_at) VALUES
  ('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'john.doe@example.com', 'johndoe', 'John', 'Doe', '123 Main St', 'Portland', 'OR', '97201', now() - interval '10 days'),
  ('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 'jane.smith@example.com', 'janesmith', 'Jane', 'Smith', '456 Oak Ave', 'Seattle', 'WA', '98101', now() - interval '5 days')
ON CONFLICT (id) DO NOTHING;

-- Add sample children
INSERT INTO children (user_id, first_name, last_name, birthdate, gender, age, school_name, created_at) VALUES
  ('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'Emma', 'Doe', '2015-05-10', 'Female', '9', 'Lincoln Elementary', now() - interval '10 days'),
  ('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'Liam', 'Doe', '2018-08-22', 'Male', '6', 'Lincoln Elementary', now() - interval '10 days'),
  ('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 'Olivia', 'Smith', '2016-03-15', 'Female', '8', 'Washington Middle School', now() - interval '5 days')
ON CONFLICT (id) DO NOTHING;
