# Local AI Agent Workspace

A full-stack, local-first AI playground featuring:

- **Gemini chat agent** – Stream responses from Google Gemini 1.5 models with optional system prompts.
- **Streaming responses** – Real-time token streaming over Server-Sent Events with built-in conversation-aware search.
- **Persistent conversations** – SQLite database (via Knex) that stores users, conversations, messages, and Gemini embeddings for semantic recall.
- **Secure backend** – JWT authentication, model/agent proxy, and REST APIs for conversation history.
- **TypeScript frontend** – Vite + React client with authentication, conversation switcher, model selector, and streaming chat UI.

The repository is organised as a lightweight monorepo:

| Package | Description |
| --- | --- |
| `ai-agent` | Gemini-only agent core (chat streaming + embeddings). |
| `backend-express` | Express API server, authentication, vector store persistence, streaming endpoint. |
| `frontend-react` | Vite/React TypeScript client with auth, conversation management, streaming chat. |

---

## Prerequisites

- Node.js 20.19.0 or newer (Vite 7 requires ≥ 20.19.0 or ≥ 22.12.0).
- npm 10+
- Google Gemini API key (`GEMINI_API_KEY`) for chat and embeddings.

---

## Environment Setup

1. **Clone and install dependencies**

   ```sh
   # From the repository root
   npm install --prefix ai-agent
   npm install --prefix backend-express
   npm install --prefix frontend-react
   ```

2. **Create a shared environment file**

   ```sh
   cp .env.example .env
   # then edit .env and provide the required secrets
   ```

   | Variable | Required | Purpose |
   | --- | --- | --- |
| `GEMINI_API_KEY` | ✅ | Enables Gemini chat streaming and embeddings. |
   | `JWT_SECRET` | ✅ | Secret used to sign backend access tokens. Generate a long random string. |
   | `PORT` | Optional | API server port (default: `5001`). |
   | `CLIENT_ORIGIN` | Optional | CORS allowlist for the frontend (default: `*`). |
   | `SQLITE_PATH` | Optional | Override path to the SQLite database (defaults to `./data/app.sqlite3`). |

3. **Bootstrap the SQLite database**

   ```sh
   # Run from the repository root
   npm run migrate --prefix backend-express
   npm run seed --prefix backend-express
   ```

   This creates `./data/app.sqlite3` and seeds a demo user (`demo@example.com` / `Password123!`) plus a welcome conversation.

4. **Connect to Supabase for production**

   - Local overrides live in `backend-express/.env.local` (git ignored). Set `NODE_ENV=development` there to keep Knex pointed at SQLite for fast iteration. You can also pin a custom `SQLITE_PATH`.
   - `NODE_ENV=production` (or passing `--env production`) tells Knex to use the Supabase PostgreSQL database defined by `DATABASE_URL`.

   Run these commands from the repo root whenever you need to update Supabase:

   ```sh
   npm run migrate --prefix backend-express -- --env production
   npm run seed --prefix backend-express -- --env production
   ```

   The first command applies schema changes; the second repopulates demo data in Supabase.

   Automated migrations: add `DATABASE_URL` (and optionally `DATABASE_SSL`) as GitHub repository secrets and the `Database Migrations` workflow will run `npm run migrate --prefix backend-express` on every push to `main` or when triggered manually.

---

## Package-by-Package Quickstart

### `ai-agent`

1. Install deps: `npm install`
2. The package exposes:
   - `runAgent` – standard Gemini completion helper.
   - `streamAgent` – async generator for streaming tokens.
   - `createEmbedding` – helper for Gemini embedding vectors.
3. Configure your Google API key via the shared `.env`.
4. Import it from other Node projects with `require('../ai-agent')` or publish as needed.

### `backend-express`

1. Install deps: `npm install`
2. Ensure `.env` is populated and migrations/seeds have been run.
3. Start the API in watch mode:

   ```sh
   npm run dev
   ```

   For a single-run production process (used by Vercel and other hosts):

   ```sh
   npm run start
   ```

   Key endpoints (all JWT protected):
   - `POST /api/auth/register` – create a user (returns token).
   - `POST /api/auth/login` – authenticate and receive a token.
   - `GET /api/conversations` – list user conversations (newest first).
   - `GET /api/conversations/:id` – fetch messages for a conversation.
   - `POST /api/chat` – non-streaming agent response (stores history + embeddings).
   - `POST /api/chat/stream` – streaming tokens over `text/event-stream`.

   The backend writes to `./data/app.sqlite3` by default and automatically indexes messages into the `message_embeddings` table.

   `npm run build` now performs a lint check to keep deployments healthy.

### `frontend-react`

1. Install deps: `npm install`
2. Create `frontend-react/.env` if you need to override the API URL:

   ```sh
   # VITE_API_URL is preferred, older projects using VITE_API_BASE_URL continue to work.
   echo "VITE_API_URL=http://localhost:5001" > frontend-react/.env
   ```

3. Run the dev server:

   ```sh
   npm run dev
   ```

   - Sign in with the seeded demo account or register a new one.
   - Choose the Gemini model from the left sidebar (selected by default).
   - Provide an optional system prompt and chat—responses stream token-by-token.
   - Conversations are stored automatically; select them from the sidebar to resume.

   The production build reads `frontend-react/.env.production`, which targets the deployed backend API. Update that file if you redeploy the backend to a new host.

4. Additional scripts:
   - `npm run build` – production bundle (requires Node ≥ 20.19.0).
   - `npm run lint` – ESLint powered by the Vite config.
   - `npm run typecheck` – strict TypeScript project check.

---

## Data Model & Persistence

- `users` – application accounts (email + bcrypt hash).
- `conversations` – per-user conversation threads with timestamps.
- `messages` – ordered chat turns (user + assistant) stored verbatim.
- `message_embeddings` – Gemini embeddings (JSON stored vectors) for semantic recall.

The backend computes embeddings for every message and exposes a built-in tool (`search_conversation`) which the agent can call to retrieve high-signal snippets from prior chats.

---

## Streaming & Context Recall

- **Streaming**: `POST /api/chat/stream` returns a server-sent event stream with `{ token }` chunks and a final `{ done: true, conversationId, messageId }` payload. The frontend consumes this stream using the Fetch `ReadableStream` API.
- **Context recall**: Each message is embedded with Gemini, and high-signal snippets are injected into the system prompt before sending the next request.
- **Gemini-only**: All chat and embeddings run through Google Gemini; make sure `GEMINI_API_KEY` is available to the backend.

---

## Troubleshooting

- **Node version**: Vite 7 enforces Node ≥ 20.19.0. Upgrade Node if `npm run build` fails with an engine warning.
- **Missing migrations**: If you see `SQLITE_CANTOPEN`, ensure the `data/` directory exists (created automatically) and re-run migrations.
- **Authentication errors**: All chat endpoints require a valid Bearer token. Obtain one via the `/api/auth/login` or `/register` routes.
- **Embeddings**: The vector store uses Gemini embeddings; ensure `GEMINI_API_KEY` is set for both chat and semantic search.

---

## Roadmap Ideas

- Optional refresh tokens or OAuth-based authentication.
- Background summarisation of long conversations.
- Pluggable embedding providers (e.g., Gemini or local models) for the vector store.
- fine-grained tool registry surfaced in the frontend UI.

Enjoy building with your local Gemini-powered AI agent!
