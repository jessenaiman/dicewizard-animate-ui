'use client';

import { motion } from 'motion/react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  icon?: React.ReactNode;
  color?: string;
  featured?: boolean;
}

interface ResourceCardsProps {
  className?: string;
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Magic UI',
    description:
      'Beautifully designed components and templates for your next project',
    url: 'https://magicui.design',
    category: 'UI Library',
    color: 'from-purple-500 to-pink-500',
    featured: true,
  },
  {
    id: '2',
    title: 'React Bits',
    description:
      'Collection of animated React components for creative developers',
    url: 'https://reactbits.dev',
    category: 'Component Library',
    color: 'from-blue-500 to-cyan-500',
    featured: true,
  },
  {
    id: '3',
    title: 'Tailwind CSS',
    description: 'A utility-first CSS framework for rapid UI development',
    url: 'https://tailwindcss.com',
    category: 'CSS Framework',
    color: 'from-teal-500 to-green-500',
  },
  {
    id: '4',
    title: 'Next.js',
    description: 'The React framework for production-grade applications',
    url: 'https://nextjs.org',
    category: 'Framework',
    color: 'from-gray-700 to-black',
  },
  {
    id: '5',
    title: 'Framer Motion',
    description: 'Production-ready motion library for React',
    url: 'https://framer.com/motion',
    category: 'Animation',
    color: 'from-red-500 to-orange-500',
  },
  {
    id: '6',
    title: 'shadcn/ui',
    description:
      'Beautifully designed components built with Radix UI and Tailwind CSS',
    url: 'https://ui.shadcn.com',
    category: 'UI Library',
    color: 'from-emerald-500 to-blue-500',
  },
];

const ResourceCard = ({ resource }: { resource: Resource }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-background/50 to-background/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-xl',
        resource.featured && 'ring-2 ring-primary/20',
      )}
    >
      {/* Gradient background overlay */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-10',
          resource.color || 'from-primary to-secondary',
        )}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {resource.category}
          </span>
          {resource.featured && (
            <span className="rounded-full bg-yellow-400/20 px-2 py-1 text-xs font-medium text-yellow-600">
              Featured
            </span>
          )}
        </div>

        <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {resource.title}
        </h3>

        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
          {resource.description}
        </p>

        <div className="flex items-center justify-between">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Visit website
            <ExternalLink className="ml-1 h-4 w-4" />
          </a>

          <motion.div
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export const ResourceCards = ({ className }: ResourceCardsProps) => {
  const featuredResources = resources.filter((resource) => resource.featured);
  const otherResources = resources.filter((resource) => !resource.featured);

  return (
    <section className={cn('py-20', className)}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Developer Resources
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Discover amazing tools and libraries to enhance your development
            workflow
          </p>
        </motion.div>

        {/* Featured Resources */}
        {featuredResources.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <h3 className="mb-8 text-xl font-semibold text-foreground text-center">
              Featured Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </motion.div>
        )}

        {/* All Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="mb-8 text-xl font-semibold text-foreground text-center">
            More Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Have a resource to suggest?
          </p>
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Contact us to add your resource
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
