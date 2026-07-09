'use client';

export default function FeatureCard({ icon, title, description }) {
  return (
    <article className="card">
      <div className="card-icon" aria-hidden="true">
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
