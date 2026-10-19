# next-yarn — SSR + JWT + Socket.IO

One Next.js app: server-rendered hosting, JWT auth API routes, and Socket.IO on the same Node process (`server.js`). UI unchanged (Nova dashboard with presence, activity, chat).

## Scripts

```bash
npm run dev     # unified server (http://localhost:3000)
npm run build
npm run start   # production (NODE_ENV=production node server.js)
```

## Environment

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `3000` | HTTP + Socket.IO |
| `JWT_SECRET` | demo secret | Sign/verify JWTs |
| `HOSTNAME` | `0.0.0.0` | Bind address |
| `NEXT_PUBLIC_SOCKET_URL` | same origin | Override socket URL if needed |

## Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

Tokens are set as an httpOnly cookie and also returned for the Socket.IO handshake.

## Realtime

Socket.IO path `/socket.io` on the same server. Dashboard uses JWT in `auth.token` for presence, activity, and chat.

## Routes

- `/` Home
- `/about` About
- `/projects` Projects
- `/register` `/login` Auth
- `/dashboard` Protected + live room
