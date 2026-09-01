# HW RP V2 Design System

## Design intent

RP V2 should feel like the operational interior of the same world presented by HW Landing.

Landing is the front gate.

RP V2 is the control room behind it.

The shared identity is dark, celestial, copper-accented and slightly mechanical. V2 adds an analog broadcast-console layer because it is an interactive workspace rather than a presentation page.

The implementation must be new. Do not copy legacy Sandbox assets or character art.

## Visual foundation

Initial token family:

```css
:root {
  --hw-ink-0: #040405;
  --hw-ink-1: #080809;
  --hw-panel-0: #120d0c;
  --hw-panel-1: #191210;
  --hw-copper-1: #74462d;
  --hw-copper-2: #c98752;
  --hw-copper-3: #e1aa77;
  --hw-text: #f4eee8;
  --hw-muted: #968a83;
  --hw-line: rgba(205, 145, 92, 0.23);
}
```

These values establish family resemblance with Landing. V2 should own its own token file and component implementation.

## Material language

Use three levels of surface:

1. **Room / chassis**
   - near-black
   - minimal texture
   - low visual noise

2. **Instrument panel**
   - slightly warmer dark surface
   - fine copper border
   - subtle inset or edge depth

3. **Active instrument**
   - brighter local contrast
   - illuminated state indicator
   - tactile response

Avoid glossy skeuomorphism and oversized fake screws everywhere.

## Controls

### Push buttons

Use for actions such as Send, Stop, Reroll and Commit Branch.

States must be readable without color alone:

- idle
- pressed
- active / latched
- disabled
- busy
- error

Press feedback happens locally on pointer/touch down.

### Toggle switches

Use only for persistent binary state such as Live Crew auto-join or a generation option.

Switch movement is immediate. Server synchronization follows.

### Knobs

Use only when continuous adjustment is genuinely useful.

Examples:

- response length
- creativity / sampling controls when supported by provider
- audio level if an audio system exists

A knob must also support keyboard and direct numeric adjustment. It must never be the only way to set a precise value.

### Meters

Meters visualize changing state. They are not decoration.

Possible uses:

- generation activity
- context budget
- relationship dimensions
- provider latency / health
- microphone or audio level if added later

### Status lamps

Small lamps indicate binary or categorical state:

- connected
- generating
- character active
- background sync pending
- provider available

Do not create a wall of meaningless blinking lights.

## Typography

Use a restrained two-family system:

- serif display type for major Howling Whispers identity moments and large section headings
- highly readable sans-serif for RP content, controls and data

RP prose must not use novelty terminal fonts.

Small instrument labels may use uppercase tracking, but avoid long passages in all caps.

## Motion

Motion should feel physical and responsive.

Good examples:

- switch travel
- button depression
- meter needle or bar interpolation
- drawer motion
- panel reveal
- active lamp fade

Rules:

- local interaction feedback begins immediately
- prefer transform and opacity animation
- avoid motion that blocks input
- avoid long cinematic transitions inside active RP
- honor `prefers-reduced-motion`

## Responsive layout model

Do not scale the desktop control room down. Recompose it.

### Wide desktop

Target behavior:

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

The RP core remains primary.

Secondary systems move into:

- one collapsible rail when space permits
- drawers
- tabbed sheets

### Phone

Use one primary content plane.

Suggested structure:

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

Secondary tools open as sheets or dedicated in-app views without destroying the active session.

## Input and virtual keyboard

On phones:

- composer must remain visible when practical
- account for dynamic viewport height
- avoid fixed elements being hidden behind the keyboard
- preserve draft text across navigation
- use safe-area insets

## Hover

Hover is enhancement only.

Anything exposed on hover must also be available through touch and keyboard.

## RP readability

The conversation is the most important surface in the product.

Analog styling must never make RP harder to read.

Use generous line height, sensible width, clear speaker distinction and selectable message text where appropriate.

## Character visuals

V2 begins with neutral placeholders only.

No legacy character portraits or old character artwork should appear in the initial UI.

When V2 character assets are added later, they should be created or explicitly imported for V2 and tracked as deliberate content additions.

## Asset policy

Fresh V2 assets should live under a clearly named V2 asset tree and document provenance where needed.

Do not add an automated migration path from an old Sandbox asset directory.
