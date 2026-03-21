import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Property, PropertyImage, RoomType, Amenity, NearbyAttraction } from '@/lib/types';

export interface PropertyDetail extends Property {
  property_images: PropertyImage[];
  room_types: RoomType[];
  amenities: Amenity[];
  nearby_attractions: NearbyAttraction[];
}

export function useProperty(slug: string | undefined) {
  return useQuery({
    queryKey: ['property', slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data: property, error } = await supabase
        .from('properties')
        .select('*')
        .eq('slug', slug!)
        .eq('is_published', true)
        .single();

      if (error) throw error;

      const [imagesRes, roomsRes, amenitiesRes, attractionsRes] = await Promise.all([
        supabase
          .from('property_images')
          .select('*')
          .eq('property_id', property.id)
          .order('sort_order'),
        supabase
          .from('room_types')
          .select('*')
          .eq('property_id', property.id),
        supabase
          .from('property_amenities')
          .select('amenities(*)')
          .eq('property_id', property.id),
        supabase
          .from('nearby_attractions')
          .select('*')
          .eq('property_id', property.id)
          .order('distance_km'),
      ]);

      const amenities = amenitiesRes.data
        ?.map((row: { amenities: Amenity | null }) => row.amenities)
        .filter(Boolean) as Amenity[];

      return {
        ...property,
        property_images: imagesRes.data ?? [],
        room_types: roomsRes.data ?? [],
        amenities: amenities ?? [],
        nearby_attractions: attractionsRes.data ?? [],
      } as PropertyDetail;
    },
  });
}
