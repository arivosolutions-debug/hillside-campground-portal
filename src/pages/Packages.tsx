import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { ArrowRight } from 'lucide-react';

const BG =
  'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1920&q=80';

const Packages: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="bg-hc-bg font-body">
          {/* Hero */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background image */}
            <img
              src={BG}
              alt="Misty Western Ghats"
              className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
            />
            {/* Gradient overlay — bottom fade into page bg */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050a07] via-transparent to-[#050a07]/30" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-6 py-32 max-w-2xl mx-auto gap-6">
              {/* Overline */}
              <span className="font-label text-[#924a29] uppercase tracking-[0.25em] text-xs">
                Curated Experiences
              </span>

              {/* Headline */}
              <h1 className="font-headline italic text-white text-6xl md:text-7xl leading-[0.95] tracking-tight">
                Packages
              </h1>

              {/* Coming Soon badge */}
              <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-3 text-white font-bold tracking-wider text-sm">
                Coming Soon
              </span>

              {/* Subtitle */}
              <p className="text-white/70 text-base leading-relaxed max-w-lg font-body">
                We're crafting exclusive wilderness packages — from guided dawn walks to
                spice trail expeditions. Stay tuned.
              </p>

              {/* Notify Me form */}
              {submitted ? (
                <div className="mt-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-4 text-white font-body text-sm">
                  ✓ You're on the list — we'll reach out when packages go live.
                </div>
              ) : (
                <form
                  onSubmit={handleNotify}
                  className="mt-2 flex items-center gap-0 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/15 rounded-full overflow-hidden pr-1.5 py-1.5 pl-6"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent text-white placeholder:text-white/40 text-sm font-body focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-[#924a29] text-white text-sm font-bold rounded-full px-6 py-2.5 hover:brightness-110 active:scale-[0.97] transition-all shrink-0"
                  >
                    Notify Me <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </PageTransition>
    </>
  );
};

export default Packages;
