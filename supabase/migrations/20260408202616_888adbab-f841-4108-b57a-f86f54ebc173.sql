
-- Create packages table
CREATE TABLE public.packages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  location text,
  region text,
  duration_days integer,
  duration_nights integer,
  price_inr integer,
  distance_km numeric,
  coordinates jsonb,
  tags text[],
  hero_images text[],
  itinerary jsonb,
  whats_not_included text[],
  terms_conditions text[],
  instagram_hashtag text,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create package_gallery table
CREATE TABLE public.package_gallery (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  package_id uuid NOT NULL REFERENCES public.packages(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_text text,
  display_order integer DEFAULT 0
);

-- Enable RLS
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_gallery ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Packages are publicly readable"
  ON public.packages FOR SELECT
  USING (true);

CREATE POLICY "Package gallery is publicly readable"
  ON public.package_gallery FOR SELECT
  USING (true);

-- Auto-update timestamp trigger
CREATE TRIGGER update_packages_updated_at
  BEFORE UPDATE ON public.packages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
