"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Logo } from '../../logo';
import { motion } from 'motion/react';
import {
  GithubStars,
  GithubStarsNumber,
  GithubStarsParticles,
  GithubStarsIcon,
} from '@/registry/primitives/animate/github-stars';
import { StarIcon } from 'lucide-react';
import './DisplayHeader.css';

interface DisplayHeaderProps {
  activeItem?: string;
}

/* eslint-disable react/prop-types */
const DisplayHeader: React.FC<DisplayHeaderProps> = ({ activeItem }) => {
  const navRef = useRef<HTMLDivElement>(null);
  const starCountRef = useRef<HTMLSpanElement>(null);
  // Animate the star count pill on first reveal (using Motion defaults)

  useEffect(() => {
    // No imperative animation needed when using Motion elements below
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo">
          <Logo />
        </Link>

        <div className="nav-cta-group">
          <nav className="landing-nav-items" ref={navRef}>
            <Link className={`nav-link ${activeItem === 'home' && 'active-link'}`} href="/">
              Home
            </Link>
            <Link className="nav-link" href="/docs">
              Docs
            </Link>
            <Link className={`nav-link ${activeItem === 'showcase' && 'active-link'}`} href="/showcase">
              Showcase
            </Link>
          </nav>

          <button
            className="cta-button"
            onClick={() => window.open('https://github.com/jessenaiman/dicewizard-animate-ui', '_blank')}
          >
            Star On GitHub
            <motion.span
              ref={starCountRef}
              initial={{ scale: 0, opacity: 0, width: 0 }}
              animate={{ scale: 1, opacity: 1, width: 100 }}
              transition={{ type: 'spring', stiffness: 150, damping: 22 }}
              style={{ display: 'inline-flex' }}
            >
              <GithubStars username="jessenaiman" repo="dicewizard-animate-ui" inView>
                <GithubStarsParticles>
                  <GithubStarsIcon
                    icon={StarIcon}
                    className="size-4 fill-neutral-300 stroke-neutral-300 dark:fill-neutral-700 dark:stroke-neutral-700 mr-1"
                    activeClassName="text-yellow-500"
                  />
                </GithubStarsParticles>
                <GithubStarsNumber className="font-semibold" />
              </GithubStars>
            </motion.span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default DisplayHeader;
