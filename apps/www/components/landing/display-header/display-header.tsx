"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { Logo } from '../../logo';
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

const DisplayHeader: React.FC<DisplayHeaderProps> = ({ activeItem }) => {
  const navRef = useRef<HTMLDivElement>(null);
  const starCountRef = useRef<HTMLSpanElement>(null);
  // Animate the star count pill on first reveal

  useEffect(() => {
    if (!starCountRef.current) return;
    gsap.fromTo(
      starCountRef.current,
      { scale: 0, width: 0, opacity: 0 },
      {
        scale: 1,
        width: '100px',
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1)'
      }
    );
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
            <span ref={starCountRef} style={{ opacity: 0 }}>
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
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default DisplayHeader;
