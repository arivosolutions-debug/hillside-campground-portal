import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Leaf, Diamond, ShieldCheck, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import type { TeamMember } from '@/lib/types';

const PILLARS = [
  {
    icon: Leaf,
    iconBg: 'bg-[#17341e]',
    iconColor: 'text-[#bdce89]',
    title: 'Deep Sustainability',
    body: 'Every property must demonstrate a measurable commitment to environmental preservation, from zero-waste operations to rainwater harvesting.',
  },
  {
    icon: Diamond,
    iconBg: 'bg-[#924a29]',
    iconColor: 'text-[#ffdbcd]',
    title: 'Uncompromised Luxury',
    body: 'From hand-woven linens to private chefs who source from local farms, every detail is curated for a refined experience without excess.',
  },
  {
    icon: ShieldCheck,
    iconBg: 'bg-[#0a1f11]',
    iconColor: 'text-[#adcfaf]',
    title: 'Absolute Privacy',
    body: 'Our estates are designed for complete seclusion. No shared walls, no public spaces — just you, your companions, and the wilderness.',
  },
];

const FALLBACK_TEAM = [
  {
    id: '1',
    name: 'Rohan Nair',
    role: 'Founder & Conservation Director',
    bio: 'A 3rd-generation coffee planter turned conservationist with a vision for silent tourism.',
    photo_url: null,
    sort_order: 0,
  },
  {
    id: '2',
    name: 'Maya Iyer',
    role: 'Head of Design & Architecture',
    bio: 'Award-winning architect specializing in structures that dissolve into their natural surroundings.',
    photo_url: null,
    sort_order: 1,
  },
  {
    id: '3',
    name: 'Vikram Seth',
    role: 'Head of Guest Experience',
    bio: 'Former luxury hotel director who traded five-star lobbies for forest canopies.',
    photo_url: null,
    sort_order: 2,
  },
];

const About = () => {
  const { data: team } = useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const { data, error } = await supabase.from('team_members').select('*').order('sort_order');
      if (error) throw error;
      return data as TeamMember[];
    },
  });

  const displayTeam = team?.length ? team : FALLBACK_TEAM;

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="bg-hc-bg text-hc-text font-body antialiased">

          {/* ── Hero ──────────────────────────────────────────────────────── */}
          <section className="relative h-[80vh] min-h-[600px] flex items-end overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1600&q=80"
                alt="Misty Western Ghats"
                className="w-full h-full object-cover brightness-[0.35]"
              />
              {/* Bottom gradient blends into page bg */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050a07] via-[#050a07]/30 to-transparent" />
            </div>
            <div className="relative z-10 max-w-[1280px] mx-auto px-8 pb-20 w-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-10 bg-[#ffb596]" />
                <span className="text-[#ffb596] text-xs font-bold uppercase tracking-[0.4em] font-body">
                  Our Philosophy
                </span>
              </div>
              <h1 className="font-headline text-white text-5xl md:text-8xl leading-[0.95] mb-6">
                Our <em className="text-[#ffb596] not-italic">Story</em>
              </h1>
              <p className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed font-body">
                Where every sunrise over the Ghats becomes a private moment, curated just for you.
              </p>
            </div>
          </section>

          {/* ── Brand Story ───────────────────────────────────────────────── */}
          <section className="py-32 px-8 max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4">
                <h2 className="font-headline text-hc-primary text-4xl md:text-5xl leading-tight">
                  Where Nature Meets Comfort
                </h2>
                <div className="w-24 h-1 bg-hc-secondary rounded-full mt-6" />
              </div>
              <div className="lg:col-span-8 space-y-8">
                <p className="font-headline text-hc-primary text-xl md:text-2xl italic leading-relaxed">
                  "We didn't just want to build another resort. We wanted to curate a silent conversation between the wanderer and the wilderness."
                </p>
                <p className="text-hc-text text-lg leading-relaxed font-body">
                  Founded in the heart of the Western Ghats, Hills Camp was born from a singular vision: to bridge the gap between untamed nature and sophisticated living. Our properties are not just accommodations; they are carefully selected vantage points into the soul of Kerala's highlands.
                </p>
                <p className="text-hc-text text-lg leading-relaxed font-body">
                  Every stone laid and every path cleared respects the ancient rhythm of the hills. We believe that true luxury lies in the sound of a distant waterfall, the scent of damp earth after a monsoon rain, and the warmth of a hearth shared with fellow travelers.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-hc-text-light/10">
                  <div>
                    <span className="font-headline text-hc-secondary text-4xl">12+</span>
                    <p className="text-sm text-hc-text-light uppercase tracking-wider mt-1 font-bold font-body">Curated Estates</p>
                  </div>
                  <div>
                    <span className="font-headline text-hc-secondary text-4xl">450+</span>
                    <p className="text-sm text-hc-text-light uppercase tracking-wider mt-1 font-bold font-body">Species Protected</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Curation Standards ────────────────────────────────────────── */}
          <section className="py-24 px-8 bg-hc-bg-alt">
            <div className="max-w-[1280px] mx-auto">
              <div className="text-center mb-16">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-[1px] w-10 bg-hc-secondary" />
                  <span className="text-hc-secondary text-xs font-bold uppercase tracking-[0.4em] font-body">
                    Our Standards
                  </span>
                  <div className="h-[1px] w-10 bg-hc-secondary" />
                </div>
                <h2 className="font-headline text-hc-primary text-4xl md:text-5xl mb-4">
                  Our Curation Standards
                </h2>
                <p className="text-hc-text text-lg max-w-2xl mx-auto font-body">
                  Each property passes through our rigorous three-pillar evaluation before earning the Hills Camp seal.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PILLARS.map(p => {
                  const Icon = p.icon;
                  return (
                    <div key={p.title} className="bg-hc-bg rounded-3xl p-10">
                      {/* Circular icon badge */}
                      <div className={`w-14 h-14 ${p.iconBg} rounded-full flex items-center justify-center mb-6`}>
                        <Icon size={22} strokeWidth={1.5} className={p.iconColor} />
                      </div>
                      <h3 className="font-headline text-hc-primary text-xl mb-4">{p.title}</h3>
                      <p className="text-hc-text leading-relaxed font-body">{p.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── Team ──────────────────────────────────────────────────────── */}
          <section className="py-24 px-8 max-w-[1280px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[1px] w-10 bg-hc-secondary" />
                  <span className="text-hc-secondary text-xs font-bold uppercase tracking-[0.4em] font-body">
                    The Team
                  </span>
                </div>
                <h2 className="font-headline text-hc-primary text-4xl md:text-5xl mb-4">
                  The People Behind the Peaks
                </h2>
                <p className="text-hc-text text-lg max-w-xl font-body">
                  A team of conservationists, architects, and storytellers who share one belief: nature is the ultimate luxury.
                </p>
              </div>
              <Link
                to="/contact"
                className="text-hc-primary font-bold flex items-center gap-2 font-body text-sm shrink-0 hover:text-hc-secondary transition-colors"
              >
                Get in touch <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
              {displayTeam.map((member, idx) => (
                <div key={member.id} style={{ marginTop: idx === 1 ? '48px' : '0' }}>
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-hc-bg-alt mb-6">
                    {member.photo_url ? (
                      <img
                        src={member.photo_url}
                        alt={member.name}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-hc-bg-alt">
                        <span className="font-headline text-5xl text-hc-text-light">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-headline text-hc-primary text-xl mb-1">{member.name}</h3>
                  <p className="text-sm text-hc-text-light mb-3 font-body">{member.role}</p>
                  {member.bio && (
                    <p className="text-sm text-hc-text leading-relaxed font-body">{member.bio}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── Full-Width CTA Banner ─────────────────────────────────────── */}
          <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden pb-16 -mb-16">
            <img
              src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1920&q=80"
              alt="Western Ghats aerial"
              className="absolute inset-0 w-full h-full object-cover brightness-[0.35]"
            />
            {/* Dark overlay for depth */}
            <div className="absolute inset-0 bg-[#050a07]/50" />
            {/* Bottom fade into footer */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050a07] to-transparent" />

            <div className="relative z-10 text-center px-8 max-w-3xl">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-[1px] w-10 bg-[#ffb596]" />
                <span className="text-[#ffb596] text-xs font-bold uppercase tracking-[0.4em] font-body">
                  The Wilderness Awaits
                </span>
                <div className="h-[1px] w-10 bg-[#ffb596]" />
              </div>
              <h2 className="font-headline text-white text-4xl md:text-6xl leading-tight mb-6">
                Experience the <em className="text-[#ffb596]">Wilderness</em>
              </h2>
              <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto font-body leading-relaxed">
                Twelve curated estates hidden across Kerala's Western Ghats. No two alike. All extraordinary.
              </p>
              <Link
                to="/listings"
                className="inline-flex items-center gap-3 bg-[#924a29] text-[#ffdbcd] px-10 py-5 rounded-full font-bold text-lg hover:bg-[#753414] transition-colors font-body"
              >
                Explore Properties
                <ArrowRight size={20} />
              </Link>
            </div>
          </section>

        </main>
        <Footer />
      </PageTransition>
    </>
  );
};

export default About;
