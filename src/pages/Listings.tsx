import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { FilterBar } from '@/components/listings/FilterBar';
import { PropertyGrid } from '@/components/listings/PropertyGrid';
import { useProperties } from '@/hooks/useProperties';
import type { District, PropertyType } from '@/lib/types';

const PAGE_SIZE = 9;

const Listings = () => {
  const [searchParams] = useSearchParams();
  const [district,     setDistrict]     = useState<District | ''>((searchParams.get('district') as District) ?? '');
  const [propertyType, setPropertyType] = useState<PropertyType | ''>((searchParams.get('type') as PropertyType) ?? '');
  const [guests,       setGuests]       = useState<number>(Number(searchParams.get('guests')) || 2);
  const [page,         setPage]         = useState(0);

  useEffect(() => {
    setDistrict((searchParams.get('district') as District) ?? '');
    setPropertyType((searchParams.get('type') as PropertyType) ?? '');
    setGuests(Number(searchParams.get('guests')) || 2);
    setPage(0);
  }, [searchParams]);

  const { data: properties, isLoading } = useProperties({
    district:      district || undefined,
    property_type: propertyType || undefined,
    max_guests:    guests > 1 ? guests : undefined,
  });

  const paged = properties?.slice(0, (page + 1) * PAGE_SIZE) ?? [];
  const hasMore = (properties?.length ?? 0) > paged.length;

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="min-h-screen bg-hc-bg">

          {/* Page Header */}
          <section className="pt-36 pb-8 px-8 max-w-[1280px] mx-auto">
            <h1 className="font-headline text-hc-primary text-5xl md:text-7xl tracking-tight mb-4">
              Discover Your Escape
            </h1>
            <p className="text-hc-text text-lg max-w-2xl font-light leading-relaxed">
              Curated wilderness retreats across the Western Ghats, designed for luxury family immersion.
            </p>
          </section>

          {/* Sticky Filter Bar */}
          <section className="bg-hc-bg/95 shadow-[0_1px_0_0_rgba(23,52,30,0.06)] px-8">
            <div className="max-w-[1280px] mx-auto py-4">
              <FilterBar
                district={district}
                propertyType={propertyType}
                guests={guests}
                onDistrict={(v) => { setDistrict(v); setPage(0); }}
                onPropertyType={(v) => { setPropertyType(v); setPage(0); }}
                onGuests={(v) => { setGuests(v); setPage(0); }}
                totalCount={properties?.length}
              />
            </div>
          </section>

          {/* Grid */}
          <section className="px-8 max-w-[1280px] mx-auto py-12">
            <PropertyGrid properties={paged} isLoading={isLoading} />

            {/* Load More */}
            {!isLoading && hasMore && (
              <div className="flex justify-center mt-16">
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="bg-hc-primary text-white px-10 py-4 rounded-full font-semibold font-body text-sm hover:bg-hc-primary-deep transition-all"
                >
                  Load More Retreats
                </button>
              </div>
            )}
          </section>
        </main>
        <Footer />
      </PageTransition>
    </>
  );
};

export default Listings;
