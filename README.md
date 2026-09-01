# Howling Whispers RP V2

A ground-up rebuild of the Howling Whispers roleplay Sandbox.

## Core direction

HW RP V2 is a new reactive roleplay engine designed as a first-class child application of the Howling Whispers Landing ecosystem.

The project is being built around four non-negotiable goals:

1. **Instantaneous reactive UI**
   - local-first interaction feedback
   - optimistic updates where safe
   - no page reloads for normal RP workflow
   - generation and state changes stream into the interface live

2. **Cross-device from day one**
   - desktop control-room layout
   - tablet adaptive layout
   - phone-first compact interaction model
   - no desktop-only essential controls
   - touch targets, safe areas and on-screen keyboards are first-class concerns

3. **Unified Howling Whispers visual identity**
   - same canonical dark celestial copper system as HW Landing and Howling Whispers Analog
   - analog instrument / broadcast-console influence
   - physical-feeling controls, meters, lamps and panels where useful
   - readable RP text remains the priority
   - fresh V2 application code while sharing the current ecosystem design language

4. **Clean new engine**
   - Go backend
   - SvelteKit + TypeScript frontend
   - PostgreSQL persistence
   - real-time event transport
   - modular monolith before any microservice split

## Clean-room rule

HW RP V2 does **not** inherit the old Sandbox asset library or character library.

Do not copy or automatically migrate:

- old Sandbox images, textures, icons or UI artwork
- old character portraits or character artwork
- old character JSON/cards as seed content
- old Sandbox CSS/component assets
- legacy visual hacks that only existed to support the old layout

Existing systems may be studied conceptually when a feature needs to be recreated, but V2 implementations must be deliberate and new.

The current HW Landing and Howling Whispers Analog design system is the canonical shared ecosystem theme and may be reused or consolidated where appropriate.

## Planned engine areas

- conversations
- characters
- personas
- timelines and branching
- rerolls, including player-turn branching
- Relationship Engine V2
- memory and lore
- Live Crew
- prompt compilation
- provider routing
- streaming generation
- background jobs
- authentication / access integration
- admin and diagnostics

## Repository layout

```text
cmd/          Go server entry points, added from Issue #2 onward
internal/     Go application/domain modules, added from Issue #2 onward
migrations/   PostgreSQL migrations, added from Issue #2 onward
web/          SvelteKit + TypeScript frontend
docs/         architecture and product design specifications
```

The frontend is intentionally isolated under `web/` so the repository stays clear when the Go backend and database migrations arrive.

## Initial architecture

```text
Browser / PWA
     |
     | HTTP + streaming + realtime events
     v
Go modular monolith
     |
     +-- PostgreSQL
     +-- AI providers
     +-- background workers
```

The UI is a persistent application shell. Opening Timeline, Crew, Character, Memory or Settings must not tear down an active generation or RP session.

## Status

**Pre-alpha / Issue #1 vertical slice**

The repository includes a runnable SvelteKit + TypeScript Character and Persona Factory workbench with:

- the canonical Landing and Analog visual system
- Quick and Advanced authoring modes
- a semantic local working model
- reactive personality axes and trait intensity
- deterministic seeded randomization with field locks
- live interpretation and completeness diagnostics
- local browser checkpoints
- desktop, tablet and phone recomposition down to 320px

The Go and PostgreSQL persistence layer remains intentionally deferred to Issue #2.

## Frontend development

```bash
cd web
npm install
npm run dev
```

Validation commands are also run from `web/`:

```bash
npm run check
npm test
npm run build
```
