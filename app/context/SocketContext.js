'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { connectSocket, disconnectSocket, getSocketUrl } from '../../lib/socket';
import { useAuth } from './AuthContext';

const SocketContext = createContext(null);
const MAX_MESSAGES = 100;
const MAX_ACTIVITY = 40;

export function SocketProvider({ children }) {
  const { isAuthenticated, token } = useAuth();
  const [connected, setConnected] = useState(false);
  const [presence, setPresence] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activity, setActivity] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      disconnectSocket();
      setConnected(false);
      setPresence([]);
      setMessages([]);
      setActivity([]);
      setError(null);
      return undefined;
    }

    let cancelled = false;
    let activeSocket = null;

    (async () => {
      const socket = await connectSocket(token);
      if (cancelled || !socket) return;
      activeSocket = socket;

      function onConnect() {
        setConnected(true);
        setError(null);
      }

      function onDisconnect() {
        setConnected(false);
      }

      function onConnectError(err) {
        setConnected(false);
        setError(err?.message || 'Unable to connect to realtime server');
      }

      function onPresence(payload) {
        setPresence(Array.isArray(payload?.users) ? payload.users : []);
      }

      function onMessage(message) {
        setMessages((prev) => [...prev, message].slice(-MAX_MESSAGES));
      }

      function onActivity(event) {
        setActivity((prev) => [...prev, event].slice(-MAX_ACTIVITY));
      }

      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.on('connect_error', onConnectError);
      socket.on('presence:update', onPresence);
      socket.on('chat:message', onMessage);
      socket.on('activity:event', onActivity);

      if (socket.connected) {
        setConnected(true);
      }
    })();

    return () => {
      cancelled = true;
      if (activeSocket) {
        activeSocket.removeAllListeners();
      }
      disconnectSocket();
      setConnected(false);
    };
  }, [isAuthenticated, token]);

  const sendMessage = useCallback(
    async (text) => {
      if (!text?.trim()) return;
      const socket = await connectSocket(token);
      if (!socket) return;
      socket.emit('chat:send', { text: text.trim() });
    },
    [token]
  );

  const pingActivity = useCallback(async () => {
    const socket = await connectSocket(token);
    if (!socket) return;
    socket.emit('activity:ping');
  }, [token]);

  const value = useMemo(
    () => ({
      connected,
      presence,
      messages,
      activity,
      error,
      socketUrl: getSocketUrl(),
      sendMessage,
      pingActivity,
    }),
    [connected, presence, messages, activity, error, sendMessage, pingActivity]
  );

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

export function useSocket() {
  const ctx = useContext(SocketContext);
  if (!ctx) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return ctx;
}
