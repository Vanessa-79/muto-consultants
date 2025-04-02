/*
  # Initial Jobs Portal Schema

  1. New Tables
    - `jobs`
      - `id` (uuid, primary key)
      - `title` (text)
      - `company` (text)
      - `location` (text)
      - `description` (text)
      - `requirements` (text)
      - `salary_range` (text)
      - `type` (text)
      - `created_at` (timestamp)
      - `deadline` (timestamp)
      - `status` (text)
    
    - `applications`
      - `id` (uuid, primary key)
      - `job_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `status` (text)
      - `created_at` (timestamp)
      - `resume_url` (text)
      - `cover_letter` (text)

    - `profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `full_name` (text)
      - `email` (text)
      - `phone` (text)
      - `location` (text)
      - `bio` (text)
      - `skills` (text[])
      - `experience` (jsonb)
      - `education` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create jobs table
CREATE TABLE jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  requirements text NOT NULL,
  salary_range text,
  type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  deadline timestamptz NOT NULL,
  status text DEFAULT 'active'
);

-- Create applications table
CREATE TABLE applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id),
  user_id uuid REFERENCES auth.users(id),
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  resume_url text,
  cover_letter text,
  UNIQUE(job_id, user_id)
);

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  location text,
  bio text,
  skills text[],
  experience jsonb DEFAULT '[]'::jsonb,
  education jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for jobs
CREATE POLICY "Jobs are viewable by everyone"
  ON jobs FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Jobs can be created by authenticated users"
  ON jobs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policies for applications
CREATE POLICY "Users can view their own applications"
  ON applications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications"
  ON applications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create policies for profiles
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);