import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { BlogPost } from '@/lib/types';

export function useBlogPosts(category?: string, limit?: number) {
  return useQuery({
    queryKey: ['blog-posts', category, limit],
    queryFn: async () => {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (category) query = query.eq('category', category);
      if (limit)    query = query.limit(limit);

      const { data, error } = await query;
      if (error) throw error;
      return data as BlogPost[];
    },
  });
}
