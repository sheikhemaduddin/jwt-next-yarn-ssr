let socket = null;

export function getSocketUrl() {
  if (typeof window === 'undefined') return '';
  return process.env.NEXT_PUBLIC_SOCKET_URL || window.location.origin;
}

export async function connectSocket(token) {
  if (typeof window === 'undefined' || !token) return null;

  if (socket?.connected) {
    return socket;
  }

  const { io } = await import('socket.io-client');
  const url = getSocketUrl();

  if (socket) {
    socket.auth = { token };
    socket.connect();
    return socket;
  }

  socket = io(url, {
    path: '/socket.io',
    autoConnect: false,
    auth: { token },
    transports: ['websocket', 'polling'],
  });

  socket.connect();
  return socket;
}

export function disconnectSocket() {
  if (!socket) return;
  socket.removeAllListeners();
  socket.disconnect();
  socket = null;
}

export function getSocket() {
  return socket;
}
