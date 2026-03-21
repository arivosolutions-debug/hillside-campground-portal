
-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Enums ──────────────────────────────────────────────────────────
CREATE TYPE property_type AS ENUM (
  'tree_house', 'backwater_villa', 'mountain_lookout', 
  'tea_estate_cabin', 'heritage_bungalow', 'riverside_cottage'
);

CREATE TYPE district AS ENUM (
  'wayanad', 'munnar', 'alleppey', 'thekkady', 
  'vagamon', 'kozhikode', 'kannur'
);

-- ─── Properties ─────────────────────────────────────────────────────
CREATE TABLE properties (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  district        district NOT NULL,
  property_type   property_type NOT NULL,
  tagline         TEXT,
  description     TEXT,
  highlights      TEXT[],
  max_guests      INT NOT NULL DEFAULT 2,
  price_per_night DECIMAL(10,2),
  latitude        DECIMAL(10, 8),
  longitude       DECIMAL(11, 8),
  cover_image     TEXT,
  is_featured     BOOLEAN DEFAULT false,
  is_published    BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Properties are publicly readable" ON properties FOR SELECT USING (is_published = true);

-- ─── Property Images ────────────────────────────────────────────────
CREATE TABLE property_images (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  image_url   TEXT NOT NULL,
  alt_text    TEXT,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Property images are publicly readable" ON property_images FOR SELECT USING (true);

-- ─── Room Types ─────────────────────────────────────────────────────
CREATE TABLE room_types (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  bed_type    TEXT,
  max_guests  INT DEFAULT 2,
  description TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE room_types ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Room types are publicly readable" ON room_types FOR SELECT USING (true);

-- ─── Amenities ──────────────────────────────────────────────────────
CREATE TABLE amenities (
  id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name     TEXT NOT NULL,
  icon     TEXT,
  category TEXT
);

ALTER TABLE amenities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Amenities are publicly readable" ON amenities FOR SELECT USING (true);

-- ─── Property <-> Amenities ─────────────────────────────────────────
CREATE TABLE property_amenities (
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  amenity_id  UUID REFERENCES amenities(id) ON DELETE CASCADE,
  PRIMARY KEY (property_id, amenity_id)
);

ALTER TABLE property_amenities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Property amenities are publicly readable" ON property_amenities FOR SELECT USING (true);

-- ─── Nearby Attractions ─────────────────────────────────────────────
CREATE TABLE nearby_attractions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  distance_km DECIMAL(5, 1),
  description TEXT
);

ALTER TABLE nearby_attractions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Nearby attractions are publicly readable" ON nearby_attractions FOR SELECT USING (true);

-- ─── Blog Posts ─────────────────────────────────────────────────────
CREATE TABLE blog_posts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  slug         TEXT UNIQUE NOT NULL,
  excerpt      TEXT,
  content      TEXT,
  cover_image  TEXT,
  category     TEXT,
  tags         TEXT[],
  is_published BOOLEAN DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at   TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Blog posts are publicly readable" ON blog_posts FOR SELECT USING (is_published = true);

-- ─── Enquiries ──────────────────────────────────────────────────────
CREATE TABLE enquiries (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  message     TEXT,
  property_id UUID REFERENCES properties(id),
  created_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit enquiries" ON enquiries FOR INSERT WITH CHECK (true);

-- ─── Team Members ───────────────────────────────────────────────────
CREATE TABLE team_members (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  role       TEXT NOT NULL,
  bio        TEXT,
  photo_url  TEXT,
  sort_order INT DEFAULT 0
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Team members are publicly readable" ON team_members FOR SELECT USING (true);

-- ─── Updated-at trigger ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ─── Storage Buckets ────────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public) VALUES ('property-images', 'property-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images',     'blog-images',     true);
INSERT INTO storage.buckets (id, name, public) VALUES ('team-photos',     'team-photos',     true);
INSERT INTO storage.buckets (id, name, public) VALUES ('general',         'general',         true);

CREATE POLICY "Property images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'property-images');
CREATE POLICY "Blog images are publicly accessible"     ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');
CREATE POLICY "Team photos are publicly accessible"     ON storage.objects FOR SELECT USING (bucket_id = 'team-photos');
CREATE POLICY "General assets are publicly accessible"  ON storage.objects FOR SELECT USING (bucket_id = 'general');
