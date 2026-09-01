<script lang="ts">
  import { TRAIT_LIBRARY } from '$lib/factory/defaults';
  import type { CharacterTrait } from '$lib/factory/types';
  import LockButton from './LockButton.svelte';

  let {
    traits,
    onToggle,
    onIntensity,
    onLock
  }: {
    traits: CharacterTrait[];
    onToggle: (label: string) => void;
    onIntensity: (id: string, intensity: number) => void;
    onLock: (id: string) => void;
  } = $props();

  function selected(label: string): CharacterTrait | undefined {
    return traits.find((trait) => trait.label === label);
  }

  function strength(intensity: number): string {
    if (intensity >= 80) return 'Very strong';
    if (intensity >= 60) return 'Strong';
    if (intensity >= 35) return 'Moderate';
    return 'Light';
  }
</script>

<div class="trait-library" aria-label="Trait library">
  {#each TRAIT_LIBRARY as label}
    {@const activeTrait = selected(label)}
    <button
      class:active={Boolean(activeTrait)}
      class="trait-chip"
      type="button"
      aria-pressed={Boolean(activeTrait)}
      onclick={() => onToggle(label)}
    >
      <span class="chip-lamp" aria-hidden="true"></span>
      {label}
      {#if activeTrait}<small>{activeTrait.intensity}</small>{/if}
    </button>
  {/each}
</div>

{#if traits.length > 0}
  <div class="trait-rack">
    {#each traits as trait (trait.id)}
      <div class="trait-channel">
        <div class="trait-channel-head">
          <div>
            <strong>{trait.label}</strong>
            <span>{strength(trait.intensity)}</span>
          </div>
          <div class="trait-channel-actions">
            <output for={`trait-${trait.id}`}>{trait.intensity}</output>
            <LockButton locked={trait.locked} label={`${trait.label} trait`} onToggle={() => onLock(trait.id)} />
          </div>
        </div>
        <input
          id={`trait-${trait.id}`}
          type="range"
          min="1"
          max="100"
          value={trait.intensity}
          aria-label={`${trait.label} intensity`}
          oninput={(event) => onIntensity(trait.id, Number(event.currentTarget.value))}
        />
      </div>
    {/each}
  </div>
{:else}
  <p class="empty-note">Select a trait chip to add it to the signal rack.</p>
{/if}
