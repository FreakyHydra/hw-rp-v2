# Character Continuity and Evolution V2

## Why this exists

A good roleplay character should be capable of growth without the engine silently rewriting the author's character sheet.

V2 therefore separates:

- authored character identity
- temporary scene state
- relationship state
- memories
- observed behavioral patterns
- proposed long-term character evolution

The character sheet remains canonical until the author deliberately changes it.

## Runtime state is not character definition

Examples:

- angry right now is scene state
- trusts one specific person is relationship state
- remembers a betrayal is memory
- has become generally less trusting over months may be a character evolution proposal

Do not flatten these into one mutable personality object.

## Drift Monitor

The engine may compare repeated observed roleplay behavior with the authored semantic model.

The purpose is diagnostics, not automatic correction.

Example:

```text
AUTHORED
Conflict response: Avoidant
Assertiveness: 32

OBSERVED
Last 14 relevant scenes:
  initiated confrontation 9 times
  withdrew 2 times
  negotiated 3 times

POSSIBLE DRIFT
This character is behaving more confrontationally than currently authored.
```

The user can:

- ignore it
- mark it intentional/situational
- adjust the character
- create a contextual behavior rule
- ask the Lab to compare before/after

## Evidence threshold

Never suggest character evolution from one surprising response.

Drift detection should require repeated relevant evidence and account for context.

A character consistently aggressive only while protecting a specific person should not be summarized as globally aggressive.

## Growth Proposals

A Growth Proposal is a suggested semantic change backed by explainable evidence.

Example:

```text
PROPOSAL
Increase willingness to ask for help slightly.

WHY
Across several recent scenes, the character has begun accepting support from trusted people after previously refusing it.

SCOPE
Trusted relationships only.
```

Nothing changes until accepted.

## Proposed change types

Useful proposal categories:

- personality baseline nudge
- context-specific personality change
- trait intensity change
- new trait suggestion
- motivation resolved
- new motivation formed
- fear reduced or intensified
- coping strategy changed
- relationship-style change
- voice habit acquired/lost
- new value/boundary
- worldview/knowledge change

## Life events

The user may mark timeline moments as **Character Events**.

Examples:

- major loss
- reconciliation
- betrayal
- victory
- failure
- discovery
- promise
- change of role/status

A Character Event does not prescribe how the character changes.

It becomes high-value evidence for memories, continuity and optional future growth proposals.

## Anchors

Authors can define character facts that should be resistant to drift.

Call these **Anchors**.

Examples:

- never abandons family
- hates being pitied
- refuses to lie to children
- always hides fear with humor

Anchors are not absolute code-level laws unless separately configured as hard roleplay instructions.

They are strong semantic gravity.

The Drift Monitor should distinguish:

- behavior that challenges an anchor in an interesting scene
- repeated behavior suggesting the anchor itself may have changed

## Arcs

Optional **Character Arcs** let the author describe a direction without scripting outcomes.

Example:

```text
ARC: Learning to trust
Start state:
  expects betrayal

Possible movement:
  accepts small acts of help
  shares low-risk personal information
  eventually delegates responsibility

Do not force:
  instant openness
  guaranteed success
```

Arcs guide interpretation and diagnostics but do not railroad the RP.

## Arc states

Possible lightweight states:

- dormant
- active
- advancing
- stalled
- regressing
- resolved
- abandoned

State can be manually set or suggested from evidence.

## Continuity Ledger

The Character Lab may expose a chronological **Continuity Ledger** separate from the chat timeline.

It contains compact meaningful changes such as:

```text
Revision 4
  Stronger distrust of authority
  Added fear response: freezes before becoming angry

Event
  Promised not to leave Mara behind

Relationship change
  Trust with Mara crossed into "trusted" lens

Growth proposal
  Becoming more willing to apologize
```

The ledger is a diagnostic/history view, not prose inserted wholesale into prompts.

## Canonical revisions

When the author accepts a Growth Proposal, create a new semantic character revision.

Do not mutate the old revision in place.

Existing conversations may retain their configured revision policy:

- follow latest
- apply next turn
- apply next scene
- pinned revision

## Behavioral regression

Growth does not always move in a positive direction.

The system should support believable regression:

- old fears returning
- trust collapsing after betrayal
- coping mechanisms failing under pressure
- abandoned goals resurfacing

Do not build the evolution system around a "character improvement" score.

## Relationship-local growth

Some changes belong only to one relationship.

Example:

> Generally guarded, but now emotionally open with one trusted person.

That belongs primarily in the relationship lens, not the global character baseline.

The evolution analyzer should prefer the narrowest correct scope.

## Memory interaction

Memories provide evidence for growth but remain their own domain.

The evolution system can ask:

- which memories repeatedly influence decisions?
- which unresolved events still trigger behavior?
- which old fears no longer appear despite relevant situations?

It should not rewrite memory records merely to make the character model look consistent.

## Author control

The author must be able to disable:

- Drift Monitor
- Growth Proposals
- Arc suggestions
- automatic evidence collection beyond normal RP state

Disabling these must not break ordinary roleplay.

## Privacy and prompt boundary

Continuity diagnostics are internal authoring data.

Do not expose statements such as "the system detected behavioral drift" inside RP prompts.

The prompt compiler consumes the accepted semantic model and relevant runtime state, not the diagnostic commentary.

## UI concept

The Continuity view should resemble a quiet maintenance log rather than another dashboard.

Use:

- revision marks
- event stamps
- subtle copper timeline rules
- change summaries
- evidence drawers
- Accept / Test / Ignore controls

On phone, proposals become stacked cards with expandable evidence.

## Core rule

**Characters may evolve through roleplay, but the engine never gets to secretly decide who they have become.**
