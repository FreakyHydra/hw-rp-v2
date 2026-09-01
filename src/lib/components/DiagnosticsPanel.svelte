<script lang="ts">
  import type { Diagnostic } from '$lib/factory/types';

  let {
    diagnostics,
    completeness,
    interpretation,
    onNavigate
  }: {
    diagnostics: Diagnostic[];
    completeness: number;
    interpretation: string;
    onNavigate: (section: string) => void;
  } = $props();
</script>

<aside class="telemetry" aria-label="Live character diagnostics">
  <section class="instrument-panel interpretation-panel">
    <header class="panel-heading">
      <div>
        <p class="eyebrow">LIVE SEMANTIC VIEW</p>
        <h2>AI Interpretation</h2>
      </div>
      <div class="status-lamp" title="Updates locally with every edit">
        <span class="lamp live" aria-hidden="true"></span>
        LIVE
      </div>
    </header>
    <p class="interpretation" aria-live="polite">{interpretation}</p>
    <p class="panel-footnote">Readable local interpretation. No network request is used.</p>
  </section>

  <section class="instrument-panel diagnostics-panel">
    <header class="panel-heading compact-heading">
      <div>
        <p class="eyebrow">SIGNAL COVERAGE</p>
        <h2>Diagnostics</h2>
      </div>
      <output class="completion-readout" aria-label={`${completeness} percent complete`}>{completeness}%</output>
    </header>

    <div class="completion-track" aria-hidden="true">
      <span style={`width: ${completeness}%`}></span>
    </div>

    <div class="diagnostic-list">
      {#each diagnostics as diagnostic}
        <button type="button" class="diagnostic" onclick={() => onNavigate(diagnostic.section)}>
          <span class:complete={diagnostic.score === 100} class="diagnostic-lamp" aria-hidden="true"></span>
          <span class="diagnostic-copy">
            <strong>{diagnostic.label}</strong>
            <small>{diagnostic.detail}</small>
          </span>
          <span class="diagnostic-score">{diagnostic.score}</span>
        </button>
      {/each}
    </div>
  </section>
</aside>
