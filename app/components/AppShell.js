'use client';

import Navbar from './Navbar';

export default function AppShell({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main>{children}</main>
      <footer className="footer">
        <div className="container footer-inner">
          <span>Nova · Client-side SPA</span>
          <span>Built with Next.js static export</span>
        </div>
      </footer>
    </div>
  );
}
