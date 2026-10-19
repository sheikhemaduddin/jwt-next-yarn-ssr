'use client';

import Navbar from './Navbar';

export default function AppShell({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main>{children}</main>
      <footer className="footer">
        <div className="container footer-inner">
          <span>Nova · SSR + Socket.IO</span>
          <span>JWT auth on one Node process</span>
        </div>
      </footer>
    </div>
  );
}
