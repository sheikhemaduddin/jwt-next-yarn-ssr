# next-custom · yarn · SSR + Socket.IO

| Field | Value |
|-------|-------|
| Framework Preset | Next.js |
| Package Manager | yarn |
| Build Command | `yarn install && yarn build` |
| Output Directory | `.next` |
| Entry File | `server.js` |
| Start Command | `yarn start` |
| Node | >=18.18.0 |

Single Node process: Next.js SSR/API + Socket.IO on `process.env.PORT`.

Optional env:

- `JWT_SECRET` — signing/verify secret (set in production)
- `HOSTNAME` — bind host (default `0.0.0.0`)

Generate the Yarn lockfile with `./generate-lockfile.sh` before pushing if Cloudways uses Yarn install.
