<script lang="ts">
  let {
    locked,
    label,
    onToggle
  }: {
    locked: boolean;
    label: string;
    onToggle: () => void;
  } = $props();
</script>

<button
  class:locked
  class="lock-button"
  type="button"
  aria-pressed={locked}
  aria-label={`${locked ? 'Unlock' : 'Lock'} ${label} during randomization`}
  title={`${locked ? 'Unlock' : 'Lock'} during randomization`}
  onclick={onToggle}
>
  <span aria-hidden="true">{locked ? '◆' : '◇'}</span>
  <span class="lock-copy">{locked ? 'LOCKED' : 'LOCK'}</span>
</button>
