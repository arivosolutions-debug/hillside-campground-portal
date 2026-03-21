import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { MistOverlay } from '@/components/shared/MistOverlay';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { useBlogPost } from '@/hooks/useBlogPost';

export const Blog = () => {
  const { data: posts, isLoading } = useBlogPosts();

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="min-h-screen">
          <div className="bg-surface-low pt-36 pb-20 px-8">
            <div className="max-w-screen-2xl mx-auto">
              <SectionLabel className="mb-6">Field Notes</SectionLabel>
              <h1 className="font-headline text-5xl md:text-7xl text-on-surface leading-tight mb-4">
                Journal
              </h1>
              <p className="font-body text-on-surface-variant max-w-xl">
                Stories, observations, and dispatches from the forests, backwaters, and highlands of Kerala.
              </p>
            </div>
          </div>

          <div className="bg-background py-20 px-8">
            <div className="max-w-screen-2xl mx-auto">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="rounded-3xl bg-surface-high animate-pulse aspect-[4/5]" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts?.map((post) => (
                    <Link key={post.id} to={`/journal/${post.slug}`} className="group block">
                      <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-surface-high">
                        {post.cover_image && (
                          <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover brightness-80 group-hover:brightness-95 group-hover:scale-105 transition-all duration-700" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        {post.category && <span className="font-label text-[10px] tracking-widest text-secondary">{post.category}</span>}
                        <span className="w-1 h-1 rounded-full bg-on-surface-variant/30" />
                        <span className="font-body text-xs text-on-surface-variant flex items-center gap-1.5">
                          <Calendar size={11} />{format(new Date(post.published_at), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <h2 className="font-headline text-xl text-on-surface leading-snug mb-3 group-hover:text-secondary transition-colors duration-300">{post.title}</h2>
                      {post.excerpt && <p className="font-body text-sm text-on-surface-variant leading-relaxed line-clamp-3">{post.excerpt}</p>}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </PageTransition>
    </>
  );
};

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useBlogPost(slug);

  if (isLoading) return (
    <><Navbar /><div className="min-h-screen bg-background flex items-center justify-center"><div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin" /></div></>
  );

  if (!post) return (
    <><Navbar /><div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4"><h1 className="font-headline text-4xl text-on-surface">Story not found</h1><Link to="/journal" className="font-body text-secondary hover:underline">← Back to Journal</Link></div></>
  );

  return (
    <>
      <Navbar />
      <PageTransition>
        <main>
          <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
            {post.cover_image && <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover brightness-60" />}
            <MistOverlay intensity="strong" />
            <div className="absolute bottom-0 left-0 right-0 z-10 max-w-screen-2xl mx-auto px-8 pb-16">
              <Link to="/journal" className="inline-flex items-center gap-2 font-body text-sm text-on-surface-variant hover:text-secondary mb-8 transition-colors">
                <ArrowLeft size={14} /> Journal
              </Link>
              {post.category && <SectionLabel className="mb-4">{post.category}</SectionLabel>}
              <h1 className="font-headline text-3xl md:text-5xl text-on-surface leading-tight max-w-3xl">{post.title}</h1>
            </div>
          </div>
          <div className="bg-background py-20 px-8">
            <div className="max-w-3xl mx-auto">
              <p className="font-body text-sm text-on-surface-variant mb-12">{format(new Date(post.published_at), 'MMMM d, yyyy')}</p>
              {post.excerpt && <p className="font-headline text-xl text-secondary italic mb-12 leading-relaxed">"{post.excerpt}"</p>}
              <div className="prose prose-invert prose-lg max-w-none font-body text-on-surface-variant leading-relaxed space-y-6">
                {post.content?.split('\n\n').map((para, i) => (
                  <p key={i}>{para.replace(/^#+\s/, '').replace(/\*\*/g, '')}</p>
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
