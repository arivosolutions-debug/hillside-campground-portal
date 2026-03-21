import React, { useState } from 'react';
import { MapPin, Mail, Clock, Send, ExternalLink, MessageCircle, CheckCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { supabase } from '@/integrations/supabase/client';
import { useProperties } from '@/hooks/useProperties';
import { toast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { z } from 'zod';

const enquirySchema = z.object({
  name:       z.string().trim().min(1, 'Name is required').max(100),
  email:      z.string().trim().email('Invalid email address').max(255),
  phone:      z.string().trim().max(30).optional(),
  dates:      z.string().trim().max(100).optional(),
  message:    z.string().trim().min(1, 'Message is required').max(2000),
  property_id: z.string().optional(),
});

type EnquiryForm = z.infer<typeof enquirySchema>;

const Contact = () => {
  const [form, setForm] = useState<EnquiryForm>({
    name: '', email: '', phone: '', dates: '', message: '', property_id: '',
  });
  const [errors, setErrors]   = useState<Partial<Record<keyof EnquiryForm, string>>>({});
  const [loading, setLoading] = useState(false);

  const { data: properties } = useProperties();

  const set = (field: keyof EnquiryForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = enquirySchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof EnquiryForm;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name:        result.data.name,
        email:       result.data.email,
        phone:       result.data.phone   || null,
        message:     `${result.data.dates ? `Proposed dates: ${result.data.dates}\n\n` : ''}${result.data.message}`,
        property_id: result.data.property_id || null,
      };

      const { error: sbError } = await supabase.from('enquiries').insert([payload]);
      if (sbError) throw sbError;

      toast({
        title: 'Message sent!',
        description: "We'll be in touch within 24 hours to help plan your stay.",
      });
      setForm({ name: '', email: '', phone: '', dates: '', message: '', property_id: '' });
      setErrors({});
    } catch {
      toast({
        title: 'Something went wrong',
        description: 'Please try again or reach us via WhatsApp.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const inputCls = (field: keyof EnquiryForm) =>
    `w-full bg-hc-bg-alt border-none rounded-xl px-5 py-4 text-hc-text placeholder:text-hc-text-light focus:outline-none focus:ring-1 focus:ring-hc-primary transition-all font-body text-sm ${errors[field] ? 'ring-1 ring-red-400' : ''}`;

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="min-h-screen bg-hc-bg font-body antialiased">

          {/* ── Header ── */}
          <section className="pt-36 pb-12 px-8 max-w-[1280px] mx-auto text-center">
            <p className="text-hc-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4">Reach Out to Us</p>
            <h1 className="font-headline text-hc-primary text-5xl md:text-8xl tracking-tight mb-6">
              Let's Plan Your<br />Escape Together
            </h1>
            <p className="text-hc-text text-lg max-w-2xl mx-auto leading-relaxed">
              Whether you have a specific property in mind or need help curating the perfect retreat,
              our team is here to guide you every step of the way.
            </p>
          </section>

          {/* ── Bento Grid ── */}
          <section className="px-8 max-w-[1280px] mx-auto pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* Left column */}
              <div className="lg:col-span-5 space-y-8">

                {/* WhatsApp CTA card */}
                <div className="bg-hc-primary rounded-3xl p-10 relative overflow-hidden">
                  {/* Decorative ghost icon */}
                  <div className="absolute right-0 bottom-0 opacity-10 select-none pointer-events-none">
                    <MessageCircle size={200} className="text-white" />
                  </div>
                  <div className="relative">
                    <MessageCircle size={32} className="text-[#25D366] mb-6" />
                    <h2 className="font-headline text-white text-2xl mb-3">Chat on WhatsApp</h2>
                    <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-xs">
                      The fastest way to reach us. Typical reply time is under 30 minutes during business hours.
                    </p>
                    <a
                      href="https://wa.me/919847012345?text=Hi%2C%20I'd%20like%20to%20enquire%20about%20a%20Hills%20Camp%20Kerala%20retreat."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] text-white px-8 py-3.5 rounded-xl font-semibold inline-flex items-center gap-2 hover:brightness-110 transition-all active:scale-[0.97]"
                    >
                      Start a Conversation <ExternalLink size={16} />
                    </a>
                  </div>
                </div>

                {/* Email & Hours */}
                <div className="bg-hc-bg-alt rounded-3xl p-10">
                  <div className="mb-8">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-hc-text-light mb-2 flex items-center gap-2">
                      <Mail size={12} /> Email Inquiries
                    </h3>
                    <a
                      href="mailto:stay@hillscampkerala.com"
                      className="font-headline text-hc-primary text-xl hover:text-hc-secondary transition-colors"
                    >
                      stay@hillscampkerala.com
                    </a>
                  </div>
                  <div className="border-t border-hc-text-light/10 pt-8">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-hc-text-light mb-2 flex items-center gap-2">
                      <Clock size={12} /> Response Hours
                    </h3>
                    <p className="text-hc-primary font-semibold text-lg">Mon – Sat, 9AM – 7PM IST</p>
                    <p className="text-sm text-hc-text-light mt-1">Weekend enquiries replied by Sunday</p>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-hc-bg-alt rounded-3xl p-10">
                  <div className="flex items-start gap-6">
                    <MapPin size={22} className="text-hc-primary mt-1 shrink-0" />
                    <div>
                      <h3 className="font-headline text-hc-primary text-xl mb-3">Estate House Office</h3>
                      <p className="text-hc-text leading-relaxed mb-4">
                        Munnar Estate House<br />
                        Idukki District<br />
                        Kerala 685612, India
                      </p>
                      <a
                        href="https://www.openstreetmap.org/?mlat=10.09&mlon=77.06#map=12/10.09/77.06"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-hc-primary font-bold text-sm underline decoration-hc-text-light/30 underline-offset-4 hover:decoration-hc-primary transition-colors"
                      >
                        View on Maps
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column — Form */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-3xl p-12 lg:p-16 h-full">
                  <h2 className="font-headline text-hc-primary text-2xl mb-10">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-8" noValidate>

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-hc-text-light mb-2">
                          Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={set('name')}
                          placeholder="Your full name"
                          className={inputCls('name')}
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-hc-text-light mb-2">
                          Email Address <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={set('email')}
                          placeholder="email@example.com"
                          className={inputCls('email')}
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Phone + Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-hc-text-light mb-2">
                          Phone (optional)
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={set('phone')}
                          placeholder="+91 98765 43210"
                          className={inputCls('phone')}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-hc-text-light mb-2">
                          Proposed Dates
                        </label>
                        <input
                          type="text"
                          value={form.dates}
                          onChange={set('dates')}
                          placeholder="e.g. Oct 12 – Oct 15"
                          className={inputCls('dates')}
                        />
                      </div>
                    </div>

                    {/* Property selector */}
                    {properties && properties.length > 0 && (
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-hc-text-light mb-2">
                          Property of Interest (optional)
                        </label>
                        <select
                          value={form.property_id}
                          onChange={set('property_id')}
                          className={`${inputCls('property_id')} cursor-pointer`}
                        >
                          <option value="">— Any / Not sure yet —</option>
                          {properties.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-hc-text-light mb-2">
                        Your Message <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={set('message')}
                        placeholder="Tell us about your ideal retreat — number of guests, special requirements, or anything on your mind..."
                        className={`${inputCls('message')} resize-none`}
                      />
                      {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-hc-primary text-white px-12 py-5 rounded-xl font-bold flex items-center gap-3 hover:bg-hc-primary-deep transition-colors active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Sending…' : 'Send Enquiry'}
                      {!loading && <Send size={18} />}
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </section>

          {/* ── Location Image Section ── */}
          <section className="px-8 max-w-[1280px] mx-auto pb-20">
            <div className="relative rounded-3xl overflow-hidden h-[500px] md:h-[600px]">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
                alt="Aerial view of Kerala tea plantations"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-12 left-8 md:left-12 bg-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 max-w-sm md:max-w-md border border-white/20">
                <h3 className="font-headline text-white text-xl mb-3">The Heart of Kerala</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  Our estates are nestled deep within the Western Ghats, accessible through scenic mountain roads.
                </p>
                <div className="bg-hc-bg-alt rounded-xl overflow-hidden h-32">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=76.6%2C10.0%2C77.2%2C10.5&layer=mapnik&marker=10.09%2C76.92"
                    className="w-full h-full"
                    style={{ border: 0 }}
                    title="Hills Camp Kerala location map"
                  />
                </div>
              </div>
            </div>
          </section>

        </main>
        <Footer />
      </PageTransition>
      <Toaster />
    </>
  );
};

export default Contact;
