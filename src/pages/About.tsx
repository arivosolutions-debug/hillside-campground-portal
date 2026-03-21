import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { SectionLabel } from '@/components/shared/SectionLabel';
import type { TeamMember } from '@/lib/types';

const About = () => {
  const { data: team } = useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const { data, error } = await supabase.from('team_members').select('*').order('sort_order');
      if (error) throw error;
      return data as TeamMember[];
    },
  });

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="min-h-screen">
          {/* Hero */}
          <div className="relative bg-surface-low pt-36 pb-32 px-8 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <img src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=1600&q=60" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 max-w-screen-2xl mx-auto">
              <SectionLabel className="mb-6">Our Story</SectionLabel>
              <h1 className="font-headline text-5xl md:text-7xl text-on-surface leading-tight mb-8 max-w-3xl">
                Born from a love<br /><em className="text-secondary">for one state.</em>
              </h1>
              <p className="font-body text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Hills Camp was built on a single conviction: that the most profound luxury is not what you add to a landscape, but what you preserve within it. We are a curated collection of wilderness retreats across Kerala's Western Ghats, designed to dissolve the boundary between shelter and wildness.
              </p>
            </div>
          </div>

          {/* Philosophy */}
          <div className="bg-background py-24 px-8">
            <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <SectionLabel className="mb-6">Philosophy</SectionLabel>
                <h2 className="font-headline text-4xl text-on-surface mb-6 leading-tight">
                  Stewardship, not<br /><em>extraction.</em>
                </h2>
                <div className="space-y-4 font-body text-on-surface-variant leading-relaxed">
                  <p>Every retreat we operate is subject to a conservation charter: local employment, zero deforestation, waste composting, and a portion of revenue allocated to wildlife corridor protection in the Western Ghats UNESCO World Heritage zone.</p>
                  <p>We work with the same families across generations. The cook who prepares your farm-to-table dinner learned from her grandmother. The naturalist who leads your dawn walk has mapped this forest for three decades. This continuity is not incidental — it is the product.</p>
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden aspect-square">
                <img src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80" alt="Kerala conservation" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="bg-surface-low py-24 px-8">
            <div className="max-w-screen-2xl mx-auto">
              <SectionLabel className="mb-6">The People</SectionLabel>
              <h2 className="font-headline text-4xl md:text-5xl text-on-surface mb-16 leading-tight">
                Who keeps the<br /><em>fires burning.</em>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {team?.map((member) => (
                  <div key={member.id} className="group">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden mb-6 bg-surface-high">
                      {member.photo_url && (
                        <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      )}
                    </div>
                    <h3 className="font-headline text-xl text-on-surface mb-1">{member.name}</h3>
                    <p className="font-label text-[10px] text-secondary tracking-widest mb-4">{member.role}</p>
                    {member.bio && <p className="font-body text-sm text-on-surface-variant leading-relaxed">{member.bio}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </PageTransition>
    </>
  );
};

export default About;
