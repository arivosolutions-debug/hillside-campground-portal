import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Package } from './usePackages';

export interface PackageGalleryImage {
  id: string;
  image_url: string;
  alt_text: string | null;
  display_order: number | null;
}

export function usePackage(slug: string | undefined) {
  return useQuery({
    queryKey: ['package', slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('packages' as any)
        .select('*')
        .eq('slug', slug!)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      // Fetch gallery images
      const { data: gallery } = await supabase
        .from('package_gallery' as any)
        .select('*')
        .eq('package_id', (data as any).id)
        .order('display_order', { ascending: true });

      return {
        ...(data as unknown as Package),
        gallery: (gallery ?? []) as unknown as PackageGalleryImage[],
      };
    },
  });
}
