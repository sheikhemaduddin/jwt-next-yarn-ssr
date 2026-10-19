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
            A Next.js SSR app with server-issued JWT auth and Socket.IO on one custom
            <code> server.js</code> entry — same UI, one deployable process.
          </p>
        </header>

        <div className="prose">
          <p>
            Login and register hit API routes that sign HS256 JWTs. The dashboard opens a
            Socket.IO connection on the same origin, authenticated with that token for
            presence, activity, and chat.
          </p>
          <h2>Architecture</h2>
          <p>
            Next handles pages and <code>/api/auth/*</code>. Socket.IO attaches to the same
            HTTP server. Cloudways Entry File should be <code>server.js</code>.
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
