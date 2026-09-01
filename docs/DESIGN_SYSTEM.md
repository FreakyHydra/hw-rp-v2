# HW RP V2 Design System

## Canonical shared theme

RP V2 must use the **same Howling Whispers theme and visual style** as the current HW Landing and Howling Whispers Analog pages.

This is not merely inspiration, resemblance, or a loose visual family.

The intended result is that Landing, Analog, RP V2, Character Factory, Persona Factory, Timeline, Relationship, Memory, Live Crew and later V2 applications all look like parts of one unified Howling Whispers product.

The canonical visual references are:

- `FreakyHydra/HW-Landing`, `dev` branch
  - `src/styles/base.css`
  - `src/styles/world.css`
  - related current Landing UI source
- `FreakyHydra/Howling-Whispers-Analog`, `dev` branch
  - `src/style.css`
  - `src/daw/style.css`
  - `src/daw/controls.css`
  - related current Analog UI source

Before implementing or substantially redesigning RP V2 UI, inspect the current versions of those references.

Landing is the front gate.

Analog is an instrument room.

RP V2 is the roleplay control room and character workshop inside that same place.

Different products may use different layouts, but they must share the same visual DNA.

## Reuse boundary

The clean-room restriction applies to the old Sandbox and old character content. It does **not** prohibit intentionally sharing the Howling Whispers ecosystem design system from Landing and Analog.

It is acceptable and encouraged to reuse, port, consolidate, or faithfully reproduce where technically appropriate:

- core color values and design tokens
- typography choices
- spacing and radius conventions
- panel material treatments
- border and line treatments
- background atmosphere
- celestial details
- status lamps
- slider/control styling
- button interaction language
- focus treatment
- motion language
- responsive design conventions

If a shared design-system package or token module becomes practical later, prefer that over allowing the applications to visually drift apart.

Do not copy old Sandbox assets, old character art, old portraits, old character cards, or legacy Sandbox UI assets.

## Canonical visual foundation

Landing currently establishes the near-black, copper and ivory foundation. Analog extends that into physical instrument controls.

V2 should preserve that exact direction.

Representative token family:

```css
:root {
  --hw-ink-0: #040405;
  --hw-ink-1: #080809;
  --hw-panel-0: #120d0c;
  --hw-panel-1: #191210;
  --hw-copper-deep: #74462d;
  --hw-copper: #c98752;
  --hw-copper-bright: #e1aa77;
  --hw-text: #f4eee8;
  --hw-muted: #968a83;
  --hw-line: rgba(205, 145, 92, 0.23);
}
```

Exact values should stay synchronized with the canonical pages when practical rather than slowly diverging into slightly different palettes.

## Background and atmosphere

Keep the same visual atmosphere as Landing and Analog:

- near-black base
- subtle warm radial illumination
- restrained celestial/star-field detail where appropriate
- copper highlights instead of bright generic accent colors
- minimal visual noise behind readable content

RP V2 may be denser than Landing, but it should still feel like entering another room of the same site.

## Typography

Preserve the established two-part typography language:

- Georgia / serif display treatment for major Howling Whispers headings and identity moments
- readable system/sans-serif typography for controls, RP content and dense information
- uppercase tracked micro-labels for instrument/control metadata

Do not replace this with a generic dashboard typography stack that changes the character of the product.

## Material language

Use the same physical material treatment seen in Analog:

1. **Room / chassis**
   - near-black
   - low visual noise
   - subtle warm atmosphere

2. **Instrument panel**
   - warm-black / brown-black surface
   - fine copper border
   - subtle inset/highlight depth
   - restrained rounding consistent with Analog

3. **Active instrument**
   - increased local contrast
   - illuminated state indicator
   - immediate tactile response

Panels should feel related to Analog's synthesizer and DAW surfaces, adapted to RP rather than reinvented.

## Controls

### Sliders

Factory personality axes and other continuous values should directly follow the established Analog control language:

- dark copper track
- warm copper hardware-like thumb
- immediate movement
- visible focus state
- accessible keyboard behavior
- adequate touch target even when the visible track is thin

### Push buttons

Use for actions such as Send, Stop, Reroll, Test, Randomize and Commit Branch.

States:

- idle
- pressed
- active / latched
- disabled
- busy
- error

Press feedback happens locally on pointer/touch down.

### Toggle switches

Use for real persistent binary state, not decoration.

### Knobs

Use only when continuous rotary adjustment actually improves the task. Always provide keyboard/direct-value access.

### Meters

Meters show changing state such as generation activity, context usage, relationship dimensions or diagnostics. They must not be decorative filler.

### Status lamps

Use the same lamp language as Analog for states such as:

- connected
- generating
- synced
- character active
- provider available
- unsaved/local changes

Do not create meaningless blinking lights.

## Motion

Landing provides the cinematic side of the identity. Analog provides the tactile side.

Inside active RP and Factory workflows, favor Analog-style tactile motion:

- button depression
- slider movement
- switch travel
- meter interpolation
- panel/drawer reveal
- lamp activation

Long cinematic transitions belong at major entrances or mode changes, not every interaction.

All local control feedback should begin immediately and honor `prefers-reduced-motion`.

## Product-specific layouts, shared skin

Unified theme does not mean identical page geometry.

- Landing may remain spacious and cinematic.
- Analog may remain instrument-dense.
- RP may prioritize a readable conversation core.
- Factory may resemble a calibration/workbench layout.
- Timeline may use a branching navigation canvas.

But colors, typography, surfaces, borders, control behavior, motion and atmosphere should make each one unmistakably Howling Whispers.

## Responsive layout model

Do not shrink desktop layouts. Recompose them while retaining the same theme.

### Wide desktop

```text
+----------------+----------------------------+----------------+
| Character /    |                            | Crew /          |
| Persona /      |       ROLEPLAY CORE        | Relationship /  |
| Session        |                            | Context         |
|                |                            |                 |
+----------------+----------------------------+----------------+
| persistent composer / controls / status                       |
+---------------------------------------------------------------+
```

### Tablet

The primary task remains central. Secondary systems become collapsible rails, drawers or tabbed sheets using the same panel styling.

### Phone

Use one primary plane with touch-friendly themed controls:

```text
+-----------------------------+
| HW RP V2       status   menu|
+-----------------------------+
|                             |
|        ROLEPLAY FEED        |
|                             |
+-----------------------------+
| composer                    |
| quick actions               |
+-----------------------------+
| Chat | Crew | Character | + |
+-----------------------------+
```

All essential features must work without hover or horizontal page scrolling.

## RP readability

The shared theme must never compromise conversation readability.

RP prose uses comfortable line height, sensible measure, clear speaker distinction and selectable text where appropriate.

The visual system frames the writing. It must not overpower it.

## Character visuals and assets

V2 begins with fresh neutral placeholders.

No legacy Sandbox portraits, old character artwork, character cards, textures, backgrounds or UI assets are carried forward.

New V2-specific artwork may be added deliberately later.

## Anti-drift rule

A change that makes RP V2 look visually unrelated to Landing or Analog is a regression unless the ecosystem design system itself is intentionally being changed across products.

When unsure, compare the implementation side-by-side with the current Landing and Analog pages before inventing a new visual treatment.
