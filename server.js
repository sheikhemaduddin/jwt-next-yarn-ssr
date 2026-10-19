// Unified Next.js SSR + Socket.IO server (single process).
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');
const { attachRealtime } = require('./server/realtime');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = Number(process.env.PORT) || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(httpServer, {
    path: '/socket.io',
    cors: {
      origin: true,
      methods: ['GET', 'POST'],
    },
  });

  attachRealtime(io);

  httpServer.listen(port, hostname, () => {
    console.log(`[nova] SSR + Socket.IO ready on http://${hostname}:${port} (dev=${dev})`);
  });
});
