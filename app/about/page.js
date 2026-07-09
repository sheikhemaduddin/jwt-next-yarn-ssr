'use client';

import AppShell from '../components/AppShell';

const team = [
  { initials: 'AK', name: 'Alex Kim', role: 'Design' },
  { initials: 'MR', name: 'Morgan Reed', role: 'Frontend' },
  { initials: 'SL', name: 'Sam Liu', role: 'Product' },
];

export default function AboutPage() {
  return (
    <AppShell>
      <div className="container">
        <header className="page-header">
          <h1>About Nova</h1>
          <p>
            A demonstration of Next.js configured as a pure client-side SPA using static
            export — ideal for dashboards, marketing sites, and apps that talk to external APIs.
          </p>
        </header>

        <div className="prose">
          <p>
            This project deliberately avoids custom servers, server components with data fetching,
            API routes, and middleware. At build time, pages are exported to static files; at
            runtime, React handles all interactivity and routing in the browser.
          </p>
          <h2>Architecture</h2>
          <p>
            The App Router still provides file-based routing and shared layouts, but every page
            is a client component. Navigation uses Next.js Link for fast, prefetch-enabled
            transitions without full reloads.
          </p>
        </div>

        <div className="team-grid">
          {team.map((member) => (
            <article key={member.name} className="card">
              <div className="avatar">{member.initials}</div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </article>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
