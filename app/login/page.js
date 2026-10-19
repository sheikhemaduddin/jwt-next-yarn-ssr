'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppShell from '../components/AppShell';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [authLoading, isAuthenticated, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login({ email, password });
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AppShell>
      <div className="auth-wrap container">
        <div className="auth-card">
          <p className="eyebrow">JWT Auth</p>
          <h1>Sign in</h1>
          <p className="auth-lead">
            Authenticate with your email. A signed JWT is stored in the browser for the session.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error ? <div className="auth-error" role="alert">{error}</div> : null}

            <label className="field">
              <span>Email</span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="field">
              <span>Password</span>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </label>

            <button type="submit" className="btn btn-primary auth-submit" disabled={submitting}>
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="auth-footer-text">
            No account? <Link href="/register">Create one</Link>
          </p>
        </div>
      </div>
    </AppShell>
  );
}
