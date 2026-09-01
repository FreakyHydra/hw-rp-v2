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
   - same dark celestial copper family as HW Landing
   - analog instrument / broadcast-console influence
   - physical-feeling controls, meters, lamps and panels where useful
   - readable RP text remains the priority
   - fresh V2 implementation rather than copied legacy UI

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

The Landing visual language is a design reference and ecosystem contract, not an instruction to duplicate its files.

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

**Pre-alpha / architecture phase**

The first milestone is the responsive reactive application shell and design system. RP engine features are added only after that foundation is stable.
