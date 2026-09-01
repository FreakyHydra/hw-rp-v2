import type { Diagnostic, FactoryModel, PersonalityAxis } from './types';

function filled(value: string): boolean {
  return value.trim().length > 0;
}

function axisPhrase(axis: PersonalityAxis): string | null {
  const magnitude = Math.abs(axis.value);
  if (magnitude < 18) return null;
  const direction = axis.value < 0 ? axis.leftLabel : axis.rightLabel;
  const strength = magnitude >= 70 ? 'strongly' : magnitude >= 40 ? 'noticeably' : 'slightly';
  return `${strength} ${direction.toLowerCase()}`;
}

function joinNatural(parts: string[]): string {
  if (parts.length <= 1) return parts[0] ?? '';
  return `${parts.slice(0, -1).join(', ')} and ${parts.at(-1)}`;
}

export function interpretModel(model: FactoryModel): string {
  const { identity, writing } = model;
  const subject = identity.name.trim() || (model.kind === 'persona' ? 'This persona' : 'This character');
  const identityParts = [identity.age, identity.species, identity.role].filter(filled);
  const signals = model.personality.axes.map(axisPhrase).filter((value): value is string => Boolean(value));
  const traits = [...model.traits]
    .sort((a, b) => b.intensity - a.intensity)
    .slice(0, 4)
    .map((trait) => `${trait.intensity >= 75 ? 'strongly' : trait.intensity >= 45 ? 'moderately' : 'lightly'} ${trait.label.toLowerCase()}`);

  const sentences = [
    `${subject}${identityParts.length ? ` is ${joinNatural(identityParts)}` : ' has an open identity'}${identity.shortDescription.trim() ? `: ${identity.shortDescription.trim()}` : '.'}`,
    signals.length || traits.length ? `${model.kind === 'persona' ? 'They signal' : 'Their baseline reads as'} ${joinNatural([...signals, ...traits])}.` : 'Personality signals are still neutral and lightly defined.',
    filled(writing.voice) ? `Voice: ${writing.voice.trim()}` : '',
    filled(writing.motivation) && model.kind === 'character' ? `Core drive: ${writing.motivation.trim()}` : '',
    filled(writing.behavior) ? `${model.kind === 'persona' ? 'How others may read them' : 'Behavior note'}: ${writing.behavior.trim()}` : ''
  ];

  return sentences.filter(filled).join(' ');
}

export function diagnosticsFor(model: FactoryModel): Diagnostic[] {
  const identityFilled = [model.identity.name, model.identity.species, model.identity.shortDescription].filter(filled).length;
  const personalitySignals = model.personality.axes.filter((axis) => Math.abs(axis.value) >= 18).length;

  const diagnostics: Diagnostic[] = [
    {
      id: 'identity',
      label: 'Identity',
      section: 'identity',
      score: Math.round((identityFilled / 3) * 100),
      detail: identityFilled === 3 ? 'Core identity is readable.' : 'Add a name, species and short description.'
    },
    {
      id: 'personality',
      label: 'Personality',
      section: 'personality',
      score: Math.min(100, Math.round(((personalitySignals + Math.min(model.traits.length, 3)) / 6) * 100)),
      detail: personalitySignals + model.traits.length >= 4 ? 'Distinct signals are taking shape.' : 'Move axes or add traits to create stronger signals.'
    },
    {
      id: 'voice',
      label: 'Voice',
      section: 'writing',
      score: filled(model.writing.voice) ? 100 : 0,
      detail: filled(model.writing.voice) ? 'Speech guidance is present.' : 'Add a voice or dialogue note.'
    },
    {
      id: 'background',
      label: 'Background',
      section: 'writing',
      score: filled(model.writing.background) ? 100 : 0,
      detail: filled(model.writing.background) ? 'Background context is present.' : 'Add a short history or context note.'
    }
  ];

  diagnostics.push(
    model.kind === 'character'
      ? {
          id: 'motivation',
          label: 'Motivation',
          section: 'writing',
          score: filled(model.writing.motivation) ? 100 : 0,
          detail: filled(model.writing.motivation) ? 'A core drive is defined.' : 'Define what this character wants.'
        }
      : {
          id: 'boundaries',
          label: 'Player control',
          section: 'writing',
          score: filled(model.writing.boundaries) ? 100 : 0,
          detail: filled(model.writing.boundaries) ? 'Player-control guidance is present.' : 'Describe what the engine must leave to the player.'
        }
  );

  return diagnostics;
}

export function overallCompleteness(diagnostics: Diagnostic[]): number {
  return Math.round(diagnostics.reduce((total, diagnostic) => total + diagnostic.score, 0) / diagnostics.length);
}
