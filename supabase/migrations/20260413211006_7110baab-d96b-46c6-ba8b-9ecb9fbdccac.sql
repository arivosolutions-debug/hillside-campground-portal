
ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS nearest_airport text,
  ADD COLUMN IF NOT EXISTS nearest_airport_distance text,
  ADD COLUMN IF NOT EXISTS nearest_railway text,
  ADD COLUMN IF NOT EXISTS nearest_railway_distance text,
  ADD COLUMN IF NOT EXISTS travel_tips text;
