import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, CheckCircle, ArrowLeft, MessageCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { useProperty } from '@/hooks/useProperty';
import { DISTRICT_LABELS, PROPERTY_TYPE_LABELS } from '@/lib/types';

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
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-hc-primary/30" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-hc-bg" />

            <div className="absolute bottom-0 left-0 right-0 z-10 max-w-content mx-auto px-8 pb-16">
              <Link to="/stays" className="inline-flex items-center gap-2 font-body text-sm text-white/70 hover:text-white mb-6 transition-colors">
                <ArrowLeft size={14} /> All Retreats
              </Link>
              <span className="inline-block bg-hc-bg/90 backdrop-blur-sm text-hc-primary text-xs font-bold uppercase tracking-tight px-3 py-1 rounded-full mb-4">
                {PROPERTY_TYPE_LABELS[property.property_type]}
              </span>
              <h1 className="font-headline text-hc-primary-deep text-4xl md:text-6xl leading-tight mb-3">
                {property.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-hc-text">
                <div className="flex items-center gap-1.5"><MapPin size={14} /><span className="font-body text-sm">{DISTRICT_LABELS[property.district]}, Kerala</span></div>
                <span>·</span>
                <div className="flex items-center gap-1.5"><Users size={14} /><span className="font-body text-sm">Up to {property.max_guests} guests</span></div>
                {property.price_per_night && (
                  <>
                    <span>·</span>
                    <span className="font-body font-bold text-hc-secondary">₹{property.price_per_night.toLocaleString()}/night</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="bg-hc-bg py-20 px-8">
            <div className="max-w-content mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-8 space-y-14">
                {property.tagline && (
                  <p className="font-headline text-2xl text-hc-secondary italic">&ldquo;{property.tagline}&rdquo;</p>
                )}

                {property.description && (
                  <div>
                    <div className="flex items-center gap-4 mb-5">
                      <div className="h-px w-12 bg-hc-secondary" />
                      <span className="font-label text-xs tracking-[0.4em] text-hc-secondary">About</span>
                    </div>
                    <p className="text-hc-text leading-relaxed text-lg">{property.description}</p>
                  </div>
                )}

                {property.highlights && property.highlights.length > 0 && (
                  <div>
                    <div className="flex items-center gap-4 mb-5">
                      <div className="h-px w-12 bg-hc-secondary" />
                      <span className="font-label text-xs tracking-[0.4em] text-hc-secondary">Highlights</span>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {property.highlights.map(h => (
                        <li key={h} className="flex items-start gap-3">
                          <CheckCircle size={16} className="text-hc-secondary mt-0.5 shrink-0" />
                          <span className="font-body text-sm text-hc-text">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {property.amenities.length > 0 && (
                  <div>
                    <div className="flex items-center gap-4 mb-5">
                      <div className="h-px w-12 bg-hc-secondary" />
                      <span className="font-label text-xs tracking-[0.4em] text-hc-secondary">Amenities</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {property.amenities.map(a => (
                        <div key={a.id} className="bg-hc-bg-alt rounded-xl px-4 py-3 flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-hc-secondary/60 shrink-0" />
                          <span className="font-body text-sm text-hc-text">{a.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {property.nearby_attractions.length > 0 && (
                  <div>
                    <div className="flex items-center gap-4 mb-5">
                      <div className="h-px w-12 bg-hc-secondary" />
                      <span className="font-label text-xs tracking-[0.4em] text-hc-secondary">Nearby</span>
                    </div>
                    <div className="space-y-3">
                      {property.nearby_attractions.map(a => (
                        <div key={a.id} className="flex items-center justify-between bg-hc-bg-alt rounded-xl px-5 py-4">
                          <span className="font-body text-sm text-hc-text">{a.name}</span>
                          {a.distance_km && (
                            <span className="font-label text-[10px] text-hc-secondary">{a.distance_km} km</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sticky sidebar */}
              <div className="lg:col-span-4">
                <div className="sticky top-28 bg-white rounded-2xl p-8 shadow-card">
                  <h3 className="font-headline text-hc-primary text-2xl mb-2">Plan Your Stay</h3>
                  <p className="font-body text-sm text-hc-text-light mb-6">Enquire directly for availability and personalised itineraries.</p>
                  {property.price_per_night && (
                    <div className="mb-6 pb-6 border-b border-hc-text-light/10">
                      <span className="font-body text-sm text-hc-text-light">Starting from</span>
                      <div className="font-headline text-3xl text-hc-secondary">
                        ₹{property.price_per_night.toLocaleString()}
                        <span className="font-body text-base text-hc-text-light font-normal">/night</span>
                      </div>
                    </div>
                  )}
                  <a
                    href={`https://wa.me/919876543210?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full font-body font-bold bg-hc-secondary text-white py-4 rounded-xl mb-3 transition-all hover:brightness-110 active:scale-[0.97]"
                  >
                    <MessageCircle size={18} /> WhatsApp Enquiry
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
          </div>
        </main>
        <Footer />
      </PageTransition>
    </>
  );
};

export default PropertyDetail;
