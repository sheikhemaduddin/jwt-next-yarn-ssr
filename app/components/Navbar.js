'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, loading, logout } = useAuth();

  function handleLogout() {
    logout();
    router.push('/');
  }

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link href="/" className="logo">
          <span className="logo-mark">N</span>
          Nova
        </Link>
        <div className="nav-links">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav-link${pathname === href ? ' active' : ''}`}
            >
              {label}
            </Link>
          ))}

          {!loading && isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className={`nav-link${pathname === '/dashboard' ? ' active' : ''}`}
              >
                Dashboard
              </Link>
              <button type="button" className="nav-link nav-btn" onClick={handleLogout}>
                Sign out
              </button>
              <span className="nav-user" title={user?.email}>
                {user?.name?.split(' ')[0]}
              </span>
            </>
          ) : !loading ? (
            <>
              <Link
                href="/login"
                className={`nav-link${pathname === '/login' ? ' active' : ''}`}
              >
                Sign in
              </Link>
              <Link href="/register" className="btn btn-primary nav-cta">
                Register
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
