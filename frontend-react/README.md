# System Design Frontend (Next.js)

This frontend renders the System Design School experience using [Next.js 14](https://nextjs.org/). The UI matches the original single-page implementation while taking advantage of Next.js routing and build tooling.

## Getting Started

```bash
npm install
npm run dev
```

The development server runs on [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` – start the Next.js development server
- `npm run build` – create an optimized production build
- `npm run start` – start the production build locally
- `npm run lint` – run ESLint using the Next.js configuration
- `npm run typecheck` – run TypeScript without emitting output

## Project Structure

- `src/app` – Next.js App Router entry points (`/`, `/practice`, `/courses`, `/primer`, `/pricing`)
- `src/components` – Shared UI components
- `src/data` – Static data powering the UI
- `src/views` – Page-level React components reused by the route handlers
- `public` – Static assets served as-is

Global styles live in `src/app/globals.css` and preserve the look and feel from the previous React build.
