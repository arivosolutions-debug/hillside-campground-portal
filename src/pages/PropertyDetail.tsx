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
import { MobileHeroSlideshow } from '@/components/property/MobileHeroSlideshow';
import { MobileGalleryButton } from '@/components/property/MobileGalleryButton';
import { MobileRoomCards } from '@/components/property/MobileRoomCards';
import { BookNowModal } from '@/components/property/BookNowModal';
import { AmenitiesGrid } from '@/components/property/AmenitiesGrid';
import { GettingThereMobile } from '@/components/property/GettingThereMobile';
import { HighlightsAccordion, TermsAccordion } from '@/components/property/PropertyAccordion';
import { SimilarStays } from '@/components/property/SimilarStays';
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
          <Link to="/listings" className="font-body text-hc-secondary hover:underline">← Back to all retreats</Link>
        </div>
      </>
    );
  }

  const whatsappMsg = encodeURIComponent(`Hi, I'm interested in ${property.name} at Hills Camp Kerala.`);
  const whatsappHref = `https://wa.me/${WHATSAPP_PHONE}?text=${whatsappMsg}`;
  const districtLabel = DISTRICT_LABELS[property.district];
  const amenityNames = property.amenities.map(a => a.name);

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="bg-hc-bg">

          {/* ═══════════════════ MOBILE LAYOUT ═══════════════════ */}

          {/* 1. Mobile Hero Slideshow */}
          <MobileHeroSlideshow
            coverImage={property.cover_image}
            images={property.property_images}
            propertyName={property.name}
            location={property.location}
            maxGuests={property.max_guests}
            amenityNames={amenityNames}
          />

          {/* 2. Gallery Icon Button */}
          <MobileGalleryButton
            coverImage={property.cover_image}
            images={property.property_images}
            propertyName={property.name}
          />

          {/* 3. Description (mobile) */}
          <div className="md:hidden px-5 mt-6">
            {property.description && (
              <p className="text-base text-[#424842] leading-relaxed font-body">
                {property.description}
              </p>
            )}
          </div>

          {/* 4. Rooms (mobile) */}
          <MobileRoomCards rooms={property.room_types} coverImage={property.cover_image} />

          {/* 5. Book Now (both) */}
          <BookNowModal propertyName={property.name} phone={WHATSAPP_PHONE} rooms={property.room_types} />

          {/* 6. Amenities (both — mobile uses grid, desktop uses sidebar in its own section) */}
          <div className="md:hidden">
            <AmenitiesGrid amenities={property.amenities} />
          </div>

          {/* 7a. Nearby Attractions (mobile) */}
          <div className="md:hidden">
            <NearbyAttractions attractions={property.nearby_attractions} />
          </div>

          {/* 7b. Getting There (mobile) */}
          <GettingThereMobile
            latitude={property.latitude}
            longitude={property.longitude}
            district={districtLabel}
          />

          {/* 8 & 9. Accordions (both) */}
          <div className="mt-10 md:px-8 md:max-w-[1280px] md:mx-auto">
            <HighlightsAccordion highlights={property.highlights} />
            <TermsAccordion />
          </div>

          {/* 10. Similar Stays */}
          <div className="mb-16">
            <SimilarStays
              currentSlug={property.slug}
              district={property.district}
              propertyType={property.property_type}
            />
          </div>

          {/* ═══════════════════ DESKTOP LAYOUT ═══════════════════ */}

          {/* Desktop Header */}
          <section className="hidden md:block pt-28 pb-6 px-8 max-w-[1280px] mx-auto">
            <Link
              to="/listings"
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
              <div className="mt-4 md:mt-0 text-right shrink-0">
                <p className="text-xs text-hc-text-light uppercase tracking-[0.2em] mb-1 font-body">Pricing</p>
                <p className="font-body font-bold text-hc-primary text-base">Contact for Pricing</p>
              </div>
            </div>
          </section>

          {/* Desktop Photo Gallery */}
          <section className="hidden md:block px-8 max-w-[1280px] mx-auto mb-12">
            <PhotoGallery
              coverImage={property.cover_image}
              images={property.property_images}
              propertyName={property.name}
            />
          </section>

          {/* Desktop Content + Sidebar */}
          <section className="hidden md:block px-8 max-w-[1280px] mx-auto mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="font-headline text-hc-primary text-3xl mb-6">
                  {property.tagline ?? 'Nature Meets Comfort'}
                </h2>
                {property.description && (
                  <p className="text-hc-text text-lg leading-relaxed mb-10">
                    {property.description}
                  </p>
                )}

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
                    <Link
                      to="/contact"
                      className="text-hc-primary font-bold text-sm underline decoration-hc-text-light/30 underline-offset-4 hover:decoration-hc-primary transition-colors font-body"
                    >
                      View Full Experience Guide →
                    </Link>
                  </div>
                </div>

                <RoomTypesList rooms={property.room_types} coverImage={property.cover_image} />
                <NearbyAttractions attractions={property.nearby_attractions} />
                <MapEmbed
                  latitude={property.latitude}
                  longitude={property.longitude}
                  district={districtLabel}
                />
              </div>

              <div className="lg:col-span-1">
                <AmenitiesSidebar amenities={property.amenities} />
                <div className="bg-hc-bg-alt rounded-2xl p-8 sticky top-28">
                  <h3 className="font-headline text-hc-primary text-xl mb-3">Availability</h3>
                  <p className="text-sm text-hc-text leading-relaxed mb-6 font-body">
                    This property is highly sought after. We recommend booking at least 4 weeks in advance for weekends.
                  </p>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-hc-primary text-white w-full py-4 rounded-full font-semibold text-center flex items-center justify-center gap-2 hover:bg-hc-primary-deep transition-colors font-body mb-3"
                  >
                    <MessageCircle size={18} strokeWidth={1.75} /> Enquire Now
                  </a>
                  <Link
                    to="/contact"
                    className="flex items-center justify-center w-full font-body font-semibold text-sm text-hc-primary bg-white py-4 rounded-full hover:bg-hc-bg transition-all"
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


    </>
  );
};

export default PropertyDetail;
