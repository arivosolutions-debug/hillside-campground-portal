import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Users, Leaf, MessageCircle, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { PhotoGallery } from '@/components/property/PhotoGallery';
import { AmenitiesSidebar } from '@/components/property/AmenitiesSidebar';
import { RoomTypesList } from '@/components/property/RoomTypesList';
import { NearbyAttractions } from '@/components/property/NearbyAttractions';
import { MapEmbed } from '@/components/property/MapEmbed';
import { WhatsAppWidget } from '@/components/property/WhatsAppWidget';
import { useProperty } from '@/hooks/useProperty';
import { DISTRICT_LABELS, PROPERTY_TYPE_LABELS } from '@/lib/types';

const WHATSAPP_PHONE = '919847012345';

const PropertyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: property, isLoading, error } = useProperty(slug);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-hc-bg flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-hc-secondary border-t-transparent rounded-full animate-spin" />
        </div>
      </>
    );
  }

  if (error || !property) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-hc-bg flex flex-col items-center justify-center gap-4">
          <h1 className="font-headline text-4xl text-hc-primary">Retreat not found</h1>
          <Link to="/stays" className="font-body text-hc-secondary hover:underline">← Back to all retreats</Link>
        </div>
      </>
    );
  }

  const whatsappMsg  = encodeURIComponent(`Hi, I'm interested in ${property.name} at Hills Camp Kerala.`);
  const whatsappHref = `https://wa.me/${WHATSAPP_PHONE}?text=${whatsappMsg}`;
  const districtLabel = DISTRICT_LABELS[property.district];

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="bg-hc-bg">

          {/* ── Property Header ───────────────────────────────────────────── */}
          <section className="pt-28 pb-6 px-8 max-w-[1280px] mx-auto">
            <Link
              to="/stays"
              className="inline-flex items-center gap-2 text-hc-text-light hover:text-hc-primary font-body text-sm mb-6 transition-colors"
            >
              <ArrowLeft size={14} /> All Retreats
            </Link>

            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="bg-hc-accent-light text-[#360f00] text-xs font-bold uppercase tracking-tight px-3 py-1 rounded-full font-body">
                    {PROPERTY_TYPE_LABELS[property.property_type]}
                  </span>
                  <span className="text-sm text-hc-text flex items-center gap-1 font-body">
                    <MapPin size={12} strokeWidth={1.5} /> {districtLabel}, Kerala
                  </span>
                </div>
                <h1 className="font-headline text-hc-primary text-4xl md:text-6xl tracking-tight mb-3">
                  {property.name}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-sm text-hc-text font-body">
                  <span className="flex items-center gap-1.5">
                    <Users size={16} strokeWidth={1.5} /> Up to {property.max_guests} Guests
                  </span>
                </div>
              </div>

              {/* Desktop pricing / enquiry CTA */}
              <div className="mt-4 md:mt-0 text-right shrink-0">
                <p className="text-xs text-hc-text-light uppercase tracking-wider mb-1 font-body">Starting from</p>
                <p className="font-headline text-hc-primary text-2xl">Contact for</p>
                <p className="font-headline text-hc-primary text-lg">Pricing</p>
              </div>
            </div>
          </section>

          {/* ── Photo Gallery ─────────────────────────────────────────────── */}
          <section className="px-8 max-w-[1280px] mx-auto mb-12">
            <PhotoGallery
              coverImage={property.cover_image}
              images={property.property_images}
              propertyName={property.name}
            />
          </section>

          {/* ── Content + Sidebar ─────────────────────────────────────────── */}
          <section className="px-8 max-w-[1280px] mx-auto mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* ── Main column ─────────────────────────────────────────── */}
              <div className="lg:col-span-2">

                {/* Description */}
                <h2 className="font-headline text-hc-primary text-3xl mb-6">
                  {property.tagline ?? 'Nature Meets Comfort'}
                </h2>
                {property.description && (
                  <p className="text-hc-text text-lg leading-relaxed mb-10">
                    {property.description}
                  </p>
                )}

                {/* Highlights + Experience */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {property.highlights && property.highlights.length > 0 && (
                    <div className="bg-hc-bg-alt rounded-2xl p-8">
                      <h3 className="font-headline text-hc-primary text-xl mb-6">Highlights</h3>
                      <div className="space-y-5">
                        {property.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <Leaf size={18} strokeWidth={1.5} className="text-hc-secondary mt-0.5 shrink-0" />
                            <p className="text-sm text-hc-text font-body">{h}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-hc-bg-alt rounded-2xl p-8">
                    <h3 className="font-headline text-hc-primary text-xl mb-4">The Experience</h3>
                    <p className="text-sm text-hc-text leading-relaxed mb-4 font-body">
                      Every stay at Hills Camp includes a guided morning walk through our private estate,
                      led by our resident naturalist who shares the secrets of the Western Ghats' biodiversity.
                    </p>
                    <a
                      href="/contact"
                      className="text-hc-primary font-bold text-sm underline decoration-hc-text-light/30 underline-offset-4 hover:decoration-hc-primary transition-colors font-body"
                    >
                      View Full Experience Guide →
                    </a>
                  </div>
                </div>

                {/* Room Types */}
                <RoomTypesList rooms={property.room_types} coverImage={property.cover_image} />

                {/* Nearby Attractions */}
                <NearbyAttractions attractions={property.nearby_attractions} />

                {/* Map */}
                <MapEmbed
                  latitude={property.latitude}
                  longitude={property.longitude}
                  district={districtLabel}
                />
              </div>

              {/* ── Sidebar ─────────────────────────────────────────────── */}
              <div className="lg:col-span-1">
                {/* Amenities */}
                <AmenitiesSidebar amenities={property.amenities} />

                {/* Sticky availability CTA */}
                <div className="border border-hc-text-light/20 rounded-2xl p-8 sticky top-28">
                  <h3 className="font-headline text-hc-primary text-xl mb-3">Availability</h3>
                  <p className="text-sm text-hc-text leading-relaxed mb-6 font-body">
                    This property is highly sought after. We recommend booking at least 4 weeks in advance for weekends.
                  </p>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-hc-primary text-white w-full py-4 rounded-xl font-semibold text-center flex items-center justify-center gap-2 hover:bg-hc-primary-deep transition-colors font-body mb-3"
                  >
                    <MessageCircle size={18} strokeWidth={1.75} /> Enquire Now
                  </a>
                  <Link
                    to="/contact"
                    className="flex items-center justify-center w-full font-body font-semibold text-sm text-hc-primary border border-hc-text-light/20 py-4 rounded-xl hover:bg-hc-bg-alt transition-all"
                  >
                    Send Email Enquiry
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </PageTransition>

      {/* Mobile WhatsApp FAB */}
      <WhatsAppWidget propertyName={property.name} phone={WHATSAPP_PHONE} />
    </>
  );
};

export default PropertyDetail;
