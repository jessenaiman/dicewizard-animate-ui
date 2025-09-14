import React from "react";
import Link from "next/link";

export default function PortfolioPage() {
  return (
    <div data-slot="portfolio-landing">
      <h1>Portfolio Workbench</h1>
      <p>
        This isolated area lets you iterate on landing pages, blog posts, and
        styles without touching the main site layout, navigation, or global
        styles.
      </p>
      <ul>
        <li>
          <Link href="/portfolio/blog">Blog</Link>
        </li>
        <li>
          <a
            href="https://your-self-hosted-animate-ui.example.com"
            target="_blank"
            rel="noreferrer"
          >
            Self-hosted Animate&nbsp;UI
          </a>
        </li>
      </ul>
    </div>
  );
}

