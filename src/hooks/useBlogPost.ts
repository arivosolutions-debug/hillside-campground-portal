import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { BlogPost } from '@/lib/types';

export function useBlogPost(slug: string | undefined) {
  return useQuery({
    queryKey: ['blog-post', slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug!)
        .eq('is_published', true)
        .single();

      if (error) throw error;
      return data as BlogPost;
    },
  });
}
