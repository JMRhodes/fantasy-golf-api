# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Fantasy Golf API built with AdonisJS v6, using PostgreSQL for data persistence. The application is an API-only server that forces JSON responses for all endpoints.

## Development Commands

### Starting the Application
```bash
# Development with hot module reloading
npm run dev

# Production
npm start
```

### Database Management
```bash
# Run pending migrations
node ace migration:run

# Rollback migrations
node ace migration:rollback

# Create a new migration
node ace make:migration <migration_name>

# Create a new seeder
node ace make:seeder <seeder_name>

# Run seeders
node ace db:seed
```

### Testing
```bash
# Run all tests
npm test

# Run specific test suite
node ace test --files="tests/unit/**/*.spec.ts"
node ace test --files="tests/functional/**/*.spec.ts"

# Run a single test file
node ace test --files="tests/functional/players.spec.ts"
```

### Code Quality
```bash
# Lint code
npm run lint

# Format code
npm run format

# Type checking
npm run typecheck
```

### Building
```bash
# Build for production
npm run build
```

### Local Development Environment
This project uses Lando for local development with PostgreSQL 17:
```bash
# Start Lando environment
lando start

# Stop Lando environment
lando stop

# Access database
lando psql
```

## Architecture

### Framework Structure
- **AdonisJS v6**: Full-stack TypeScript framework following MVC pattern
- **Lucid ORM**: Database queries and migrations
- **Authentication**: Token-based auth using `@adonisjs/auth` with access tokens stored in database
- **Validation**: VineJS (`@vinejs/vine`) for request validation

### Directory Structure

#### `/app`
- `controllers/`: HTTP request handlers (e.g., `PlayersController`)
- `models/`: Lucid ORM models (e.g., `Player`, `User`)
- `services/`: Business logic layer (e.g., `PlayerService`)
- `middleware/`: Custom middleware including `ForceJsonResponseMiddleware` that ensures all responses are JSON
- `exceptions/`: Custom exception handlers

#### `/start`
- `routes.ts`: Application route definitions
- `kernel.ts`: HTTP middleware stack configuration
- `env.ts`: Environment variable schema and validation

#### `/config`
- Configuration files for app, database, auth, cors, bodyparser, hash, logger

#### `/database`
- `migrations/`: Database schema migrations
- `seeders/`: Database seed files

#### `/bin`
- `server.ts`: Production server entry point
- `console.ts`: REPL entry point
- `test.ts`: Test runner entry point

### Path Aliases
The project uses import aliases defined in `package.json`:
- `#controllers/*` → `./app/controllers/*.js`
- `#models/*` → `./app/models/*.js`
- `#services/*` → `./app/services/*.js`
- `#middleware/*` → `./app/middleware/*.js`
- `#validators/*` → `./app/validators/*.js`
- `#exceptions/*` → `./app/exceptions/*.js`
- `#config/*` → `./config/*.js`
- `#database/*` → `./database/*.js`
- `#start/*` → `./start/*.js`

### Middleware Stack

**Server-level middleware** (runs on all requests):
1. `container_bindings_middleware` - Dependency injection container bindings
2. `force_json_response_middleware` - Forces all responses to be JSON
3. `@adonisjs/cors/cors_middleware` - CORS handling

**Router-level middleware** (runs on matched routes):
1. `@adonisjs/core/bodyparser_middleware` - Request body parsing
2. `@adonisjs/auth/initialize_auth_middleware` - Auth initialization

**Named middleware** (explicitly applied to routes):
- `auth` - Requires authentication

### Authentication
- Uses token-based authentication via `@adonisjs/auth`
- Access tokens stored in database (`access_tokens` table)
- User model includes `DbAccessTokensProvider` for token management
- Auth guard configured as 'api' with `tokensGuard`

### Database
- PostgreSQL as primary database
- Connection configured via environment variables: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`
- Migrations use natural sorting and are located in `database/migrations`
- Current models: `User`, `Player`

### Service Layer Pattern
Controllers use dependency injection to access service classes:
- Example: `PlayersController` injects `PlayerService`
- Services contain business logic and database queries
- Controllers remain thin, handling HTTP concerns only

### Testing
- Test framework: Japa
- Two test suites configured:
  - `unit`: timeout 2s, files in `tests/unit/**/*.spec.ts`
  - `functional`: timeout 30s, files in `tests/functional/**/*.spec.ts`

### Hot Module Reloading
- Configured via `hot-hook` package
- Watches: `./app/controllers/**/*.ts` and `./app/middleware/*.ts`
- Use `npm run dev` to enable HMR

## Key Patterns

### Resource Controllers
Routes use Laravel-style resource controllers with `.apiOnly()` (excludes `create` and `edit` endpoints):
- `GET /players` → `index()`
- `POST /players` → `store()`
- `GET /players/:id` → `show()`
- `PUT/PATCH /players/:id` → `update()`
- `DELETE /players/:id` → `destroy()`

### Dependency Injection
Use the `@inject()` decorator on controllers to enable constructor injection:
```typescript
@inject()
export default class PlayersController {
  constructor(private playerService: PlayerService) {}
}
```

### Model Conventions
- Use Lucid ORM decorators: `@column()`, `@column.dateTime()`
- Primary key: `@column({ isPrimary: true })`
- Timestamps: `createdAt` and `updatedAt` with auto-management
- Snake case in database, camel case in TypeScript
