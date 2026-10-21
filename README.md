# Shopping List API — `lista-mercado-express-prisma`

RESTful API for a shopping list application: grocery items are organized into categories and can be created, listed, updated, and removed. Built with **Express 5**, **TypeScript**, **Prisma 7**, and **PostgreSQL**.

This repository is the backend of a two-part full-stack project. The companion frontend (React + TypeScript + Vite) lives in [`estudo-lista-mercado-react-puro`](https://github.com/luckdawn-dev/estudo-lista-mercado-react-puro).

![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6)
![Express](https://img.shields.io/badge/Express-5-000000)
![Prisma](https://img.shields.io/badge/Prisma-7-5A67D8)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-699ECA)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED)
![CI](https://github.com/luckdawn-dev/estudo-lista-mercado-express-prisma/actions/workflows/ci.yml/badge.svg)

---

## Highlights

The goal of this project was to practice engineering practices beyond "make it work":

- **Layered architecture** — controllers expose HTTP routes, services own the business logic, and only the service layer talks to the database via Prisma (no direct DB access from controllers).
- **Request validation** — reusable [Zod](https://zod.dev/) validation middleware attached to routes; invalid payloads are rejected with a `400` and structured error details.
- **Centralized error handling** — a single Express error middleware serializes all failures as JSON, respects `err.status`/`err.statusCode`, and only exposes stack traces in development.
- **Security middleware** — [Helmet](https://helmetjs.github.io/) security headers, `express-rate-limit` traffic throttling (100 requests per IP per 15-minute window), and CORS enabled.
- **Observability** — `GET /health` liveness endpoint returning `{ status, timestamp }` for monitoring and deploy checks.
- **Integration tests** — [Supertest](https://github.com/ladjs/supertest) suite covering the app instance without binding it to a port.
- **Reproducible environment** — Docker Compose stacks PostgreSQL 16 and the API itself; a `Dockerfile` builds the runnable image.
- **Migrations in source control** — Prisma migration history (`prisma/migrations/`) is committed, so any environment can rebuild the schema.
- **CI pipeline** — GitHub Actions workflow installs dependencies and runs the test suite on every push/PR.
- **Serverless-friendly** — the Express `app` instance is exported so it can be hosted as a serverless function (e.g., Vercel) as well as long-running Node.

## Tech stack

| Layer          | Technology                          |
| -------------- | ----------------------------------- |
| Runtime        | Node.js 20+, TypeScript (ESM)       |
| HTTP framework | Express 5                           |
| ORM            | Prisma 7 (with `@prisma/adapter-pg`) |
| Database       | PostgreSQL 16                       |
| Validation     | Zod                                 |
| Security       | Helmet, express-rate-limit, CORS    |
| Testing        | Supertest + Jest tooling            |
| Infra / CI     | Docker Compose, GitHub Actions      |

## API reference

Base URL: `http://localhost:3000`

| Method   | Endpoint                 | Description                                                                |
| -------- | ------------------------ | -------------------------------------------------------------------------- |
| `GET`    | `/health`                | Liveness check — `{ "status": "ok", "timestamp": "..." }`                  |
| `GET`    | `/category`              | List all categories                                                        |
| `GET`    | `/category/:id`          | Get a single category by id                                                |
| `POST`   | `/category/`             | Create a category — body validated with Zod, e.g. `{ "name": "Fruit" }`    |
| `PUT`    | `/category/:id`          | Update a category                                                          |
| `DELETE` | `/category/:id`          | Delete a category **and all of its shop items** (handled in the service)   |
| `GET`    | `/shopItem`              | List all shopping items                                                    |
| `GET`    | `/shopItem/:categoryId`  | List the shopping items of one category                                    |
| `POST`   | `/shopItem/`             | Create a shopping item, e.g. `{ "name": "Apple", "categoryId": "...", "quantity": 1 }` |
| `PUT`    | `/shopItem/:id`          | Update a shopping item                                                     |
| `DELETE` | `/shopItem/:id`          | Delete a shopping item                                                     |

## Project structure

```
├── index.ts                      # Express app wiring (security, routes, error handler)
├── prisma.config.ts              # Prisma 7 configuration (schema, migrations, datasource URL)
├── prisma/
│   ├── schema.prisma             # Category / ShopItem data model
│   └── migrations/               # Committed migration history
├── src/
│   ├── db.ts                     # PrismaClient + driver adapter (pg)
│   ├── controllers/
│   │   ├── category-controller.ts
│   │   └── shop-item-controller.ts   # HTTP layer only
│   ├── services/
│   │   ├── category.service.ts       # Business rules + DB access
│   │   └── shop-item.service.ts
│   ├── middleware/
│   │   ├── validate.ts               # Generic Zod validation middleware
│   │   └── errorHandler.ts           # Centralized JSON error handler
│   └── schemas/
│       └── category.schema.ts        # request body contracts
├── tests/
│   └── category.test.ts          # Supertest integration tests
├── docker-compose.yml            # postgres 16 + api service
└── .github/workflows/ci.yml      # CI pipeline
```

Request flow: **Route → `validate(schema)` → Controller → Service → Prisma → PostgreSQL**, with the error handler as the last catch-all.

## Getting started

### Prerequisites

- **Node.js 20+** and npm
- **Docker** (or a local PostgreSQL 16 instance)

### 1. Install dependencies

```bash
npm install
# postinstall runs `prisma generate` automatically
```

### 2. Start the database

```bash
docker compose up -d db
```

This starts a PostgreSQL 16 container on port `5432` (credentials are defined in `docker-compose.yml`).

### 3. Configure the environment

Create a `.env` file in the project root pointing to your database:

```env
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/lista_mercado?schema=public"
```

### 4. Apply migrations and run the API

```bash
npx prisma migrate dev
npm run dev
# API available at http://localhost:3000
```

### Run everything with Docker (API + database)

```bash
docker compose up --build -d
docker compose exec api npx prisma migrate deploy
```

## Testing

```bash
npm test
```

Runs a Supertest smoke suite against the exported Express app (`/health` check). The full test suite is designed to run against a database connection when more integration tests are added.

## Roadmap

- Extend the Zod validation middleware to every write endpoint (currently applied to `POST /category`)
- Move the category → items cascade to the database level (`onDelete: Cascading` in the Prisma schema)
- Replace `any` in service signatures with generated Prisma types
- Add OpenAPI/Swagger documentation and request logging

## License

Released under the [MIT License](./LICENSE).

## Related repository

- Frontend (React + TypeScript + Vite): [`estudo-lista-mercado-react-puro`](https://github.com/luckdawn-dev/estudo-lista-mercado-react-puro)
