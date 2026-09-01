# Character Semantic Schema V2

## Principle

The character schema is a semantic model, not a serialized copy of the editor UI.

The frontend may change layout, controls and visual metaphors without changing the meaning of saved characters.

The prompt compiler consumes this semantic model through a normalized view.

## Top-level shape

Conceptual structure:

```text
Character
  id
  schemaVersion
  revision
  identity
  species
  body
  appearance
  personality
  traits
  behavior
  voice
  motivations
  fears
  relationships
  knowledge
  memoryPolicy
  roleplay
  authoring
  extensions
```

This document describes intent, not the final database migration syntax.

## Versioning

Every saved character has:

- `schemaVersion`
- immutable character id
- monotonically increasing semantic revision number

Schema migrations must preserve authored meaning where possible.

Do not silently reinterpret old numeric values when axis definitions change. Add a migration or preserve the old semantic representation explicitly.

## Identity

Suggested fields:

```text
identity
  name
  aliases[]
  pronouns
  age
  role
  occupation
  shortDescription
```

Age may be a number, range, setting-specific representation or unknown state depending on future world rules. Avoid coupling the core schema to one genre.

## Species

Species should be composable.

```text
species
  label
  baseType
  components[]
  capabilities{}
  customDescription
```

`capabilities` can tell the editor which appearance modules are relevant without hard-coding every possible fictional species.

Example capability names:

- hair
- fur
- scales
- feathers
- externalEars
- tail
- horns
- wings

Capabilities describe available morphology, not mandatory appearance.

## Body

Keep broad physical structure separate from descriptive prose.

```text
body
  height
  frame
  build
  posture
  mobilityNotes
  extensions
```

Do not over-normalize measurements that are not useful to roleplay.

## Appearance

Appearance should support structured features plus authored descriptors.

```text
appearance
  palette{}
  hair{}
  eyes{}
  ears{}
  tail{}
  markings[]
  scars[]
  style{}
  distinguishingFeatures[]
  freeform
```

Inactive capability-dependent modules may remain stored while hidden in the editor.

## Personality axes

Each axis is a normalized continuous value plus optional contextual shifts.

```text
axis
  id
  value
  locked
  contexts{}
  note
```

Recommended internal range:

```text
-100 .. 100
```

Zero is neutral, not missing.

Example:

```text
assertiveness
  value: 35
  contexts:
    strangers: -20
    trusted: +15
    pressure: +30
```

The UI may display friendly labels instead of raw numbers.

## Traits

```text
trait
  id
  label
  intensity
  expression{}
  note
  source
  locked
```

`intensity` should be normalized.

`expression` can optionally modify how strongly the trait appears in named contexts.

`source` may distinguish built-in vocabulary from a custom authored trait without making one more authoritative than the other.

## Behavior contexts

A character may define context-specific behavioral adjustments.

```text
behavior
  contexts
    default{}
    strangers{}
    trusted{}
    pressure{}
    frightened{}
    angry{}
    hurt{}
    ashamed{}
    conflict{}
    custom{}
```

A context stores sparse overrides only.

Possible override targets:

- personality axes
- trait expression
- voice tendencies
- initiative
- emotional display
- conflict response

Do not clone the full character per context.

## Motivations

```text
motivations
  immediate[]
  persistent[]
  needs[]
  avoidances[]
  values[]
  breakingPoints[]
```

Each motivation item may contain:

```text
id
text
strength
visibility
priority
conditions
```

Do not force motivations into one numeric score.

## Fears and sensitivities

```text
fear
  id
  subject
  intensity
  expression
  triggers[]
  coping
  visibility
```

A fear should not automatically imply a fixed reaction. `expression` and `coping` describe how it tends to manifest.

## Voice

Separate voice mechanics from personality.

```text
voice
  verbosity
  sentenceLength
  vocabulary
  directness
  formality
  emotionalDisplay
  humor
  profanity
  metaphor
  hesitation
  interruption
  quirks[]
  examples[]
  freeform
```

Provider adapters may not support all controls directly. The prompt compiler translates semantic voice information into provider-appropriate context.

## Relationship tendencies

Base character relationship tendencies are not the same as a live relationship state.

```text
relationshipStyle
  trustSpeed
  forgiveness
  protectiveness
  jealousy
  dependence
  openness
  conflictRepair
  boundaries
  freeform
```

Actual relationship records belong to the relationship domain and reference character revisions rather than being embedded wholesale in the character document.

## Relationship lens preview

Factory/Lab may define temporary non-canonical preview lenses:

```text
lens
  trust
  affection
  respect
  fear
  resentment
  familiarity
  protectiveness
  rivalry
```

These are test inputs only unless explicitly saved into a canonical relationship elsewhere.

## Knowledge

Knowledge needs both content and provenance.

```text
knowledgeItem
  id
  text
  category
  source
  confidence
  visibility
  conditions
```

Possible `source` values:

- common
- witnessed
- told
- rumor
- inferred
- memory
- author

Possible `visibility` values:

- public
- sceneRelevant
- private
- secret
- authorOnly

The prompt compiler must not automatically reveal secret or author-only facts to other characters.

## Memory policy

The character model may express preferences for memory relevance without storing live memory records inside the character itself.

```text
memoryPolicy
  importanceBiases{}
  relationshipBias
  worldBias
  emotionalBias
  exclusions[]
```

Actual memories belong to the memory domain.

## Roleplay policy

```text
roleplay
  initiative
  sceneDrive
  willingnessToDisagree
  autonomy
  responseLengthPreference
  pacing
  narrationStyle
  boundaries{}
  instructions[]
```

These values describe engine behavior and should not be mistaken for in-world personality unless explicitly mapped.

## Authoring metadata

```text
authoring
  summary
  background
  secrets
  authorNotes
  customDescriptors[]
  semanticLocks[]
  provenance{}
```

`authorNotes` are engine-facing instructions and are not necessarily facts known by the character.

## Semantic locks

A semantic lock preserves an authored concept across randomization or assisted editing.

Example:

```text
semanticLock
  id
  statement: "quiet around strangers"
  targets:
    personality.expressive
    behavior.contexts.strangers
```

The implementation may initially support only field locks. Semantic locks are an advanced goal, but the schema should not make them impossible.

## Extensions

`extensions` preserve user-defined or future fields.

Rules:

- unknown fields survive load/save cycles
- extension namespaces should avoid collisions
- prompt compilation ignores unknown extensions unless a registered interpreter understands them
- extensions must never be used as a reason to put the entire schema in an unvalidated JSON blob

## Working copy

The editor should maintain a local working copy separate from the last canonical saved revision.

Conceptual state:

```text
canonicalRevision
workingRevision
localCheckpoint
saveState
```

Lab tests compile directly from the working copy.

## Semantic normalization

Before prompt compilation, build a normalized semantic view.

Conceptual flow:

```text
saved model
 + working edits
 + relevant context
 + active relationship lens
 + scene state
        |
        v
semantic resolver
        |
        v
normalized character view
        |
        v
prompt compiler
```

The normalized view should expose *effective behavior* while retaining provenance for diagnostics.

Example:

```text
assertiveness
  baseline: 35
  contextAdjustment: +30
  relationshipAdjustment: +10
  effective: 75
  reasons:
    - under pressure
    - strongly protective of current partner
```

Do not permanently write these effective values back into the character.

## Gravity and relevance

The semantic resolver may estimate relevance for context budgeting.

Possible relevance classes:

- core
- situational
- flavor
- dormant

Relevance is scene-dependent and may change per turn.

It is not persisted as an immutable truth about the character.

## Prompt safety boundary

Never concatenate every stored field into a giant character prompt.

Prompt compilation should:

1. resolve active semantic state
2. select relevant facts
3. remove redundant representations
4. preserve high-priority author intent
5. fit provider context constraints
6. expose diagnostics for what was included or omitted

## Persona schema

Persona should reuse compatible modules where useful but remain a distinct semantic type.

Conceptually:

```text
Persona
  identity
  species
  body
  appearance
  personalitySignals
  background
  knowledgeVisibility
  playerControl
  freeform
  extensions
  schemaVersion
```

Persona `personalitySignals` describe what the engine/characters may understand about the player persona. They must not become permission for the engine to override player agency.

## Testing requirements

Schema tests should cover:

- version migration
- unknown extension preservation
- conditional species capabilities
- zero-valued personality axes preserved as real values
- contextual overrides
- trait intensity
- hidden/secret knowledge not leaking into public normalized views
- working copy does not mutate canonical revision
- deterministic randomization when a seed is supplied
- semantic diff stability

## Clean-room requirement

This schema is authored for HW RP V2.

Do not import serialized models, property names, character datasets or content from the old Sandbox, Free Cities, Lilith's Throne or another roleplay engine as the basis of the implementation.
