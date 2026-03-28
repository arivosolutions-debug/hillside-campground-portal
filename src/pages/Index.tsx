import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { HeroSection } from '@/components/home/HeroSection';
import { FloatingSearch } from '@/components/home/FloatingSearch';
import { FeaturedRetreats } from '@/components/home/FeaturedRetreats';
import { PhilosophySection } from '@/components/home/PhilosophySection';
import { CollectionsGrid } from '@/components/home/CollectionsGrid';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { BlogTeaser } from '@/components/home/BlogTeaser';

const Index = () => {
  return (
    <>
      <Navbar />
      <PageTransition>
        <main>
          <HeroSection />
          <FloatingSearch />
          <FeaturedRetreats />
          <PhilosophySection />
          <CollectionsGrid />
          <TestimonialsSection />
          <BlogTeaser />
        </main>
        <Footer />
      </PageTransition>
    </>
  );
};

export default Index;
