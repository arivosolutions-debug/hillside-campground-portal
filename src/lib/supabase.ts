// Re-export the canonical Supabase client from integrations
export { supabase } from '@/integrations/supabase/client';

/**
 * Returns the public URL for a file in a Supabase Storage bucket.
 * Usage: getImageUrl('property-images', 'my-property/cover.jpg')
 */
import { supabase as _supabase } from '@/integrations/supabase/client';
export const getImageUrl = (bucket: string, path: string): string => {
  return _supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
};
