'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';

function formatTime(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
}

function activityLabel(event) {
  switch (event.type) {
    case 'joined':
      return `${event.name} came online`;
    case 'left':
      return `${event.name} went offline`;
    case 'message':
      return `${event.name} sent a message`;
    case 'ping':
      return `${event.name} pinged the room`;
    case 'connected':
      return `Connected as ${event.name}`;
    default:
      return `${event.name}: ${event.type}`;
  }
}

export default function RealtimePanel() {
  const { user } = useAuth();
  const { connected, presence, messages, activity, error, socketUrl, sendMessage, pingActivity } =
    useSocket();
  const [draft, setDraft] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!draft.trim()) return;
    sendMessage(draft);
    setDraft('');
  }

  return (
    <section className="section" style={{ paddingTop: '2rem' }}>
      <div className="section-header realtime-header">
        <div>
          <h2>Live room</h2>
          <p>Presence, activity, and chat over Socket.IO — authenticated with your JWT.</p>
        </div>
        <div className={`socket-badge${connected ? ' is-online' : ' is-offline'}`}>
          <span className="socket-dot" aria-hidden="true" />
          {connected ? 'Connected' : 'Disconnected'}
        </div>
      </div>

      {error ? (
        <div className="auth-error" role="alert" style={{ marginBottom: '1.25rem' }}>
          {error}. Expected Socket.IO on <code className="token-code">{socketUrl}</code> (same app).
        </div>
      ) : null}

      <div className="realtime-grid">
        <article className="card realtime-card">
          <h3>Online ({presence.length})</h3>
          {presence.length === 0 ? (
            <p>No one connected yet.</p>
          ) : (
            <ul className="presence-list">
              {presence.map((u) => (
                <li key={u.id}>
                  <span className="presence-avatar">{u.name.slice(0, 1).toUpperCase()}</span>
                  <span>
                    {u.name}
                    {u.id === user?.id ? ' (you)' : ''}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            className="btn btn-secondary"
            style={{ marginTop: '1rem' }}
            onClick={pingActivity}
            disabled={!connected}
          >
            Send ping
          </button>
        </article>

        <article className="card realtime-card">
          <h3>Activity</h3>
          <ul className="activity-list">
            {[...activity].reverse().map((event, index) => (
              <li key={`${event.at}-${event.type}-${index}`}>
                <span>{activityLabel(event)}</span>
                <time>{formatTime(event.at)}</time>
              </li>
            ))}
            {activity.length === 0 ? <li className="muted-row">Waiting for events…</li> : null}
          </ul>
        </article>

        <article className="card realtime-card realtime-chat">
          <h3>Chat</h3>
          <div className="chat-log">
            {messages.length === 0 ? (
              <p className="muted-row">No messages yet. Say hello.</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`chat-bubble${msg.userId === user?.id ? ' is-mine' : ''}`}
                >
                  <div className="chat-meta">
                    <strong>{msg.name}</strong>
                    <time>{formatTime(msg.at)}</time>
                  </div>
                  <p>{msg.text}</p>
                </div>
              ))
            )}
          </div>
          <form className="chat-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={connected ? 'Type a message…' : 'Connect to chat…'}
              maxLength={500}
              disabled={!connected}
            />
            <button type="submit" className="btn btn-primary" disabled={!connected || !draft.trim()}>
              Send
            </button>
          </form>
        </article>
      </div>
    </section>
  );
}
