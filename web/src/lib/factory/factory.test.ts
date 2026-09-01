import { describe, expect, it } from 'vitest';
import { createFactoryModel } from './defaults';
import { diagnosticsFor, interpretModel, overallCompleteness } from './derive';
import { randomizeModel } from './randomize';

describe('seeded Factory randomization', () => {
  it('produces the same semantic model for the same seed', () => {
    const source = createFactoryModel();

    expect(randomizeModel(source, 'HOWL-042')).toEqual(randomizeModel(source, 'HOWL-042'));
  });

  it('produces a different unlocked model for a different seed', () => {
    const source = createFactoryModel();

    expect(randomizeModel(source, 'HOWL-042')).not.toEqual(randomizeModel(source, 'HOWL-043'));
  });

  it('preserves locked fields, axes, traits, and extensions', () => {
    const source = createFactoryModel();
    source.identity.name = 'Locked Name';
    source.identityLocks.name = true;
    source.personality.axes[0].value = 77;
    source.personality.axes[0].locked = true;
    source.traits = [{ id: 'loyal', label: 'Loyal', intensity: 91, locked: true }];
    source.extensions = { futureModule: { authored: true } };

    const randomized = randomizeModel(source, 'LOCK-CHECK');

    expect(randomized.identity.name).toBe('Locked Name');
    expect(randomized.personality.axes[0].value).toBe(77);
    expect(randomized.traits).toContainEqual({ id: 'loyal', label: 'Loyal', intensity: 91, locked: true });
    expect(randomized.extensions).toEqual({ futureModule: { authored: true } });
    expect(source.identity.role).toBe('');
  });
});

describe('live semantic diagnostics', () => {
  it('keeps neutral axis values as real signals without treating them as missing data', () => {
    const model = createFactoryModel();

    expect(model.personality.axes.every((axis) => axis.value === 0)).toBe(true);
    expect(interpretModel(model)).toContain('still neutral');
  });

  it('updates interpretation and completeness from authored state', () => {
    const model = createFactoryModel('character');
    model.identity.name = 'Rook';
    model.identity.species = 'Corvid folk';
    model.identity.shortDescription = 'A quiet courier who avoids being known.';
    model.personality.axes[0].value = -72;
    model.traits = [{ id: 'observant', label: 'Observant', intensity: 84, locked: false }];
    model.writing.voice = 'Uses short, careful sentences.';
    model.writing.background = 'Raised between remote signal stations.';
    model.writing.motivation = 'Deliver one final sealed message.';

    const diagnostics = diagnosticsFor(model);

    expect(interpretModel(model)).toContain('strongly reserved');
    expect(diagnostics.find((item) => item.id === 'identity')?.score).toBe(100);
    expect(overallCompleteness(diagnostics)).toBeGreaterThan(60);
  });

  it('uses player-control diagnostics for personas', () => {
    const model = createFactoryModel('persona');
    model.writing.boundaries = 'Never decide the persona\'s dialogue or inner thoughts.';

    const diagnostic = diagnosticsFor(model).find((item) => item.id === 'boundaries');

    expect(diagnostic?.score).toBe(100);
    expect(diagnostic?.label).toBe('Player control');
  });
});
