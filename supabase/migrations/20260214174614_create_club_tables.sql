/*
  # Create Club Website Tables

  1. New Tables
    - `team_members`
      - `id` (uuid, primary key)
      - `name` (text, member name)
      - `position` (text, role/position in club)
      - `email` (text, contact email)
      - `linkedin_url` (text, LinkedIn profile link)
      - `image_url` (text, profile image URL)
      - `display_order` (integer, for sorting members)
      - `created_at` (timestamptz)
    
    - `events`
      - `id` (uuid, primary key)
      - `title` (text, event name)
      - `description` (text, event description)
      - `event_date` (timestamptz, date and time of event)
      - `venue` (text, event location)
      - `image_url` (text, event image)
      - `is_upcoming` (boolean, to distinguish upcoming from past events)
      - `registration_link` (text, optional registration URL)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access (club website is public)
    - Restrict write access to authenticated users only
*/

CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  email text NOT NULL,
  linkedin_url text,
  image_url text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  event_date timestamptz NOT NULL,
  venue text NOT NULL,
  image_url text,
  is_upcoming boolean DEFAULT true,
  registration_link text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view team members"
  ON team_members FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert team members"
  ON team_members FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update team members"
  ON team_members FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete team members"
  ON team_members FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can view events"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update events"
  ON events FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete events"
  ON events FOR DELETE
  TO authenticated
  USING (true);