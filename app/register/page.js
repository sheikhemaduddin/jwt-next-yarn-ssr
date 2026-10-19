'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppShell from '../components/AppShell';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
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
      await register({ name, email, password });
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AppShell>
      <div className="auth-wrap container">
        <div className="auth-card">
          <p className="eyebrow">JWT Auth</p>
          <h1>Create account</h1>
          <p className="auth-lead">
            Register locally, then receive an HS256 JWT for protected client routes.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error ? <div className="auth-error" role="alert">{error}</div> : null}

            <label className="field">
              <span>Name</span>
              <input
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Kim"
                required
              />
            </label>

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
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                minLength={6}
                required
              />
            </label>

            <button type="submit" className="btn btn-primary auth-submit" disabled={submitting}>
              {submitting ? 'Creating…' : 'Create account'}
            </button>
          </form>

          <p className="auth-footer-text">
            Already have an account? <Link href="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </AppShell>
  );
}
