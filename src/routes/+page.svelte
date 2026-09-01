<script lang="ts">
  import { browser } from '$app/environment';
  import AxisControl from '$lib/components/AxisControl.svelte';
  import DiagnosticsPanel from '$lib/components/DiagnosticsPanel.svelte';
  import LockButton from '$lib/components/LockButton.svelte';
  import TraitMixer from '$lib/components/TraitMixer.svelte';
  import { createFactoryModel } from '$lib/factory/defaults';
  import { diagnosticsFor, interpretModel, overallCompleteness } from '$lib/factory/derive';
  import { randomizeModel } from '$lib/factory/randomize';
  import type { EditorDepth, FactoryKind, FactoryModel, IdentityField, WritingField } from '$lib/factory/types';
  import { onMount } from 'svelte';

  const STORAGE_KEY = 'hw-rp-v2.factory.working-copy';

  let model = $state<FactoryModel>(createFactoryModel());
  let depth = $state<EditorDepth>('quick');
  let seed = $state('HOWL-001');
  let checkpoint = $state('WORKING COPY · LOCAL');
  let hydrated = $state(false);

  let interpretation = $derived(interpretModel(model));
  let diagnostics = $derived(diagnosticsFor(model));
  let completeness = $derived(overallCompleteness(diagnostics));

  onMount(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as FactoryModel;
        if (parsed.schemaVersion === 2 && (parsed.kind === 'character' || parsed.kind === 'persona')) {
          model = parsed;
          checkpoint = 'LOCAL CHECKPOINT RESTORED';
        }
      } catch {
        checkpoint = 'NEW LOCAL WORKING COPY';
      }
    }
    hydrated = true;
  });

  $effect(() => {
    if (!browser || !hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(model));
  });

  function touchState(): void {
    model.revision += 1;
    checkpoint = 'LOCAL CHECKPOINT UPDATED';
  }

  function setKind(kind: FactoryKind): void {
    if (model.kind === kind) return;
    model.kind = kind;
    touchState();
  }

  function setIdentity(field: IdentityField, value: string): void {
    model.identity[field] = value;
    touchState();
  }

  function toggleIdentityLock(field: IdentityField): void {
    model.identityLocks[field] = !model.identityLocks[field];
    touchState();
  }

  function updateAxis(id: string, value: number): void {
    const axis = model.personality.axes.find((candidate) => candidate.id === id);
    if (!axis) return;
    axis.value = value;
    touchState();
  }

  function toggleAxisLock(id: string): void {
    const axis = model.personality.axes.find((candidate) => candidate.id === id);
    if (!axis) return;
    axis.locked = !axis.locked;
    touchState();
  }

  function toggleTrait(label: string): void {
    const existing = model.traits.find((trait) => trait.label === label);
    if (existing) {
      model.traits = model.traits.filter((trait) => trait.id !== existing.id);
    } else {
      model.traits = [...model.traits, { id: label.toLowerCase(), label, intensity: 55, locked: false }];
    }
    touchState();
  }

  function updateTrait(id: string, intensity: number): void {
    const trait = model.traits.find((candidate) => candidate.id === id);
    if (!trait) return;
    trait.intensity = intensity;
    touchState();
  }

  function toggleTraitLock(id: string): void {
    const trait = model.traits.find((candidate) => candidate.id === id);
    if (!trait) return;
    trait.locked = !trait.locked;
    touchState();
  }

  function setWriting(field: WritingField, value: string): void {
    model.writing[field] = value;
    touchState();
  }

  function toggleWritingLock(field: WritingField): void {
    model.writingLocks[field] = !model.writingLocks[field];
    touchState();
  }

  function randomize(): void {
    model = randomizeModel(model, seed);
    checkpoint = `SEED ${seed.trim() || 'HOWLING-WHISPERS'} APPLIED LOCALLY`;
  }

  function newSeed(): void {
    seed = `HOWL-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  }

  function navigateTo(section: string): void {
    const target = document.getElementById(section);
    target?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    target?.focus({ preventScroll: true });
  }
</script>

<svelte:head>
  <title>Character Factory · The Howling Whispers</title>
  <meta name="description" content="A reactive character and persona workbench for Howling Whispers RP V2." />
</svelte:head>

<main class="factory-shell">
  <header class="masthead">
    <div class="masthead-copy">
      <p class="eyebrow">THE HOWLING WHISPERS · RP V2</p>
      <h1>Character Factory</h1>
      <p class="subtitle">Semantic workbench · Local reactive prototype 0.1</p>
    </div>
    <div class="local-status" aria-live="polite">
      <span class="lamp live" aria-hidden="true"></span>
      <span>{checkpoint}</span>
    </div>
  </header>

  <section class="control-deck" aria-label="Factory mode controls">
    <div class="segmented-control" role="group" aria-label="Model type">
      <button type="button" class:active={model.kind === 'character'} aria-pressed={model.kind === 'character'} onclick={() => setKind('character')}>CHARACTER</button>
      <button type="button" class:active={model.kind === 'persona'} aria-pressed={model.kind === 'persona'} onclick={() => setKind('persona')}>PERSONA</button>
    </div>
    <div class="segmented-control" role="group" aria-label="Editor depth">
      <button type="button" class:active={depth === 'quick'} aria-pressed={depth === 'quick'} onclick={() => (depth = 'quick')}>QUICK</button>
      <button type="button" class:active={depth === 'advanced'} aria-pressed={depth === 'advanced'} onclick={() => (depth = 'advanced')}>ADVANCED</button>
    </div>
    <div class="seed-rack">
      <label for="seed">RANDOM SEED</label>
      <input id="seed" bind:value={seed} spellcheck="false" />
      <button class="machine-button" type="button" onclick={newSeed}>NEW</button>
      <button class="machine-button primary" type="button" onclick={randomize}>RANDOMIZE UNLOCKED</button>
    </div>
  </section>

  <div class="workbench">
    <nav class="section-rail instrument-panel" aria-label="Factory sections">
      <div class="rail-heading">
        <span class="rail-index">01</span>
        <div>
          <p class="eyebrow">WORKBENCH</p>
          <strong>{model.kind === 'character' ? 'AUTONOMOUS ACTOR' : 'PLAYER MIRROR'}</strong>
        </div>
      </div>
      <button type="button" onclick={() => navigateTo('identity')}><span>01</span>Identity</button>
      <button type="button" onclick={() => navigateTo('personality')}><span>02</span>Personality</button>
      <button type="button" onclick={() => navigateTo('traits')}><span>03</span>Traits</button>
      <button type="button" onclick={() => navigateTo('writing')}><span>04</span>Writing</button>
      <div class="rail-note">
        <span class="lamp live" aria-hidden="true"></span>
        <p>All controls update the working copy and interpretation immediately.</p>
      </div>
    </nav>

    <div class="editor-stack">
      <section class="instrument-panel editor-panel" id="identity" tabindex="-1" aria-labelledby="identity-title">
        <header class="module-title">
          <div>
            <p class="eyebrow">MODULE 01</p>
            <h2 id="identity-title">Identity</h2>
          </div>
          <small>{model.kind === 'character' ? 'WHO ENTERS THE SCENE' : 'WHO THE PLAYER IS'}</small>
        </header>

        <div class="identity-grid">
          {#each [
            ['name', 'Name', 'e.g. Rowan Vale'],
            ['pronouns', 'Pronouns', 'e.g. they / them'],
            ['age', 'Age or life stage', 'Exact, approximate or unknown'],
            ['role', model.kind === 'character' ? 'Role / occupation' : 'Role in the world', 'e.g. Ranger, wanderer'],
            ['species', 'Species / body model', 'Free-form and composable']
          ] as field}
            <label class:wide={field[0] === 'species'} class="field-control">
              <span class="field-head"><span>{field[1]}</span><LockButton locked={model.identityLocks[field[0] as IdentityField]} label={field[1]} onToggle={() => toggleIdentityLock(field[0] as IdentityField)} /></span>
              <input
                value={model.identity[field[0] as IdentityField]}
                placeholder={field[2]}
                oninput={(event) => setIdentity(field[0] as IdentityField, event.currentTarget.value)}
              />
            </label>
          {/each}
        </div>

        <label class="field-control textarea-control">
          <span class="field-head"><span>Short description</span><LockButton locked={model.identityLocks.shortDescription} label="Short description" onToggle={() => toggleIdentityLock('shortDescription')} /></span>
          <textarea rows="3" value={model.identity.shortDescription} placeholder="The compact truth someone should understand first..." oninput={(event) => setIdentity('shortDescription', event.currentTarget.value)}></textarea>
        </label>
      </section>

      <section class="instrument-panel editor-panel" id="personality" tabindex="-1" aria-labelledby="personality-title">
        <header class="module-title">
          <div>
            <p class="eyebrow">MODULE 02</p>
            <h2 id="personality-title">Personality Mixer</h2>
          </div>
          <small>BASELINE · -100 TO +100</small>
        </header>
        <p class="module-intro">These are continuous signals, not boxes. Neutral is a real value. Free-form notes remain authoritative.</p>
        <div class="axis-rack">
          {#each model.personality.axes as axis (axis.id)}
            <AxisControl
              {axis}
              onChange={(value) => updateAxis(axis.id, value)}
              onLock={() => toggleAxisLock(axis.id)}
              onReset={() => updateAxis(axis.id, 0)}
            />
          {/each}
        </div>
      </section>

      <section class="instrument-panel editor-panel" id="traits" tabindex="-1" aria-labelledby="traits-title">
        <header class="module-title">
          <div>
            <p class="eyebrow">MODULE 03</p>
            <h2 id="traits-title">Trait Signal Rack</h2>
          </div>
          <small>SELECT · TUNE · LOCK</small>
        </header>
        <p class="module-intro">Traits carry intensity. Locked traits survive seeded randomization.</p>
        <TraitMixer traits={model.traits} onToggle={toggleTrait} onIntensity={updateTrait} onLock={toggleTraitLock} />
      </section>

      <section class="instrument-panel editor-panel" id="writing" tabindex="-1" aria-labelledby="writing-title">
        <header class="module-title">
          <div>
            <p class="eyebrow">MODULE 04</p>
            <h2 id="writing-title">Writing Surfaces</h2>
          </div>
          <small>{depth === 'quick' ? 'QUICK AUTHORING' : 'ADVANCED AUTHORING'}</small>
        </header>

        <div class="writing-stack">
          {#each [
            ['background', 'Background', 'What happened before this story?'],
            ['voice', 'Voice & dialogue', 'How do they speak? Add style notes or example lines.'],
            ['behavior', model.kind === 'character' ? 'Behavior under pressure' : 'How others should understand this persona', model.kind === 'character' ? 'Describe contradictions, coping, and situation-dependent behavior.' : 'What signals are visible to characters, and what stays private?']
          ] as area}
            <label class="field-control textarea-control writing-area">
              <span class="field-head"><span>{area[1]}</span><LockButton locked={model.writingLocks[area[0] as WritingField]} label={area[1]} onToggle={() => toggleWritingLock(area[0] as WritingField)} /></span>
              <textarea rows="5" value={model.writing[area[0] as WritingField]} placeholder={area[2]} oninput={(event) => setWriting(area[0] as WritingField, event.currentTarget.value)}></textarea>
            </label>
          {/each}

          {#if model.kind === 'character'}
            <label class="field-control textarea-control writing-area">
              <span class="field-head"><span>Motivation & goals</span><LockButton locked={model.writingLocks.motivation} label="Motivation and goals" onToggle={() => toggleWritingLock('motivation')} /></span>
              <textarea rows="5" value={model.writing.motivation} placeholder="What do they want, need, value or avoid?" oninput={(event) => setWriting('motivation', event.currentTarget.value)}></textarea>
            </label>
          {/if}

          {#if depth === 'advanced' || model.kind === 'persona'}
            <label class="field-control textarea-control writing-area advanced-field">
              <span class="field-head"><span>{model.kind === 'persona' ? 'Player control & boundaries' : 'Roleplay boundaries'}</span><LockButton locked={model.writingLocks.boundaries} label="Boundaries" onToggle={() => toggleWritingLock('boundaries')} /></span>
              <textarea rows="5" value={model.writing.boundaries} placeholder={model.kind === 'persona' ? 'What must remain under player control?' : 'Instructions and boundaries for roleplay behavior.'} oninput={(event) => setWriting('boundaries', event.currentTarget.value)}></textarea>
            </label>
          {/if}

          {#if depth === 'advanced'}
            <label class="field-control textarea-control writing-area advanced-field">
              <span class="field-head"><span>Author notes</span><LockButton locked={model.writingLocks.notes} label="Author notes" onToggle={() => toggleWritingLock('notes')} /></span>
              <textarea rows="5" value={model.writing.notes} placeholder="Engine-facing nuance, exceptions, or custom descriptors..." oninput={(event) => setWriting('notes', event.currentTarget.value)}></textarea>
            </label>
          {/if}
        </div>
      </section>
    </div>

    <DiagnosticsPanel {diagnostics} {completeness} {interpretation} onNavigate={navigateTo} />
  </div>

  <footer>
    <span>HW RP V2 · CHARACTER WORKBENCH</span>
    <span>SCHEMA V{model.schemaVersion} · REVISION {model.revision}</span>
  </footer>
</main>
