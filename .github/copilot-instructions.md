<!-- copilot-instructions: concise, actionable guidance for AI coding agents in this repo -->
# Copilot instructions — DatingApp (concise)

Purpose: help an AI coding agent become productive quickly in this repo (ASP.NET Core backend + Angular client).

- **Project layout**: backend in `API/` (ASP.NET Core minimal Program), frontend in `DatingAppClient/` (Angular). Key folders:
  - `API/Controllers/` — HTTP endpoints (e.g., `AccountController.cs`, `MembersController.cs`). Controllers inherit `BaseApiController` (`api/[controller]` route).
  - `API/Data/` — EF Core `AppDbContext.cs`, migrations in `API/Data/Migrations/` and `DesignTimeDbContextFactory.cs` (used by EF tools).
  - `API/Entities/` — domain models (e.g., `AppUser.cs`).
  - `API/DTOs/` — request DTOs used for inbound data (`RegisterDto`, `LoginDto`).
  - `DatingAppClient/` — Angular app; dev server runs on `http://localhost:4200` by default.

- **Big picture / runtime wiring**:
  - `API/Program.cs` registers services: controllers, EF Core with SQLite (`DefaultConnection`), and CORS.
  - CORS explicitly allows `http://localhost:4200` and `https://localhost:4200` — the Angular dev server.
  - Controllers use constructor-injected `AppDbContext` to query/persist users. Authentication is implemented manually in `AccountController` using `HMACSHA512` for password hashing.

- **Patterns & conventions unique to this repo**:
  - Minimal/modern ASP.NET style: top-level `Program.cs` (no Startup class).
  - Controllers return entity classes directly in several places (e.g., `AccountController.Register` and `Login` return `AppUser`). Be aware these entities contain `PasswordHash` and `PasswordSalt`.
  - DTOs exist for inbound validation (`RegisterDto`, `LoginDto`), but responses currently use entities.
  - EF migrations are present; the codebase uses code-first with a `DesignTimeDbContextFactory` (see `API/Data/DesignTimeDbContextFactory.cs`).

- **Build / run / dev commands** (what to run locally)
  - Backend (from repo root): `dotnet run --project API/API.csproj` or `cd API; dotnet run`.
  - To execute EF migrations: install EF tool if needed `dotnet tool install --global dotnet-ef`, then from `API/`: `dotnet ef database update` or `dotnet ef migrations add <Name>`.
  - Frontend (from `DatingAppClient/`): `ng serve` (dev) — serves at `http://localhost:4200`.

- **Security / data notes agent should respect**
  - `AppUser` contains `PasswordHash` and `PasswordSalt`. Avoid returning these fields in responses when adding or modifying endpoints. Prefer returning a response DTO.
  - Account endpoints hash and compare passwords using `HMACSHA512` — follow this existing pattern if adding similar code.

- **Common change tasks and where to make them**
  - Add new tables/entities: `API/Entities/` → add DbSet in `API/Data/AppDbContext.cs` → `dotnet ef migrations add` → `dotnet ef database update`.
  - Add API endpoints: add controller in `API/Controllers/` inheriting `BaseApiController` and use constructor injection for `AppDbContext`.
  - Client integration: frontend calls backend at `/api/<controller>`; CORS already allows Angular dev server.

- **Files worth reading first (fast path to context)**
  - `API/Program.cs` — service registration, CORS, DB provider.
  - `API/Controllers/AccountController.cs` — registration/login flow, hashing pattern, examples of DbContext usage.
  - `API/Entities/AppUser.cs` and `API/DTOs/*` — data shapes.
  - `API/Data/DesignTimeDbContextFactory.cs` — EF tooling integration.
  - `DatingAppClient/README.md` — Angular dev server and build commands.

- **Behavioral guidance for agents**
  - When changing API responses, prefer creating response DTOs and mapping entities to DTOs (do not expose `PasswordHash`/`PasswordSalt`).
  - Preserve existing CORS and DB registration unless intentionally changing environment assumptions.
  - Use existing validation attributes on DTOs (e.g., `[Required]`, `[EmailAddress]`) when adding new DTOs.

If anything here is unclear or you want me to include concrete examples (e.g., a safe response DTO for `AppUser` and a sample controller change), tell me which endpoint or file and I will add the snippet.
