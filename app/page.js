'use client';

import Link from 'next/link';
import AppShell from './components/AppShell';
import Counter from './components/Counter';
import FeatureCard from './components/FeatureCard';

const features = [
  {
    icon: '⚡',
    title: 'SSR + App Router',
    description: 'One Next.js Node process serves pages, API routes, and realtime sockets.',
  },
  {
    icon: '🔐',
    title: 'JWT authentication',
    description: 'Register and sign in via API routes — tokens verified on the server.',
  },
  {
    icon: '📡',
    title: 'Socket.IO live room',
    description: 'Presence, activity, and chat on the same origin after you authenticate.',
  },
  {
    icon: '🧩',
    title: 'Same Nova UI',
    description: 'Familiar layout, dashboard, and dark theme — now backed by SSR.',
  },
];

export default function HomePage() {
  return (
    <AppShell>
      <section className="hero container">
        <p className="eyebrow">SSR · JWT · Socket.IO</p>
        <h1>
          Build fast.<br />
          <span>Ship as one app.</span>
        </h1>
        <p>
          Nova is a single Next.js server with JWT auth and Socket.IO — register, sign in,
          and join the live dashboard without a second process.
        </p>
        <div className="hero-actions">
          <Link href="/register" className="btn btn-primary">
            Get started
          </Link>
          <Link href="/login" className="btn btn-secondary">
            Sign in
          </Link>
        </div>

        <div className="stats-row">
          <div className="stat">
            <div className="stat-value">JWT</div>
            <div className="stat-label">Server-issued</div>
          </div>
          <div className="stat">
            <div className="stat-value">1</div>
            <div className="stat-label">Node process</div>
          </div>
          <div className="stat">
            <div className="stat-value">WS</div>
            <div className="stat-label">Socket.IO</div>
          </div>
        </div>

        <Counter />
      </section>

      <section className="section container">
        <div className="section-header">
          <h2>Why this setup</h2>
          <p>Auth APIs and realtime sockets share the same SSR server as the UI.</p>
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
