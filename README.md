# Fantasy Golf API

A RESTful API server for managing fantasy golf data, built with AdonisJS v6 and PostgreSQL.

## Overview

This is an API-only application that provides endpoints for managing golf players and user authentication. The API enforces JSON responses for all requests and uses token-based authentication.

## Features

- 🏌️ Player management (CRUD operations)
- 🔐 Token-based authentication
- 📊 PostgreSQL database with Lucid ORM
- 🔄 Hot module reloading for development
- ✅ Type-safe with TypeScript
- 🧪 Testing with Japa framework
- 🎯 Service layer architecture for clean separation of concerns

## Tech Stack

- **Framework**: [AdonisJS v6](https://adonisjs.com/)
- **Database**: PostgreSQL 17
- **ORM**: Lucid
- **Authentication**: @adonisjs/auth (Access Tokens)
- **Validation**: VineJS
- **Testing**: Japa
- **Development**: Hot Module Reloading via hot-hook
- **Local Environment**: Lando

## Prerequisites

- Node.js (v20 or higher recommended)
- PostgreSQL 17
- npm or yarn
- Lando (optional, for local development)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd golf
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment setup

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Required environment variables:
```env
PORT=3333
HOST=localhost
NODE_ENV=development
APP_KEY=<generate-with-node-ace-generate:key>
LOG_LEVEL=info

DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=app
```

Generate your application key:
```bash
node ace generate:key
```

### 4. Database setup

#### Using Lando (Recommended)

```bash
# Start Lando environment
lando start

# Run migrations
node ace migration:run

# (Optional) Seed the database
node ace db:seed
```

#### Manual PostgreSQL setup

1. Create a PostgreSQL database
2. Update `.env` with your database credentials
3. Run migrations:
```bash
node ace migration:run
```

### 5. Start the development server

```bash
npm run dev
```

The API will be available at `http://localhost:3333`

## API Endpoints

### Players

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/players` | List all players |
| POST | `/players` | Create a new player |
| GET | `/players/:id` | Get a specific player |
| PUT/PATCH | `/players/:id` | Update a player |
| DELETE | `/players/:id` | Delete a player |

### Example Response

```json
{
  "data": {
    "id": 1,
    "name": "Tiger Woods",
    "pga_id": 12345,
    "salary": 50000
  }
}
```

## Project Structure

```
.
├── app/
│   ├── controllers/       # HTTP request handlers
│   ├── middleware/        # Custom middleware
│   ├── models/           # Database models
│   └── services/         # Business logic layer
├── bin/
│   ├── server.ts         # Production entry point
│   ├── console.ts        # REPL entry point
│   └── test.ts           # Test runner
├── config/               # Configuration files
├── database/
│   ├── migrations/       # Database migrations
│   └── seeders/         # Database seeders
├── start/
│   ├── env.ts           # Environment validation
│   ├── kernel.ts        # Middleware configuration
│   └── routes.ts        # Route definitions
└── tests/               # Test files
```

## Development

### Available Scripts

```bash
# Development with hot reload
npm run dev

# Run tests
npm test

# Run specific test suite
node ace test --files="tests/unit/**/*.spec.ts"
node ace test --files="tests/functional/**/*.spec.ts"

# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run typecheck

# Build for production
npm run build

# Start production server
npm start
```

### Database Commands

```bash
# Run migrations
node ace migration:run

# Rollback migrations
node ace migration:rollback

# Create a migration
node ace make:migration migration_name

# Create a seeder
node ace make:seeder seeder_name

# Run seeders
node ace db:seed
```

### Path Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
import PlayerService from '#services/player_service'
import Player from '#models/player'
import { middleware } from '#start/kernel'
```

Available aliases:
- `#controllers/*` → `./app/controllers/*.js`
- `#models/*` → `./app/models/*.js`
- `#services/*` → `./app/services/*.js`
- `#middleware/*` → `./app/middleware/*.js`
- `#validators/*` → `./app/validators/*.js`
- `#config/*` → `./config/*.js`
- `#database/*` → `./database/*.js`

## Architecture

### Service Layer Pattern

Controllers are kept thin by delegating business logic to service classes:

```typescript
// Controller
@inject()
export default class PlayersController {
  constructor(private playerService: PlayerService) {}
  
  async index() {
    const players = await this.playerService.all()
    return { data: players }
  }
}

// Service
export class PlayerService {
  async all() {
    return await db.from('players').select('*')
  }
}
```

### Middleware Stack

The application uses a three-tier middleware architecture:

1. **Server middleware** (runs on all requests)
   - Container bindings
   - Force JSON response
   - CORS

2. **Router middleware** (runs on matched routes)
   - Body parser
   - Auth initialization

3. **Named middleware** (explicitly applied)
   - Auth guard

### Authentication

Token-based authentication using `@adonisjs/auth`:
- Access tokens stored in the database
- Tokens managed via `DbAccessTokensProvider`
- Auth guard configured as 'api' with `tokensGuard`

## Testing

The project uses Japa for testing with two test suites:

- **Unit tests**: Located in `tests/unit/`, 2-second timeout
- **Functional tests**: Located in `tests/functional/`, 30-second timeout

```bash
# Run all tests
npm test

# Run only unit tests
node ace test --files="tests/unit/**/*.spec.ts"

# Run only functional tests
node ace test --files="tests/functional/**/*.spec.ts"
```

## Database Schema

### Players Table

| Column | Type | Description |
|--------|------|-------------|
| id | integer | Primary key |
| name | string | Player name |
| pga_id | integer | Unique PGA identifier |
| salary | integer | Player salary |
| created_at | timestamp | Created timestamp |
| updated_at | timestamp | Updated timestamp |

### Users Table

| Column | Type | Description |
|--------|------|-------------|
| id | integer | Primary key |
| full_name | string | User's full name |
| email | string | User email (unique) |
| password | string | Hashed password |
| created_at | timestamp | Created timestamp |
| updated_at | timestamp | Updated timestamp |

## Production

### Building

```bash
npm run build
```

### Running

```bash
npm start
```

### Environment Variables

Ensure all required environment variables are set in production:

- `NODE_ENV=production`
- `APP_KEY` (keep secret)
- Database credentials
- `HOST` and `PORT`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Run `npm run lint` and `npm run typecheck` before committing
- Write tests for new features
- Use the service layer pattern for business logic
- Keep controllers thin

## License

UNLICENSED - Private project

## Support

For issues and questions, please open an issue in the GitHub repository.
