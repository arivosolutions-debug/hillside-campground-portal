import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { FilterBar } from '@/components/listings/FilterBar';
import { PropertyGrid } from '@/components/listings/PropertyGrid';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { useProperties } from '@/hooks/useProperties';
import type { District, PropertyType } from '@/lib/types';

const Listings = () => {
  const [searchParams] = useSearchParams();
  const [district,     setDistrict]     = useState<District | ''>((searchParams.get('district') as District) ?? '');
  const [propertyType, setPropertyType] = useState<PropertyType | ''>((searchParams.get('type') as PropertyType) ?? '');
  const [maxGuests,    setMaxGuests]    = useState<number>(Number(searchParams.get('guests')) || 1);

  useEffect(() => {
    setDistrict((searchParams.get('district') as District) ?? '');
    setPropertyType((searchParams.get('type') as PropertyType) ?? '');
    setMaxGuests(Number(searchParams.get('guests')) || 1);
  }, [searchParams]);

  const { data: properties, isLoading } = useProperties({
    district:      district || undefined,
    property_type: propertyType || undefined,
    max_guests:    maxGuests > 1 ? maxGuests : undefined,
  });

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="min-h-screen">
          {/* Header */}
          <div className="bg-surface-low pt-36 pb-16 px-8">
            <div className="max-w-screen-2xl mx-auto">
              <SectionLabel className="mb-6">Our Retreats</SectionLabel>
              <h1 className="font-headline text-5xl md:text-7xl text-on-surface leading-tight mb-4">
                Find your<br /><em className="text-secondary">wilderness.</em>
              </h1>
              <p className="font-body text-on-surface-variant max-w-xl mb-12">
                Eight luxury retreats across Kerala's most storied landscapes — from 
                misty Wayanad treehouses to Malabar Coast heritage bungalows.
              </p>
              <FilterBar
                district={district}
                propertyType={propertyType}
                maxGuests={maxGuests}
                onDistrict={setDistrict}
                onPropertyType={setPropertyType}
                onMaxGuests={setMaxGuests}
              />
            </div>
          </div>

          {/* Grid */}
          <div className="bg-background py-16 px-8">
            <div className="max-w-screen-2xl mx-auto">
              {!isLoading && properties && (
                <p className="font-body text-sm text-on-surface-variant mb-8">
                  {properties.length} {properties.length === 1 ? 'retreat' : 'retreats'} found
                </p>
              )}
              <PropertyGrid properties={properties ?? []} isLoading={isLoading} />
            </div>
          </div>
        </main>
        <Footer />
      </PageTransition>
    </>
  );
};

export default Listings;
