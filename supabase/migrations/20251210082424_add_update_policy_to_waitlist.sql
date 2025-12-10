/*
  # Add UPDATE policy to waitlist table

  1. Security Changes
    - Add UPDATE policy to allow marking codes as used
    - Policy allows anyone (anon/authenticated) to update the `used` field
    - This is needed for the invitation code verification flow

  2. Notes
    - The policy is permissive to allow code verification before user authentication
    - Once a code is marked as used, the verification flow can proceed
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'waitlist' 
    AND policyname = 'Anyone can mark code as used'
  ) THEN
    CREATE POLICY "Anyone can mark code as used"
      ON waitlist
      FOR UPDATE
      TO anon, authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;
