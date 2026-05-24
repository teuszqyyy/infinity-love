-- ============================================
-- InfinityLove — Supabase Migration
-- ============================================
-- Run this entire script in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ============================================

-- ============================================
-- 1. PAGES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  person_name TEXT NOT NULL,
  cover_photo_url TEXT,
  song_title TEXT,
  song_artist TEXT,
  relationship_start DATE,
  message TEXT,
  gallery_photo_urls JSONB DEFAULT '[]'::jsonb,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_created_at ON pages(created_at DESC);

-- ============================================
-- 2. ROW LEVEL SECURITY
-- ============================================

ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Anyone can read published pages
CREATE POLICY "Anyone can read published pages"
  ON pages FOR SELECT
  USING (is_published = true);

-- Anyone can create pages (no auth required)
CREATE POLICY "Anyone can create pages"
  ON pages FOR INSERT
  WITH CHECK (true);

-- ============================================
-- 3. AUTO-UPDATE updated_at TRIGGER
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER pages_set_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 4. STORAGE BUCKET — pages
-- ============================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('pages', 'pages', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to upload images to the pages bucket
CREATE POLICY "Anyone can upload page images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'pages');

-- Allow public read access to page images
CREATE POLICY "Public read for page images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'pages');

-- ============================================
-- Done! Your InfinityLove database is ready.
-- ============================================
