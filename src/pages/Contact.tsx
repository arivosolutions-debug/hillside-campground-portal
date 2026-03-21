import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, CheckCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { supabase } from '@/lib/supabase';

const Contact = () => {
  const [form, setForm]         = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [error, setError]       = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { error: sbError } = await supabase.from('enquiries').insert([form]);
      if (sbError) throw sbError;
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setError('Something went wrong. Please try again or contact us via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full bg-surface-high border border-white/5 text-on-surface font-body text-sm rounded-2xl px-5 py-4 outline-none placeholder:text-on-surface-variant/40 focus:border-secondary/50 focus:ring-1 focus:ring-secondary/20 transition-all`;

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="min-h-screen">
          <div className="bg-surface-low pt-36 pb-20 px-8">
            <div className="max-w-screen-2xl mx-auto">
              <SectionLabel className="mb-6">Get in Touch</SectionLabel>
              <h1 className="font-headline text-5xl md:text-7xl text-on-surface leading-tight">
                Plan your<br /><em className="text-secondary">escape.</em>
              </h1>
            </div>
          </div>

          <div className="bg-background py-20 px-8">
            <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
              {/* Contact info */}
              <div className="lg:col-span-4 space-y-10">
                <div>
                  <SectionLabel className="mb-6">Contact</SectionLabel>
                  <div className="space-y-5">
                    {[
                      { icon: MapPin, text: 'Vythiri, Wayanad, Kerala 673 576' },
                      { icon: Phone, text: '+91 98765 43210', href: 'tel:+919876543210' },
                      { icon: Mail,  text: 'hello@hillscamp.in', href: 'mailto:hello@hillscamp.in' },
                    ].map(({ icon: Icon, text, href }) => (
                      <div key={text} className="flex items-start gap-3">
                        <Icon size={14} className="text-secondary mt-1 shrink-0" />
                        {href ? (
                          <a href={href} className="font-body text-sm text-on-surface-variant hover:text-secondary transition-colors">{text}</a>
                        ) : (
                          <span className="font-body text-sm text-on-surface-variant">{text}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="https://wa.me/919876543210?text=Hi, I'd like to enquire about a Hills Camp Kerala retreat."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-body font-bold bg-secondary-container text-on-secondary-container px-7 py-4 rounded-full transition-all hover:brightness-110 active:scale-[0.97] w-fit"
                >
                  <MessageCircle size={18} /> Chat on WhatsApp
                </a>
              </div>

              {/* Form */}
              <div className="lg:col-span-8">
                {success ? (
                  <div className="bg-surface-high rounded-3xl p-12 flex flex-col items-center text-center gap-4">
                    <CheckCircle size={40} className="text-secondary" />
                    <h3 className="font-headline text-2xl text-on-surface">Message received.</h3>
                    <p className="font-body text-on-surface-variant">We'll be in touch within 24 hours to help plan your stay.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <input required value={form.name}    onChange={(e) => setForm({ ...form, name: e.target.value })}    className={inputClass} placeholder="Your name" />
                      <input required type="email" value={form.email}   onChange={(e) => setForm({ ...form, email: e.target.value })}   className={inputClass} placeholder="Email address" />
                    </div>
                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="Phone number (optional)" />
                    <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClass} h-40 resize-none`} placeholder="Tell us about your ideal stay — preferred dates, number of guests, any special requirements..." />
                    {error && <p className="font-body text-sm text-destructive">{error}</p>}
                    <button
                      type="submit"
                      disabled={loading}
                      className="font-body font-bold bg-secondary-container text-on-secondary-container px-10 py-5 rounded-full text-base transition-all hover:brightness-110 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Sending…' : 'Send Enquiry'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </PageTransition>
    </>
  );
};

export default Contact;
