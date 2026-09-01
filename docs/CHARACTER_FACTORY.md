# Character and Persona Factory V2

## Goal

Build a dynamic, reactive editor that combines RPG-style structure with unrestricted free-form authoring.

The Factory should feel like tuning a living character, not filling in a database form.

## Core model

Use the same editor framework for Characters and Personas, but enable different modules for each.

### Character

A Character represents an autonomous roleplay actor.

Primary modules:

- identity
- species / body model
- appearance
- personality
- traits
- emotional behavior
- voice and dialogue style
- motivations and goals
- fears and stress responses
- relationships
- memories and knowledge
- world / lore context
- roleplay behavior
- free-form background
- author notes

### Persona

A Persona represents the player inside the fiction.

Persona editing is deliberately lighter and should prioritize:

- identity
- species / body model
- appearance
- personality signals
- background
- how other characters should understand the persona
- roleplay permissions and boundaries
- free-form notes

Do not treat a Persona as an NPC Character with a renamed heading.

## Hybrid structured + free-form editing

Every major section may expose structured values and optional prose together.

Example:

- Assertiveness slider: 78/100
- Caution slider: 34/100
- Trait: Protective, strong
- Trait: Sarcastic, moderate
- Free-form behavior note: "Acts confident when frightened because they hate being seen panicking."

Structured values provide consistency and machine-readable state.

Free-form text provides nuance that cannot be expressed by a slider.

The prompt compiler combines both.

## Reactive editing

The editor is local-first.

Moving a slider, toggling a trait, changing a selector, or editing text updates all dependent preview state immediately.

Do not wait for a network round trip to:

- move controls
- update derived labels
- update completion indicators
- refresh the AI interpretation preview
- reveal or hide conditional fields

Server persistence happens asynchronously.

## Personality mixer

Personality values should normally be modeled as continuous axes rather than mutually exclusive checkboxes.

Initial examples:

- reserved <-> expressive
- cautious <-> reckless
- gentle <-> harsh
- serious <-> playful
- passive <-> assertive
- trusting <-> suspicious
- patient <-> impatient
- orderly <-> chaotic
- emotionally guarded <-> emotionally open
- dependent <-> independent

Do not assume every axis belongs in the default Quick editor. The advanced set may be larger.

Each axis should support:

- slider input
- numeric internal representation
- natural-language derived labels
- reset to neutral
- optional lock during randomization

## Traits

Traits are not only boolean tags.

A trait can carry:

- id
- label
- strength / intensity
- optional context note
- optional positive/negative/neutral presentation metadata

Examples:

- Loyal: strong
- Sarcastic: moderate
- Protective: very strong

Trait intensity should be useful to the prompt compiler and behavior engine.

## Data-driven body and appearance model

Do not collapse appearance into one prose field.

The schema should support independent structured properties where useful, such as:

- species
- height
- build
- frame
- hair / fur
- eyes
- ears
- tail
- skin
- markings
- scars
- clothing style
- distinguishing features

Species and body modules may conditionally expose relevant fields.

Example: selecting a species with a tail may reveal tail controls. Selecting a species without one should hide irrelevant controls without deleting preserved data unless the user explicitly removes it.

The free-form appearance field remains available for details that do not fit the structured model.

## Derived AI interpretation

The Factory should continuously produce an "AI Interpretation" view showing the compact model that the RP engine will understand.

This is not necessarily the final raw prompt. It is a readable diagnostic representation.

Example:

> Lean, athletic wolf hybrid with grey fur, silver-grey hair, golden eyes, prominent wolf ears and a long fluffy tail. Reserved around strangers, strongly protective, moderately sarcastic, and prone to impulsive action when threatened.

The interpretation updates as the editor changes.

## Completeness diagnostics

Show useful coverage indicators for major areas, for example:

- Identity
- Personality
- Voice
- Background
- Motivation
- Relationships

These are guidance, not required achievement meters.

The diagnostic should explain missing areas, such as:

- Motivation is not defined
- Voice has no examples or style notes
- Character has relationships enabled but none configured

Selecting a diagnostic should navigate directly to the relevant section.

## Quick and Advanced modes

Use one editor with progressive disclosure.

### Quick

Designed to create a usable character in minutes.

Suggested fields:

- name
- identity
- species
- short appearance
- five or six personality axes
- traits
- voice
- short description / background

### Advanced

Expands the same model with deeper sections, such as:

- emotional regulation
- conflict response
- trust behavior
- initiative
- social confidence
- fears
- stress response
- humor
- speech quirks
- short-term goals
- long-term goals
- secrets
- relationship behavior
- memory importance
- world knowledge
- author notes
- roleplay instructions

Quick mode must not create a different or incompatible character format.

## Randomization and locking

Support randomization at multiple levels:

- whole character
- one section
- one field

Any structured value should be lockable so it survives randomization.

Randomization should be schema-driven and constraint-aware rather than arbitrary.

## Presets

Presets may provide starting points for:

- species
- body configuration
- personality archetypes
- voice style
- roleplay archetypes

A preset is only a starting configuration. Every value remains editable.

Presets must be authored specifically for HW RP V2. Do not import legacy character data as preset content.

## Custom descriptors and overrides

Users should always have somewhere to add details the schema did not anticipate.

Support custom descriptors for major sections and optionally user-defined fields in Advanced mode.

Unknown/custom fields should be preserved across edit/save/load cycles.

This prevents the Factory schema from becoming a prison.

## Character test bench

Provide a temporary "Test Character" panel.

The user can enter a test line or situation and receive a disposable sample response based on the current unsaved editor state.

This lets the user tune sliders, traits, voice, or free-form instructions and immediately compare behavior.

Test runs do not modify the canonical conversation timeline or relationship state unless explicitly promoted later.

## Responsive behavior

### Desktop

- section navigation + editor + live interpretation may coexist
- dense controls are acceptable when clearly grouped

### Tablet

- primary editor remains central
- interpretation / diagnostics may become a drawer or secondary pane

### Phone

- one focused section at a time
- large touch controls
- no required hover
- bottom or compact navigation between sections
- live preview available as a sheet / drawer
- text areas remain comfortable with the virtual keyboard open

All essential Character and Persona creation must be possible on phone.

## Visual language

Factory V2 belongs to the same ecosystem as HW Landing and the RP control-room UI.

Use fresh V2 components inspired by:

- dark celestial copper
- analog instrument panels
- workshop / calibration equipment
- restrained meters and status lamps

Sliders should feel like calibration controls, but remain accessible native or semantically equivalent controls.

Writing areas should be clean and calm. The analog theme must never reduce readability.

## Data architecture

Prefer a versioned schema with explicit structured domains plus extension fields.

Conceptually:

```text
Character
  identity
  body
  appearance
  personality
  traits[]
  voice
  behavior
  motivations
  relationships[]
  knowledge
  roleplay
  freeform
  extensions
  schemaVersion
```

The prompt compiler consumes the semantic model, not the editor component tree.

The UI, database representation, and prompt representation must remain separable.

## Design-reference notes

External projects may be studied for general product and data-model ideas, but RP V2 must keep its own implementation and content.

### Free Cities Redux

Useful conceptual patterns include:

- dedicated custom-character editing flow
- creation helpers separated from presentation
- structured character properties
- editable custom descriptors
- generated character summaries
- preserved custom overrides

The referenced repository is GPLv3. Do not copy its source into HW RP V2 unless the project owner explicitly chooses GPL-compatible derivative licensing for the affected work. Prefer independent implementation of general ideas.

### Lilith's Throne

Useful only as conceptual inspiration for deep RPG-style character modelling and conditional body/trait configuration.

Do not copy code, text, data or assets from that project into RP V2.

## Clean-room asset rule

Do not import old Howling Whispers Sandbox assets, old character portraits, old character cards, or legacy character artwork.

Factory placeholders, icons, SVGs, examples and development fixtures must be newly created for RP V2.
