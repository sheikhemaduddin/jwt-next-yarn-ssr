'use client';

import AppShell from '../components/AppShell';
import ProtectedRoute from '../components/ProtectedRoute';
import RealtimePanel from '../components/RealtimePanel';
import { useAuth } from '../context/AuthContext';

function DashboardContent() {
  const { user, token, logout } = useAuth();
  const preview = token ? `${token.slice(0, 28)}…${token.slice(-12)}` : '';

  return (
    <div className="container">
      <header className="page-header">
        <p className="eyebrow">Protected</p>
        <h1>Welcome, {user?.name}</h1>
        <p>
          This page is gated by JWT verification. After you sign in, Socket.IO connects on the
          same server using that token for presence, activity, and chat.
        </p>
      </header>

      <div className="grid">
        <article className="card">
          <h3>Account</h3>
          <p>
            <strong style={{ color: 'var(--text)' }}>{user?.email}</strong>
            <br />
            User ID: <code className="token-code">{user?.id}</code>
          </p>
        </article>

        <article className="card">
          <h3>Session JWT</h3>
          <p className="token-preview">{preview}</p>
          <p style={{ marginTop: '0.75rem' }}>Algorithm: HS256 · TTL: 8 hours</p>
        </article>

        <article className="card">
          <h3>Session actions</h3>
          <p>Clear the token from local storage and disconnect realtime.</p>
          <button type="button" className="btn btn-secondary" style={{ marginTop: '1rem' }} onClick={logout}>
            Sign out
          </button>
        </article>
      </div>

      <RealtimePanel />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AppShell>
      <ProtectedRoute>
        <DashboardContent />
      </ProtectedRoute>
    </AppShell>
  );
}
