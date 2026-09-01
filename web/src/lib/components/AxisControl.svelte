<script lang="ts">
  import type { PersonalityAxis } from '$lib/factory/types';
  import LockButton from './LockButton.svelte';

  let {
    axis,
    onChange,
    onLock,
    onReset
  }: {
    axis: PersonalityAxis;
    onChange: (value: number) => void;
    onLock: () => void;
    onReset: () => void;
  } = $props();

  let position = $derived(((axis.value + 100) / 200) * 100);
  let signal = $derived(
    Math.abs(axis.value) < 18
      ? 'Neutral'
      : `${Math.abs(axis.value) >= 70 ? 'Strongly' : Math.abs(axis.value) >= 40 ? 'Noticeably' : 'Slightly'} ${axis.value < 0 ? axis.leftLabel : axis.rightLabel}`
  );
</script>

<div class="axis-control">
  <div class="axis-head">
    <div>
      <span class="micro-label">{axis.label}</span>
      <strong>{signal}</strong>
    </div>
    <div class="axis-actions">
      <output for={`axis-${axis.id}`}>{axis.value > 0 ? '+' : ''}{axis.value}</output>
      <button class="reset-button" type="button" onclick={onReset} aria-label={`Reset ${axis.label} to neutral`}>0</button>
      <LockButton locked={axis.locked} label={axis.label} onToggle={onLock} />
    </div>
  </div>

  <input
    id={`axis-${axis.id}`}
    type="range"
    min="-100"
    max="100"
    step="1"
    value={axis.value}
    style={`--axis-position: ${position}%`}
    aria-label={`${axis.leftLabel} to ${axis.rightLabel}`}
    oninput={(event) => onChange(Number(event.currentTarget.value))}
  />

  <div class="axis-scale" aria-hidden="true">
    <span>{axis.leftLabel}</span>
    <i></i>
    <span>{axis.rightLabel}</span>
  </div>
</div>
