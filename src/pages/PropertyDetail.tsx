import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Users, CheckCircle, ArrowLeft, MessageCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { HeritageBadge } from '@/components/shared/HeritageBadge';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { MistOverlay } from '@/components/shared/MistOverlay';
import { useProperty } from '@/hooks/useProperty';
import { DISTRICT_LABELS } from '@/lib/types';

const PropertyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: property, isLoading, error } = useProperty(slug);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
        </div>
      </>
    );
  }

  if (error || !property) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
          <h1 className="font-headline text-4xl text-on-surface">Retreat not found</h1>
          <Link to="/stays" className="font-body text-secondary hover:underline">← Back to all retreats</Link>
        </div>
      </>
    );
  }

  const whatsappMsg = encodeURIComponent(`Hi, I'm interested in ${property.name} at Hills Camp Kerala.`);

  return (
    <>
      <Navbar />
      <PageTransition>
        <main>
          {/* Hero */}
          <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
            <img
              src={property.cover_image ?? '/placeholder.svg'}
              alt={property.name}
              className="w-full h-full object-cover brightness-70"
            />
            <MistOverlay intensity="strong" />
            <div className="absolute bottom-0 left-0 right-0 z-10 max-w-screen-2xl mx-auto px-8 pb-16">
              <Link to="/stays" className="inline-flex items-center gap-2 font-body text-sm text-on-surface-variant hover:text-secondary mb-8 transition-colors">
                <ArrowLeft size={14} /> All Retreats
              </Link>
              <HeritageBadge type={property.property_type} className="mb-4" />
              <h1 className="font-headline text-4xl md:text-6xl text-on-surface leading-tight mb-3">
                {property.name}
              </h1>
              <div className="flex items-center gap-4 text-on-surface-variant">
                <div className="flex items-center gap-1.5"><MapPin size={14} /><span className="font-body text-sm">{DISTRICT_LABELS[property.district]}, Kerala</span></div>
                <span>·</span>
                <div className="flex items-center gap-1.5"><Users size={14} /><span className="font-body text-sm">Up to {property.max_guests} guests</span></div>
                {property.price_per_night && (
                  <>
                    <span>·</span>
                    <span className="font-body font-bold text-secondary">₹{property.price_per_night.toLocaleString()}/night</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="bg-background py-20 px-8">
            <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Main content */}
              <div className="lg:col-span-8 space-y-16">
                {/* Tagline */}
                {property.tagline && (
                  <p className="font-headline text-2xl text-secondary italic">&ldquo;{property.tagline}&rdquo;</p>
                )}

                {/* Description */}
                {property.description && (
                  <div>
                    <SectionLabel className="mb-6">About</SectionLabel>
                    <p className="font-body text-on-surface-variant leading-relaxed text-lg">{property.description}</p>
                  </div>
                )}

                {/* Highlights */}
                {property.highlights && property.highlights.length > 0 && (
                  <div>
                    <SectionLabel className="mb-6">Highlights</SectionLabel>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {property.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3">
                          <CheckCircle size={16} className="text-secondary mt-0.5 shrink-0" />
                          <span className="font-body text-sm text-on-surface-variant">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Amenities */}
                {property.amenities.length > 0 && (
                  <div>
                    <SectionLabel className="mb-6">Amenities</SectionLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {property.amenities.map((a) => (
                        <div key={a.id} className="bg-surface-high rounded-2xl px-4 py-3 flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-secondary/60 shrink-0" />
                          <span className="font-body text-sm text-on-surface-variant">{a.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Nearby */}
                {property.nearby_attractions.length > 0 && (
                  <div>
                    <SectionLabel className="mb-6">Nearby</SectionLabel>
                    <div className="space-y-3">
                      {property.nearby_attractions.map((a) => (
                        <div key={a.id} className="flex items-start justify-between gap-4 bg-surface-high rounded-2xl px-5 py-4">
                          <span className="font-body text-sm text-on-surface">{a.name}</span>
                          {a.distance_km && (
                            <span className="font-label text-[10px] text-secondary shrink-0">{a.distance_km} km</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sticky sidebar CTA */}
              <div className="lg:col-span-4">
                <div className="sticky top-28 bg-surface-high rounded-3xl p-8 border border-white/5">
                  <h3 className="font-headline text-2xl text-on-surface mb-2">Plan Your Stay</h3>
                  <p className="font-body text-sm text-on-surface-variant mb-6">
                    Enquire directly for availability and personalised itineraries.
                  </p>
                  {property.price_per_night && (
                    <div className="mb-6 pb-6 border-b border-white/5">
                      <span className="font-body text-sm text-on-surface-variant">Starting from</span>
                      <div className="font-headline text-3xl text-secondary">
                        ₹{property.price_per_night.toLocaleString()}
                        <span className="font-body text-base text-on-surface-variant font-normal">/night</span>
                      </div>
                    </div>
                  )}
                  <a
                    href={`https://wa.me/919876543210?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full font-body font-bold bg-secondary-container text-on-secondary-container py-4 rounded-full mb-3 transition-all hover:brightness-110 active:scale-[0.97]"
                  >
                    <MessageCircle size={18} /> WhatsApp Enquiry
                  </a>
                  <Link
                    to="/contact"
                    className="flex items-center justify-center w-full font-body font-semibold text-sm text-on-surface border border-white/15 py-4 rounded-full hover:bg-white/5 transition-all"
                  >
                    Send Email Enquiry
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </PageTransition>
    </>
  );
};

export default PropertyDetail;
