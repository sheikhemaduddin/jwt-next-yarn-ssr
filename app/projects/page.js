'use client';

import { useState } from 'react';
import AppShell from '../components/AppShell';

const projects = [
  {
    id: 'pulse',
    name: 'Pulse Analytics',
    tag: 'Dashboard',
    description: 'Real-time metrics dashboard with chart widgets and dark-mode UI.',
    status: 'Live',
  },
  {
    id: 'orbit',
    name: 'Orbit CMS',
    tag: 'Content',
    description: 'Headless content editor with drag-and-drop page builder.',
    status: 'Beta',
  },
  {
    id: 'flux',
    name: 'Flux Commerce',
    tag: 'E-commerce',
    description: 'Product catalog and checkout flow powered by a third-party API.',
    status: 'Live',
  },
  {
    id: 'echo',
    name: 'Echo Notes',
    tag: 'Productivity',
    description: 'Minimal note-taking app with offline-first local storage.',
    status: 'Concept',
  },
];

const filters = ['All', 'Live', 'Beta', 'Concept'];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const visible =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.status === activeFilter);

  return (
    <AppShell>
      <div className="container">
        <header className="page-header">
          <h1>Projects</h1>
          <p>
            Sample portfolio items with client-side filtering — no backend required.
          </p>
        </header>

        <div className="hero-actions" style={{ justifyContent: 'flex-start', marginBottom: '2rem' }}>
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`btn ${activeFilter === filter ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid">
          {visible.map((project) => (
            <article key={project.id} className="card">
              <p className="eyebrow" style={{ marginBottom: '0.85rem', fontSize: '0.65rem' }}>
                {project.tag} · {project.status}
              </p>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
