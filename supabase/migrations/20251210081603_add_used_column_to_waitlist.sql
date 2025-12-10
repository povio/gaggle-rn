/*
  # Add used column to waitlist table

  1. Changes
    - Add `used` column to `waitlist` table
      - Type: boolean
      - Default: false
      - Tracks whether an invitation code has been used

  2. Notes
    - This column helps prevent invitation code reuse
    - Defaults to false for all existing entries
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'waitlist' AND column_name = 'used'
  ) THEN
    ALTER TABLE waitlist ADD COLUMN used boolean DEFAULT false NOT NULL;
  END IF;
END $$;
