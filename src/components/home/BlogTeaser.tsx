import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { format } from 'date-fns';

export const BlogTeaser: React.FC = () => {
  const { data: posts, isLoading } = useBlogPosts(undefined, 3);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !posts) return;

    const items = section.querySelectorAll('.blog-item');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((item, i) => {
      item.classList.add('section-fade-up');
      (item as HTMLElement).style.transitionDelay = `${i * 100}ms`;
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [posts]);

  return (
    <section ref={sectionRef} className="bg-background py-32">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <SectionLabel className="mb-6">Journal</SectionLabel>
            <h2 className="font-headline text-4xl md:text-5xl text-on-surface leading-tight">
              Stories from the<br />
              <em>forest floor.</em>
            </h2>
          </div>
          <Link
            to="/journal"
            className="flex items-center gap-3 font-body text-sm font-bold text-secondary border-b-2 border-secondary/20 hover:border-secondary pb-1 transition-all duration-300 self-start md:self-end group"
          >
            All Stories
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-3xl bg-surface-high animate-pulse aspect-[4/5]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts?.map((post) => (
              <Link
                key={post.id}
                to={`/journal/${post.slug}`}
                className="blog-item group block"
              >
                {/* Image */}
                <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-surface-high">
                  {post.cover_image && (
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover brightness-80 group-hover:brightness-95 group-hover:scale-105 transition-all duration-700"
                    />
                  )}
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 mb-4">
                  {post.category && (
                    <span className="font-label text-[10px] tracking-widest text-secondary">
                      {post.category}
                    </span>
                  )}
                  <span className="w-1 h-1 rounded-full bg-on-surface-variant/30" />
                  <span className="font-body text-xs text-on-surface-variant">
                    {format(new Date(post.published_at), 'MMM d, yyyy')}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-headline text-xl text-on-surface leading-snug mb-3 group-hover:text-secondary transition-colors duration-300">
                  {post.title}
                </h3>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
