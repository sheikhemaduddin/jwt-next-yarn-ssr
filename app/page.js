'use client';

import Link from 'next/link';
import AppShell from './components/AppShell';
import Counter from './components/Counter';
import FeatureCard from './components/FeatureCard';

const features = [
  {
    icon: '⚡',
    title: 'Instant navigation',
    description: 'Route changes happen on the client with no full page reloads.',
  },
  {
    icon: '🎯',
    title: 'Static export',
    description: 'Pre-built HTML and JS served as a lightweight single-page app.',
  },
  {
    icon: '🧩',
    title: 'Component-driven',
    description: 'Modular React UI with shared layout, nav, and interactive widgets.',
  },
  {
    icon: '🌙',
    title: 'Polished design',
    description: 'Dark theme, gradients, and responsive layout out of the box.',
  },
];

export default function HomePage() {
  return (
    <AppShell>
      <section className="hero container">
        <p className="eyebrow">Client-side · Single-page app</p>
        <h1>
          Build fast.<br />
          <span>Ship in the browser.</span>
        </h1>
        <p>
          Nova is a fully client-rendered Next.js app — no custom server, no API routes,
          and no server-side rendering at runtime. Just a clean SPA experience.
        </p>
        <div className="hero-actions">
          <Link href="/projects" className="btn btn-primary">
            View projects
          </Link>
          <Link href="/about" className="btn btn-secondary">
            Learn more
          </Link>
        </div>

        <div className="stats-row">
          <div className="stat">
            <div className="stat-value">0</div>
            <div className="stat-label">Server endpoints</div>
          </div>
          <div className="stat">
            <div className="stat-value">100%</div>
            <div className="stat-label">Client-side</div>
          </div>
          <div className="stat">
            <div className="stat-value">3</div>
            <div className="stat-label">App routes</div>
          </div>
        </div>

        <Counter />
      </section>

      <section className="section container">
        <div className="section-header">
          <h2>Why this setup</h2>
          <p>Everything you see is rendered and navigated in the browser.</p>
        </div>
        <div className="grid">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
