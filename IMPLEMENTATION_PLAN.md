# Fantasy Golf: User-Team Ownership & Season Ranking System

## Problem Statement

The Fantasy Golf API needs to evolve from a basic tournament tracking system into a complete fantasy sports platform where users can own multiple teams, teams consist of exactly 4 players, players earn points based on tournament finishes (top 10 only), and teams are ranked throughout the season based on cumulative player points.

## Current State

### Database Schema

- **users**: Authentication entities (id, email, password, full_name) with token-based auth
- **owners**: Separate entity (id, name) with no relationship to users or teams
- **teams**: Basic entities (id, name) with no ownership or player count constraints
- **players**: Golf players (id, name, pga_id, salary)
- **player_teams**: Many-to-many pivot table between players and teams with no constraint on team size
- **tournaments**: Events (id, name, description, status, start_date, end_date)
- **results**: Tournament outcomes (id, tournament_id, player_id, points, position)

### Existing Endpoints

- `/api/v1/players` - Full CRUD for players
- `/api/v1/tournaments` - Full CRUD for tournaments
- `/api/v1/teams` - Full CRUD for teams (no ownership or player management)
- `/api/v1/tournaments/:tournamentId/results` - Tournament results management

### Key Issues

1. **Duplicate user concepts**: Both `users` and `owners` tables exist but serve no distinct purpose
2. **No ownership model**: Teams aren't linked to any user/owner
3. **No team composition rules**: No enforcement of the 4-player team requirement
4. **No ranking system**: No mechanism to calculate or retrieve season-long team standings
5. **Incomplete documentation**: README only documents players endpoint

## Proposed Changes

### 1. Consolidate User/Owner Models

- Remove the `owners` table and model (redundant with `users`)
- Users will directly own teams

### 2. Establish User-Team Ownership

- Add `user_id` foreign key to `teams` table
- Add `hasMany` relationship from User to Team
- Add `belongsTo` relationship from Team to User
- Update team creation to require authentication and automatically assign ownership
- Update team queries to filter by authenticated user

### 3. Enforce 4-Player Team Composition

- Create team-player association endpoint: `POST /api/v1/teams/:id/players`
- Validation enforces maximum of 4 players per team at association time:
  - Before adding a player, check current player count
  - Return 400 error if team already has 4 players
  - Teams can exist with 0-4 players (flexible for gradual team building)
- Add endpoint to remove players from teams: `DELETE /api/v1/teams/:id/players/:playerId`
- Add endpoint to list team players: `GET /api/v1/teams/:id/players`
- Update Team model to easily load players via existing many-to-many relationship

### 4. Implement Season Ranking System

- Create `TeamRankingService` to calculate team rankings based on:
  - Sum of all points earned by team's 4 players across all completed tournaments
  - Query results where position indicates top 10 finish
- Add endpoint: `GET /api/v1/rankings` to retrieve ranked teams for the season
- Response includes: team_id, team_name, owner_name, total_points, player_breakdown
- Add optional tournament_id filter to get rankings for specific tournament

### 5. Update API Documentation

- Document all new endpoints in README.md
- Add team ownership and player limits to features list
- Document the ranking system and scoring rules
- Include examples for team-player management and rankings endpoints
- Update database schema documentation to reflect new relationships

## Implementation Order

1. Remove owners table/model and update any references
2. Add user_id to teams (migration + model updates)
3. Implement team-player management endpoints with 4-player validation
4. Create ranking service and endpoint
5. Update comprehensive API documentation
