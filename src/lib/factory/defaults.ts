import type { FactoryModel, PersonalityAxis } from './types';

export const TRAIT_LIBRARY = [
  'Protective',
  'Loyal',
  'Curious',
  'Sarcastic',
  'Patient',
  'Stubborn',
  'Observant',
  'Idealistic',
  'Resourceful',
  'Secretive'
] as const;

export const PERSONALITY_AXES: PersonalityAxis[] = [
  { id: 'expressiveness', label: 'Social signal', leftLabel: 'Reserved', rightLabel: 'Expressive', value: 0, locked: false },
  { id: 'risk', label: 'Risk instinct', leftLabel: 'Cautious', rightLabel: 'Reckless', value: 0, locked: false },
  { id: 'temperament', label: 'Temperament', leftLabel: 'Gentle', rightLabel: 'Harsh', value: 0, locked: false },
  { id: 'playfulness', label: 'Social tone', leftLabel: 'Serious', rightLabel: 'Playful', value: 0, locked: false },
  { id: 'assertiveness', label: 'Initiative', leftLabel: 'Passive', rightLabel: 'Assertive', value: 0, locked: false }
];

const emptyIdentity = {
  name: '',
  pronouns: '',
  age: '',
  role: '',
  species: '',
  shortDescription: ''
};

const emptyWriting = {
  background: '',
  voice: '',
  behavior: '',
  motivation: '',
  boundaries: '',
  notes: ''
};

export function createFactoryModel(kind: FactoryModel['kind'] = 'character'): FactoryModel {
  return {
    schemaVersion: 2,
    revision: 0,
    kind,
    identity: { ...emptyIdentity },
    identityLocks: {
      name: false,
      pronouns: false,
      age: false,
      role: false,
      species: false,
      shortDescription: false
    },
    personality: { axes: PERSONALITY_AXES.map((axis) => ({ ...axis })) },
    traits: [],
    writing: { ...emptyWriting },
    writingLocks: {
      background: false,
      voice: false,
      behavior: false,
      motivation: false,
      boundaries: false,
      notes: false
    },
    extensions: {}
  };
}
