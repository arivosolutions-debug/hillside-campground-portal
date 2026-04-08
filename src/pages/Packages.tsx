import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { usePackages } from '@/hooks/usePackages';
import { MapPin, ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const HERO_BG =
  'https://images.unsplash.com/photo-1501854140801-74d5b45bd3c7?auto=format&fit=crop&w=1920&q=80';

const PAGE_SIZE = 8;

const Packages: React.FC = () => {
  const [region, setRegion] = useState('');
  const [page, setPage] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const filterSentinelRef = useRef<HTMLDivElement>(null);

  const { data: packages, isLoading } = usePackages({
    region: region || undefined,
  });

  useEffect(() => setPage(0), [region]);

  // Sticky observer
  useEffect(() => {
    const sentinel = filterSentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-72px 0px 0px 0px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const totalPages = Math.ceil((packages?.length ?? 0) / PAGE_SIZE);
  const paged = packages?.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE) ?? [];

  const filterBar = (
    <div className={`bg-[#17341e]/80 backdrop-blur-xl rounded-2xl px-6 py-4 flex items-center justify-between gap-4 ${isSticky ? '' : ''}`}>
      <div className="flex items-center gap-6">
        <span className="text-white/40 text-[10px] font-body uppercase tracking-[0.2em]">Locations</span>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="bg-transparent text-white font-body text-sm border-none outline-none cursor-pointer appearance-none pr-4"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right center' }}
        >
          <option value="" className="text-black">All Regions</option>
          <option value="South India" className="text-black">South India</option>
          <option value="North India" className="text-black">North India</option>
        </select>
      </div>
      {!isLoading && packages && (
        <span className="text-white/50 text-xs font-body">
          Showing {packages.length} {packages.length === 1 ? 'package' : 'packages'}
        </span>
      )}
    </div>
  );

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="min-h-screen bg-hc-bg">
          {/* Hero */}
          <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
            <img
              src={HERO_BG}
              alt="Western Ghats forest"
              className="absolute inset-0 w-full h-full object-cover brightness-[0.45]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
              <span className="font-body uppercase tracking-[0.3em] text-white/50 text-xs mb-3">
                Discover
              </span>
              <h1 className="font-headline italic text-white text-5xl md:text-7xl leading-[0.95] tracking-tight">
                Your Experience
              </h1>
              <p className="text-white/60 text-sm md:text-base mt-4 font-body max-w-md">
                Curated experiences made just for you!
              </p>
            </div>

            <div ref={filterSentinelRef} className="absolute bottom-0 left-0 right-0 h-1" />

            {/* Filter bar overlapping hero bottom */}
            {!isSticky && (
              <div className="absolute bottom-6 left-0 right-0 z-30 px-5 md:px-8">
                <div className="max-w-[1280px] mx-auto">
                  {filterBar}
                </div>
              </div>
            )}
          </section>

          {/* Sticky filter bar */}
          {isSticky && (
            <div className="sticky top-[72px] z-40 px-5 md:px-8">
              <div className="max-w-[1280px] mx-auto">
                {filterBar}
              </div>
            </div>
          )}

          {/* Cards Grid */}
          <section className="px-5 md:px-8 max-w-[1280px] mx-auto pt-10 pb-12">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-[4/3] rounded-xl" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : paged.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-headline italic text-2xl text-hc-text/50">No experiences found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {paged.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => { setPage(i); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                      page === i
                        ? 'bg-hc-primary text-white'
                        : 'bg-transparent text-hc-primary border border-hc-text-light/30 hover:bg-hc-bg-alt'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </section>
        </main>
        <Footer />
      </PageTransition>
    </>
  );
};

/* ── Package Card ── */
interface PackageCardProps {
  pkg: {
    id: string;
    name: string;
    slug: string;
    location: string | null;
    duration_days: number | null;
    duration_nights: number | null;
    tags: string[] | null;
    hero_images: string[] | null;
  };
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  const image = pkg.hero_images?.[0] ?? '/placeholder.svg';

  return (
    <Link
      to={`/packages/${pkg.slug}`}
      className="group block"
    >
      {/* Image */}
      <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4">
        <img
          src={image}
          alt={pkg.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Name */}
      <h3 className="font-headline text-lg text-hc-primary leading-snug mb-1">
        {pkg.name}
      </h3>

      {/* Location */}
      {pkg.location && (
        <p className="flex items-center gap-1 text-hc-text-light text-xs font-body mb-2">
          <MapPin size={12} />
          {pkg.location}
        </p>
      )}

      {/* Duration badge */}
      {pkg.duration_days && pkg.duration_nights && (
        <span className="inline-block bg-hc-bg-alt text-hc-text text-[11px] font-body font-medium px-3 py-1 rounded-full mb-3">
          {pkg.duration_days} D / {pkg.duration_nights} N
        </span>
      )}

      {/* Tags */}
      {pkg.tags && pkg.tags.length > 0 && (
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar mb-3">
          {pkg.tags.map((tag) => (
            <span
              key={tag}
              className="shrink-0 bg-hc-primary text-white text-[10px] font-body px-2.5 py-1 rounded-full capitalize"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Learn More */}
      <span className="inline-flex items-center gap-1 text-hc-secondary text-xs font-body font-medium group-hover:underline">
        Learn More <ArrowRight size={12} />
      </span>
    </Link>
  );
};

export default Packages;
