# AGENTS.md

Instructions for any coding agent working in `hw-rp-v2`.

## Product identity

This repository is a ground-up implementation of Howling Whispers RP V2.

It is not a refactor branch of the old Sandbox.

## Hard rules

### 1. No legacy Sandbox or character assets

Do not copy, import, vendor, scrape, migrate or reuse assets from the previous Sandbox or character library unless the repository owner later gives an explicit exception for a specific item.

This includes:

- portraits
- character art
- UI images
- icons
- textures
- backgrounds
- audio assets
- character cards / character JSON used as seed content
- old RP CSS bundles
- old component markup copied wholesale

If a placeholder is required, create a neutral V2 placeholder using CSS, SVG made specifically for V2, or simple generated development data.

Never silently pull legacy Sandbox or character assets from another Howling Whispers repository.

### 2. Landing and Analog are the canonical shared theme

RP V2 must use the **same theme and style** as the current Howling Whispers Landing and Howling Whispers Analog pages.

Do not interpret this as merely "inspired by" those applications.

Before implementing or substantially redesigning UI, inspect the current `dev` branches of:

- `FreakyHydra/HW-Landing`
  - `src/styles/base.css`
  - `src/styles/world.css`
  - related current UI source
- `FreakyHydra/Howling-Whispers-Analog`
  - `src/style.css`
  - `src/daw/style.css`
  - `src/daw/controls.css`
  - related current UI source

Landing, Analog, RP V2, Character Factory, Persona Factory and future V2 pages are one visual ecosystem.

It is acceptable and encouraged to reuse/port shared Howling Whispers design tokens and styling patterns from Landing and Analog where appropriate. The clean-room ban is about old Sandbox and old character assets, not the current ecosystem design system.

Canonical characteristics include:

- near-black warm background
- copper/bronze highlight family
- restrained ivory text
- Georgia/serif display identity paired with readable sans-serif UI text
- tracked uppercase micro-labels
- subtle celestial/star-field atmosphere
- warm dark instrument panels
- fine copper borders and dividers
- inset/highlight material depth
- Analog-style physical sliders and control treatments
- status lamps and meters when they communicate real state
- tactile immediate motion

Do not invent a separate RP V2 palette or generic component-library look.

Do not make the application look like a generic SaaS dashboard.

Do not turn it into novelty fake-radio decoration. Use the established Analog physical-control language where it suits the function and keep RP text readable.

If a UI change makes V2 look unrelated to Landing or Analog, treat that as a regression unless the whole ecosystem theme is intentionally being changed.

### 3. Mobile and tablet are first-class

Every essential workflow must work at phone widths.

Never ship a feature whose only usable interaction depends on:

- hover
- a mouse wheel
- right click
- desktop-only sidebars
- fixed large widths
- horizontal page scrolling

Minimum interactive target should normally be 44 CSS pixels, preferably 48 for primary touch actions.

Respect safe-area insets and the virtual keyboard.

### 4. UI latency is not server latency

Visible local interactions should respond inside one rendered frame whenever practical.

Use local reactive state first, then synchronize with the backend.

Examples:

- opening a panel is local
- depressing a switch is local
- selecting a tab is local
- showing a newly submitted player turn may be optimistic when safe
- server errors reconcile or roll back explicitly

Do not add blocking spinners to actions that can be handled optimistically.

### 5. Persistent application shell

Normal navigation inside RP V2 must not reload the document.

Opening Character, Persona, Timeline, Memory, Crew, Relationship or Settings must preserve:

- the current conversation
- draft text
- scroll state where appropriate
- active generation
- real-time connection
- relevant local UI state

### 6. Architecture

Initial stack:

- Go backend
- SvelteKit + TypeScript frontend
- PostgreSQL
- HTTP APIs for commands and resource access
- server-sent streaming and/or WebSocket transport for live generation and state events

Start as a modular monolith.

Do not introduce microservices, Redis, Kafka, Kubernetes or another distributed subsystem without a measured requirement.

### 7. Backend boundaries

Keep business logic out of HTTP handlers.

Expected domains include:

- auth
- sessions
- characters
- personas
- conversations
- messages
- timelines
- generation
- relationships
- memory
- lore
- livecrew
- providers
- jobs
- diagnostics

Dependencies should point inward toward domain logic rather than making domain code depend on transport details.

### 8. Timeline model is foundational

Do not model a conversation as one mutable text blob.

Turns and state transitions must be representable as durable events / records so branching and rerolling earlier turns do not require destructive rewriting of history.

Dormant branches must remain recoverable until the user deliberately discards them.

### 9. Accessibility and motion

Support:

- keyboard navigation
- visible focus states
- semantic controls
- readable contrast
- `prefers-reduced-motion`

Analog motion should communicate state, not obstruct interaction.

### 10. Performance discipline

Avoid premature optimization, but measure obvious hot paths.

Frontend goals:

- avoid unnecessary global rerenders
- virtualize long histories when needed
- do not animate layout-heavy properties unnecessarily
- keep interaction feedback local

Backend goals:

- bound concurrent external provider calls
- support request cancellation
- propagate generation cancellation to providers where possible
- use database indexes intentionally
- avoid loading an entire long conversation when a bounded context window is sufficient

## Development approach

Build vertical slices that remain runnable.

Preferred early sequence:

1. application shell + canonical shared theme
2. responsive layout system
3. local reactive state model
4. backend health/config/bootstrap
5. database foundation
6. realtime connection
7. minimal conversation slice
8. streaming generation slice
9. timeline branching
10. advanced RP systems

## Definition of done for a feature

A feature is not done merely because it works on desktop.

Before marking it complete, verify:

- visual consistency with current Landing and Analog
- desktop
- tablet
- phone
- keyboard
- touch
- reduced motion where relevant
- loading/error/reconnect state
- no accidental full-page reload
- no legacy Sandbox/character asset dependency
