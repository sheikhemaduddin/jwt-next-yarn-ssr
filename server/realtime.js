const { jwtVerify } = require('jose');

const ISSUER = 'nova-spa';
const AUDIENCE = 'nova-users';

function getSecret() {
  return new TextEncoder().encode(
    process.env.JWT_SECRET || 'nova-csr-demo-secret-change-me'
  );
}

async function verifyHandshakeToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      issuer: ISSUER,
      audience: AUDIENCE,
    });
    if (!payload.sub || !payload.name) return null;
    return {
      id: String(payload.sub),
      email: payload.email ? String(payload.email) : '',
      name: String(payload.name),
    };
  } catch {
    return null;
  }
}

function attachRealtime(io) {
  /** @type {Map<string, { id: string, name: string, sockets: Set<string> }>} */
  const onlineUsers = new Map();

  function presencePayload() {
    return {
      users: Array.from(onlineUsers.values()).map(({ id, name }) => ({ id, name })),
    };
  }

  function broadcastPresence() {
    io.emit('presence:update', presencePayload());
  }

  function emitActivity(type, name) {
    io.emit('activity:event', {
      type,
      name,
      at: new Date().toISOString(),
    });
  }

  io.use(async (socket, next) => {
    const token = socket.handshake.auth?.token;
    const user = await verifyHandshakeToken(token);
    if (!user) {
      return next(new Error('Unauthorized'));
    }
    socket.user = user;
    return next();
  });

  io.on('connection', (socket) => {
    const user = socket.user;
    const existing = onlineUsers.get(user.id);

    if (existing) {
      existing.sockets.add(socket.id);
    } else {
      onlineUsers.set(user.id, {
        id: user.id,
        name: user.name,
        sockets: new Set([socket.id]),
      });
      emitActivity('joined', user.name);
    }

    broadcastPresence();

    socket.emit('activity:event', {
      type: 'connected',
      name: user.name,
      at: new Date().toISOString(),
    });

    socket.on('chat:send', (payload) => {
      const text = typeof payload?.text === 'string' ? payload.text.trim() : '';
      if (!text || text.length > 500) return;

      io.emit('chat:message', {
        id: crypto.randomUUID(),
        userId: user.id,
        name: user.name,
        text,
        at: new Date().toISOString(),
      });
      emitActivity('message', user.name);
    });

    socket.on('activity:ping', () => {
      emitActivity('ping', user.name);
    });

    socket.on('disconnect', () => {
      const entry = onlineUsers.get(user.id);
      if (!entry) return;

      entry.sockets.delete(socket.id);
      if (entry.sockets.size === 0) {
        onlineUsers.delete(user.id);
        emitActivity('left', user.name);
      }
      broadcastPresence();
    });
  });
}

module.exports = { attachRealtime };
