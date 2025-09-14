'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';

// Theme CSS variables
const lightTheme = {
  '--background': '#ffffff',
  '--foreground': '#000000',
  '--primary': '#3b82f6',
  '--primary-foreground': '#ffffff',
  '--secondary': '#f1f5f9',
  '--secondary-foreground': '#0f172a',
  '--accent': '#e0f2fe',
  '--accent-foreground': '#0369a1',
  '--muted': '#f8fafc',
  '--muted-foreground': '#64748b',
  '--card': '#ffffff',
  '--card-foreground': '#000000',
  '--border': '#e2e8f0',
  '--input': '#f1f5f9',
  '--ring': '#3b82f6',
};

const darkTheme = {
  '--background': '#0f0a0a',
  '--foreground': '#fafaf9',
  '--primary': '#a855f7',
  '--primary-foreground': '#ffffff',
  '--secondary': '#1c1917',
  '--secondary-foreground': '#fafaf9',
  '--accent': '#2a1810',
  '--accent-foreground': '#fdba74',
  '--muted': '#1c1917',
  '--muted-foreground': '#a8a29e',
  '--card': '#1c1917',
  '--card-foreground': '#fafaf9',
  '--border': '#292524',
  '--input': '#1c1917',
  '--ring': '#a855f7',
};

export default function LandingPage() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const theme = isDark ? darkTheme : lightTheme;
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [isDark]);

  return (
    <div
      className={`min-h-screen bg-background text-foreground transition-all duration-500 ${isDark ? 'bg-gradient-to-br from-purple-900 via-slate-900 to-black' : 'bg-gradient-to-br from-blue-50 via-white to-blue-100'}`}
    >
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsDark(!isDark)}
          className="inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap rounded-lg text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 bg-card border border-border hover:bg-accent px-3 py-2 shadow-lg"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>

      {/* Hero Section */}
      <section
        className={`hero-section flex items-center justify-center relative overflow-hidden ${isDark ? 'before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500/10 before:to-pink-500/10 before:animate-pulse' : 'before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-400/20 before:to-cyan-400/20'}`}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent ${isDark ? 'from-purple-400 via-pink-400 to-purple-600' : 'from-blue-600 via-cyan-500 to-blue-800'}`}
          >
            Welcome to DiceWizard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Experience the magic of animated UI components with our unique dark
            and light themes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button
              className={`inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap rounded-lg font-medium disabled:pointer-events-none disabled:opacity-50 px-8 py-3 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 ${isDark ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white'}`}
            >
              Get Started
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className={`py-20 ${isDark ? 'bg-slate-800/50' : 'bg-slate-100/50'}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Features</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover the power of our animated components with seamless theme
              switching.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Dark Theme',
                description:
                  'Elegant purple and black theme for a sophisticated look.',
                icon: '🌙',
              },
              {
                title: 'Light Theme',
                description:
                  'Clean blue and white theme for a fresh, modern feel.',
                icon: '☀️',
              },
              {
                title: 'Smooth Transitions',
                description:
                  'Seamless animations between themes with CSS variables.',
                icon: '✨',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-card p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-all duration-300 ${isDark ? 'hover:shadow-purple-500/20 hover:border-purple-500/50' : 'hover:shadow-blue-500/20 hover:border-blue-500/50'}`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Explore?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Toggle between themes and see the magic unfold.
            </p>
            <button className="inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap rounded-lg text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3">
              Learn More
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
