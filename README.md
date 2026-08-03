# Minimalist CV

Simple web app that renders minimalist CV with print-friendly layout.

Built with Next.js and shadcn/ui, deployed on Vercel.

# Features

- Setup only takes a few minutes [single config file](./src/data/resume-data.tsx)
- Built using Next.js 16, React, Typescript, Shadcn/ui, TailwindCss
- English and German, each on its own prerendered URL (`/en`, `/de`)
- Light and dark mode, with the choice remembered between visits
- Print layout that fits a single A4 page, projects included
- Auto generated Layout
- Responsive for different devices
- Optimized for Next.js and Vercel

# Getting Started Locally

Requires Node 20.9 or newer (Next 16).

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Gnadi/cv.git
   ```

2. Move to the cloned directory

   ```bash
   cd cv
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the local Server:

   ```bash
   npm run dev
   ```

5. Open the [Config file](./src/data/resume-data.tsx) and make changes

`/` redirects to `/en`. Both languages come from the same config file — every
translated field is an `{ en, de }` pair.

# Checks

```bash
npm run lint   # ESLint (flat config)
npm test       # Playwright: routing, a11y, print output
```

`npm test` builds the app and starts it on port 3210 by itself. Playwright
downloads its own Chromium on first run; set `PLAYWRIGHT_CHROMIUM_PATH` to
reuse a browser that is already installed.

# Configuration

| Variable               | Purpose                                                                  |
| ---------------------- | ------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata and OpenGraph URLs, e.g. `https://cv.example.com`. On Vercel the production domain is used automatically; otherwise it falls back to `http://localhost:3000`. |

# Run with Docker

Build the container

```
docker compose build
```

Run the container

```
docker compose up -d
```

Stop the Container

```
docker compose down 
```

# License

[MIT](https://choosealicense.com/licenses/mit/)
