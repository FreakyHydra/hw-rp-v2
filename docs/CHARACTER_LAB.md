# Character Lab V2

## Purpose

Character Factory creates and edits the semantic model.

Character Lab lets the author *interrogate, tune and stress-test* that model before using it in a real roleplay.

The goal is to make a character feel authored rather than parameterized.

The Lab is not a second character format. It operates on the exact same unsaved working model used by the Factory.

## Core idea

A character is not a bag of permanent adjectives.

The same person can be:

- quiet with strangers
- loud with close friends
- cautious when responsible for someone else
- reckless when personally threatened
- warm when relaxed
- cold when ashamed

V2 should model this deliberately instead of forcing the author to flatten the character into one static personality score.

## Four authoring surfaces

The Factory should expose four ways into the same character model.

### Sketch

Fast creation for users who want to write first and tune later.

- name
- identity
- short description
- a few personality axes
- traits
- voice note
- background note

Target: a usable character in roughly one minute.

### Forge

The RPG-style structured editor.

- sliders
- traits
- body/species model
- motivations
- fears
- relationships
- behavior
- voice
- world knowledge

### Write

A prose-first view for authors who dislike forms.

Large writing areas for:

- who they are
- what they want
- how they behave
- how they speak
- what happened to them
- what they hide

The semantic interpreter can suggest structured values from the prose, but it must never overwrite them without explicit user approval.

### Lab

The live tuning environment described in this document.

All four surfaces edit one model.

## Contextual personality

A personality axis has a baseline plus optional context modifiers.

Example:

```text
ASSERTIVENESS
Baseline          62
With strangers    -18
With trusted      +16
Under pressure    +24
When ashamed      -35
```

The editor should present this simply. Advanced contextual tuning is optional.

The prompt compiler resolves the effective behavior from the current scene instead of blindly injecting every modifier.

## Behavior states

Provide a small set of authored behavioral contexts rather than hundreds of hard-coded emotions.

Initial useful contexts:

- default
- relaxed
- with strangers
- with trusted people
- under pressure
- frightened
- angry
- hurt
- embarrassed / ashamed
- conflict

Characters may add custom contexts.

A context may override only values that actually change. It does not clone the entire personality.

## Contradiction Engine

Contradictions are often what make a character interesting.

Do not treat all conflicting values as validation errors.

The Factory should detect meaningful tensions and surface them as **Character Tensions**.

Examples:

- Highly protective + conflict avoidant
- Strongly independent + fears abandonment
- Very trusting + highly suspicious under pressure
- Emotionally guarded + intense need for approval
- Gentle baseline + harsh conflict response

The UI can explain the likely expression:

> Protective but conflict-avoidant: may tolerate personal mistreatment but react strongly when someone else is threatened.

The user can:

- keep it
- explain it in prose
- tune the values
- dismiss the suggestion

Never auto-normalize a contradictory character into bland consistency.

## Trait expression

Traits have intensity, but may also define expression rules.

Example:

```text
Protective: 88
Expression:
  strangers: low
  trusted: very high
  threat: extreme
Note:
  Protects others more easily than accepting help personally.
```

This allows traits to behave rather than merely decorate the prompt.

## Motivation stack

Separate different kinds of wants.

### Immediate wants

What the character wants right now or in the current story phase.

### Persistent goals

Longer-running objectives.

### Needs

Things the character may need without consciously admitting them.

### Avoidances

Outcomes they actively try to prevent.

### Values

Principles they are reluctant to violate.

### Breaking points

Conditions likely to make normal behavior fail.

The Lab should visualize conflicts between these forces.

Example:

```text
WANTS:      Leave town
NEEDS:      Trust someone
VALUES:     Never abandon family
FEARS:      Depending on others

TENSION: Leaving town conflicts with family loyalty.
```

## Relationship Lens

A character should not behave identically toward everyone.

The Factory defines general relationship tendencies.

Individual relationships may later provide a **lens** over the base character.

A lens may influence:

- trust
- affection
- respect
- fear
- resentment
- protectiveness
- familiarity
- dependence
- rivalry

The Lab can preview a hypothetical lens without creating a real relationship.

Example presets for testing only:

- stranger
- new friend
- trusted friend
- rival
- authority figure
- person they disappointed

These are simulation presets, not character archetypes stored in canon.

## Voice Lab

Voice should be testable separately from personality.

Structured voice controls may include:

- verbosity
- sentence length
- vocabulary complexity
- directness
- formality
- emotional display
- humor frequency
- profanity tendency where appropriate
- metaphor tendency
- hesitation
- interruption tendency

Free-form voice notes remain authoritative nuance.

The author can supply example lines.

The system should distinguish:

- **voice**: how they say something
- **personality**: why they choose to say it
- **knowledge**: what they are capable of knowing

Do not merge those domains.

## Scenario Rack

The Lab provides reusable one-click test scenarios.

Examples:

- Someone insults them
- Someone compliments them
- A trusted person lies to them
- They are caught making a mistake
- They are asked for help
- They are frightened but trying to hide it
- Someone challenges their authority
- They have to apologize
- A friend wants to do something dangerous

Authors may write custom scenarios.

A scenario run is disposable and uses the current unsaved character state.

## A/B tuning

Allow the author to snapshot the current working state as A, make changes, and compare with B.

Example:

```text
A: Assertiveness 44, Guarded 81
B: Assertiveness 67, Guarded 65

Run same scenario against both.
```

Show the two responses side by side on desktop and sequentially on phone.

The user chooses which model to keep.

No canonical RP history is created.

## Behavioral fingerprint

Instead of a simplistic radar chart claiming to measure a person, provide a compact **behavioral fingerprint** showing the strongest authored signals.

Example:

```text
Dominant signals
  Protective        91
  Guarded           84
  Independent       78
  Dry humor         63

Context shifts
  + Assertive under pressure
  - Open when ashamed
  + Protective with trusted people
```

This is diagnostic, not a score of character quality.

## Character Gravity

The Lab can identify which fields are most likely to influence generation.

Call this **Character Gravity**.

Possible classifications:

- Core: almost always relevant
- Situational: relevant when scene matches
- Flavor: useful but low priority
- Dormant: currently unlikely to affect output

Example:

```text
CORE
Protective, guarded, wants independence

SITUATIONAL
Fear of deep water
Rivalry with authority

FLAVOR
Always straightens objects on a table
```

This helps authors understand why a huge biography may have less effect than three strong behavioral instructions.

It also helps the prompt compiler budget context intelligently.

## Prompt Budget Meter

Show an approximate semantic/context cost without exposing provider-specific implementation details as if they were universal.

Example:

```text
Character context
Identity       low
Appearance     medium
Behavior       high
Background     very high
Relationships  medium

Suggestion: Background contains repeated information already represented in traits.
```

The meter should suggest compression, never silently delete authored text.

## Semantic Diff

When editing, provide an optional human-readable summary of what changed in meaning.

Example:

> Since the previous save, Rowan is more cautious with strangers, less verbally aggressive during conflict, and now has a strong fear of disappointing trusted people.

This is more useful than a raw JSON diff for most authors.

## Randomization as inspiration, not chaos

Randomization should offer several modes.

### Nudge

Slightly perturb unlocked values while preserving the character concept.

### Remix

Change a meaningful subset while respecting locked identity/body fields.

### Wildcard

Generate a substantially different configuration inside user constraints.

### Contradiction

Intentionally add one plausible internal tension rather than random noise.

### Voice variant

Keep personality and history intact but generate a different speaking style proposal.

Randomization always previews before commit.

## Seed and reproducibility

Randomization should optionally expose a seed.

This makes interesting generated combinations reproducible and shareable without requiring character content to be copied from another source.

## Lock system

Locks exist at multiple levels:

- field
- trait
- section
- semantic concept

A semantic lock can protect a concept even if multiple underlying controls contribute to it.

Example:

> Lock "quiet around strangers"

A Remix may change other personality values but should preserve that authored concept.

## Appearance Workshop

Appearance is structured but should avoid becoming a body-parts spreadsheet.

Use progressive disclosure:

```text
Silhouette
  height
  frame
  build

Head
  hair / fur / ears / eyes

Body features
  species-relevant modules

Surface details
  colors / markings / scars

Style
  clothing tendencies / presentation

Distinctive details
  free-form descriptors
```

Species modules declare capabilities and relevant controls.

The UI should hide irrelevant modules without destroying stored data automatically.

## Species Composer

Do not assume every character fits one fixed species enum.

Support:

- base species
- optional hybrid components
- authored species
- capability flags

Capabilities might include:

- fur
- scales
- feathers
- tail
- external ears
- horns
- wings

The UI derives relevant appearance controls from capabilities.

The semantic model should not require the prompt compiler to know every fictional species ever created.

## Persona Mirror

Persona Factory gets a related but intentionally smaller Lab feature called **Persona Mirror**.

It answers:

> What will characters currently understand about this persona?

It can show:

- obvious identity/appearance information
- personality signals intentionally exposed to characters
- background facts marked known
- information marked private
- player-control permissions

This prevents persona notes intended for the engine from accidentally becoming knowledge every NPC should possess.

## Knowledge visibility

Character knowledge should carry visibility/provenance where useful.

Examples:

- common knowledge
- personally witnessed
- told by someone
- rumor
- private memory
- secret
- author-only instruction

The prompt compiler decides whether a fact belongs in a scene context.

This is separate from whether the user can see/edit the fact.

## Canon vs working state

Factory editing uses a working copy.

States:

- saved canonical version
- local working version
- autosave checkpoint
- optional named revision

The Lab may test the working version directly.

A failed server save must not erase the local working model.

## Revision history

Provide lightweight semantic revisions for characters.

Examples:

- Initial concept
- Voice rewrite
- Made less trusting
- Added ranger background

The user can inspect or restore an older character revision without affecting conversation timelines automatically.

Character revisions and RP timelines are separate histories.

## Live application during RP

Editing a character while they are active in a conversation needs an explicit policy.

Suggested modes:

- **Next turn**: new model applies to future generations
- **Next scene**: hold current snapshot until scene boundary
- **Pinned revision**: conversation continues using the revision it started with

Do not silently rewrite the meaning of already-generated history.

## Mobile design

Character Lab must remain genuinely useful on phone.

Use:

- one instrument group at a time
- sticky section selector inside the app shell
- large sliders and steppers
- expandable prose areas
- bottom-sheet interpretation
- swipe between A/B test results as an enhancement, with buttons as the accessible alternative
- no dense radar charts required to understand the character

## Visual concept

The Factory is the **workbench**.

The Lab is the **calibration bay**.

Visual cues can include:

- copper calibration rails
- restrained meter bars
- latched test buttons
- small connection/status lamps
- semantic warning lamps for unresolved conflicts
- clean paper-like dark writing surfaces

The analog language should make actions feel physical without pretending the app is literally a radio.

## Non-goals

Do not:

- turn personality into a deterministic simulation
- claim psychological accuracy
- force every character into predefined archetypes
- make sliders more authoritative than prose
- silently "fix" contradictions
- inject every field into every prompt
- require authors to understand tokenization
- copy character systems, text or assets from legacy Sandbox, Free Cities, Lilith's Throne or another game

The purpose is expressive authoring plus predictable AI interpretation, not a personality spreadsheet pretending to be a human mind.
