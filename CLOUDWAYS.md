# next-custom · yarn · CSR SPA

| Field | Value |
|-------|-------|
| Framework Preset | Next.js |
| Package Manager | yarn |
| Build Command | `yarn install && yarn build` |
| Output Directory | `out` |
| Start Command | `yarn start` |
| Node | >=18.18.0 |

Static export — no custom server. Serves the `out/` folder on `process.env.PORT` (default 3000).

Generate the lockfile with `./generate-lockfile.sh` before pushing.
