'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="interactive-panel">
      <div>
        <h3>Live client state</h3>
        <p>This counter runs entirely in the browser — no server round-trips.</p>
      </div>
      <div className="counter-controls">
        <button
          type="button"
          className="counter-btn"
          onClick={() => setCount((c) => c - 1)}
          aria-label="Decrease count"
        >
          −
        </button>
        <span className="counter-display">{count}</span>
        <button
          type="button"
          className="counter-btn"
          onClick={() => setCount((c) => c + 1)}
          aria-label="Increase count"
        >
          +
        </button>
      </div>
    </div>
  );
}
