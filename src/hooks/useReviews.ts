import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Review {
  id: string;
  quote: string;
  guest_name: string;
  guest_title: string | null;
  stayed_at: string | null;
  initials: string | null;
  is_featured: boolean;
}

export const useReviews = (featuredOnly = false) =>
  useQuery({
    queryKey: ['reviews', featuredOnly],
    queryFn: async () => {
      let q = supabase
        .from('reviews')
        .select('*')
        .order('sort_order', { ascending: true });
      if (featuredOnly) q = q.eq('is_featured', true);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as Review[];
    },
  });
