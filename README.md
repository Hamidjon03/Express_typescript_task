# TypeScript Express API with PostgreSQL and Prisma

This project provides a RESTful API using Express, TypeScript, PostgreSQL, and Prisma ORM.

## Features

- TypeScript setup with modern ES features
- Express server with proper routing
- PostgreSQL database with Docker
- Prisma ORM for type-safe database access
- CRUD operations on Items
- Input validation and error handling
- Docker configuration for easy development

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Docker and Docker Compose

## Project Structure

```
├── prisma/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   └── index.ts
├── .env
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the PostgreSQL database

```bash
docker-compose up -d
```

### 4. Run Prisma migrations

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Start the development server

```bash
npm run dev
```

The server will be running at http://localhost:3001.

## API Endpoints

| Method | Endpoint     | Description       | Body                                       |
|--------|--------------|-------------------|-------------------------------------------|
| POST   | /api/items   | Create a new item | `{ "title": "string", "description": "string" }` |
| GET    | /api/items   | Get all items     | -                                         |
| GET    | /api/items/:id | Get item by ID  | -                                         |
| PUT    | /api/items/:id | Update item     | `{ "title": "string", "description": "string" }` |
| DELETE | /api/items/:id | Delete item     | -                                         |

## Health Check

- GET /health - Returns the status of the API

## Build for Production

```bash
npm run build
npm start
```

## Environment Variables

The following environment variables can be configured in the `.env` file:

- `PORT` - The port the server will listen on (default: 3001)
- `NODE_ENV` - The environment mode (development, production)
- `DATABASE_URL` - PostgreSQL connection string

## License

This project is licensed under the ISC License.
