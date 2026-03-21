import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Property, District, PropertyType } from '@/lib/types';

export interface PropertyFilters {
  district?: District;
  property_type?: PropertyType;
  max_guests?: number;
  featured?: boolean;
}

export function useProperties(filters: PropertyFilters = {}) {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: async () => {
      let query = supabase
        .from('properties')
        .select('*')
        .eq('is_published', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (filters.district)       query = query.eq('district', filters.district);
      if (filters.property_type)  query = query.eq('property_type', filters.property_type);
      if (filters.max_guests)     query = query.gte('max_guests', filters.max_guests);
      if (filters.featured)       query = query.eq('is_featured', true);

      const { data, error } = await query;
      if (error) throw error;
      return data as Property[];
    },
  });
}
