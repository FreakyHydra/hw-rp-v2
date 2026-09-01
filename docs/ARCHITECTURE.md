# HW RP V2 Architecture

## Goals

The system should remain simple to deploy while supporting a highly reactive interface and increasingly complex RP behavior.

Initial shape:

```text
SvelteKit client
   |
   +-- HTTP commands/resources
   +-- generation stream
   +-- realtime state events
   |
Go application
   |
   +-- PostgreSQL
   +-- AI provider adapters
   +-- background jobs
```

Start as one Go application with strong internal modules.

## Why a modular monolith

RP V2 needs many cooperating domains, but they share one product lifecycle and database.

Keeping them together initially gives us:

- simpler deployment
- simpler local development
- easier transactions
- fewer network failure modes
- easier tracing of one player action across the engine

Split a module into a service only after measurement proves it is useful.

## Frontend

### Framework

SvelteKit + TypeScript.

The browser application is a persistent shell rather than a collection of independently reloaded pages.

Core frontend responsibilities:

- immediate local interaction state
- optimistic UI where appropriate
- active conversation state
- draft preservation
- viewport / device adaptation
- realtime event reconciliation
- generation stream rendering
- reconnect behavior
- local caching of safe UI/session metadata

### State model

Avoid one giant application store.

Prefer domain-oriented stores / state modules such as:

- shell
- session
- conversation
- composer
- generation
- timeline
- crew
- relationship
- connectivity

A server event changes canonical client state once. Components derive their visuals from that state.

## Backend

### Go application layout

Suggested starting structure:

```text
cmd/
  server/
internal/
  auth/
  session/
  character/
  persona/
  conversation/
  timeline/
  generation/
  relationship/
  memory/
  lore/
  livecrew/
  provider/
  jobs/
  diagnostics/
  platform/
web/
  ... SvelteKit application ...
migrations/
```

Names can change as implementation reveals better boundaries.

### Domain rules

HTTP and WebSocket handlers translate transport data into domain commands.

They do not own RP rules.

Provider adapters do not own conversation rules.

Database repositories do not decide RP behavior.

## Data model principles

### Conversations are not mutable blobs

A conversation should be modeled using durable records for turns, branches and relevant state transitions.

Minimal conceptual structure:

```text
conversation
  id
  owner
  root_timeline

timeline
  id
  conversation_id
  parent_timeline_id
  fork_turn_id
  state

turn
  id
  timeline_id
  parent_turn_id
  actor_type
  actor_id
  content
  created_at
  generation_metadata
```

Exact schema should be designed through migrations, but branching must be natural rather than simulated through destructive copy/paste.

### Reroll behavior

Rerolling the newest AI response may create a sibling candidate or a new branch depending on the finalized UX.

Rerolling an earlier player or character turn must never silently destroy the future path.

The previous future becomes dormant / alternate history until deliberately discarded.

## Real-time transport

Use the simplest transport that matches the event.

### HTTP

Good for:

- loading resources
- explicit commands
- CRUD-style settings
- branch operations
- character/persona configuration

### Streaming generation

Use server-sent streaming or an equivalent simple streaming response for one-direction token / chunk delivery when that is sufficient.

Requirements:

- cancellation
- generation identifier
- reconnect/failure state
- final completion event
- partial text kept separate from committed turn until appropriate

### WebSocket

Use for persistent bidirectional realtime state that benefits from one connection, for example:

- Live Crew state
- presence-like session state
- server-side relationship changes
- branch/timeline notifications
- background memory/job completion
- connection health

Do not force every normal API call through WebSocket.

## Optimistic UI contract

The UI may show an expected local result before server confirmation when failure can be reconciled safely.

Each optimistic operation should have:

- client operation ID
- pending state when needed
- server acknowledgement
- explicit error reconciliation

Never optimistically display a security-sensitive authorization change.

## Generation pipeline

Conceptual flow:

```text
player command
   |
validate session
   |
resolve active timeline
   |
load bounded RP state
   |
compile prompt/context
   |
select provider
   |
start cancellable provider request
   |
stream output to client
   |
commit accepted completion
   |
run post-generation domain analysis/jobs
```

Post-generation work should not unnecessarily delay the visible completion.

## Provider abstraction

Providers must sit behind a stable internal interface.

The conversation engine should not contain NovelAI-, Ollama- or vendor-specific request formatting.

Provider capability metadata may describe things such as:

- streaming support
- context limits
- sampling controls
- cancellation behavior
- supported output modes

## Relationship Engine V2

Relationship calculation should be its own domain, not a display score hidden in UI code.

It should be able to consume relevant events from both sides of the interaction and produce structured relationship state.

Do not reduce all relationship meaning to one scalar score.

## Memory and lore

Memory retrieval should be bounded and inspectable.

The engine should be able to explain internally why an item was selected for context through diagnostics, even if that detail is not normally shown to the user.

Avoid loading every historical memory on every turn.

## Live Crew

Live Crew needs explicit activation state and routing rules.

Character activation should be an engine decision/event, not a frontend-only visual trick.

The frontend receives that state and reacts immediately.

## Persistence

PostgreSQL is the system of record for durable server state.

Use relational tables for identity, ownership, turns, timelines and other strongly structured state.

Use JSONB only where the data is genuinely flexible or provider-specific.

Do not make the entire domain one JSONB document.

## Jobs

Begin with in-process background workers backed by durable database state where durability matters.

Examples:

- memory extraction
- summaries
- deferred analysis
- cleanup

Introduce an external queue only after load or reliability requirements justify it.

## Authentication and Landing

RP V2 should integrate with the Howling Whispers ecosystem access model instead of inventing a disconnected identity system.

Authentication design must still be enforced by RP V2 itself. A link being visible on Landing is not authorization.

## Observability

From the first functional slice include:

- structured logs
- request / operation IDs
- generation IDs
- provider timing
- database migration version
- health endpoint

Diagnostics must not log provider secrets or sensitive prompt content by default.

## Deployment goal

Production should be intentionally boring.

Target shape:

- built Svelte frontend assets
- one Go server binary
- PostgreSQL
- reverse proxy / TLS supplied by existing server infrastructure

Avoid runtime Node dependency in the production backend. Node tooling may still be used to build the Svelte frontend in CI.
