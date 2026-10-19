'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="container page-header" style={{ textAlign: 'center' }}>
        <p className="eyebrow">Auth</p>
        <h1>Checking session…</h1>
        <p>Verifying your JWT in the browser.</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
