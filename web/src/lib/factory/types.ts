export type FactoryKind = 'character' | 'persona';
export type EditorDepth = 'quick' | 'advanced';

export type IdentityField =
  | 'name'
  | 'pronouns'
  | 'age'
  | 'role'
  | 'species'
  | 'shortDescription';

export type WritingField =
  | 'background'
  | 'voice'
  | 'behavior'
  | 'motivation'
  | 'boundaries'
  | 'notes';

export type PersonalityAxis = {
  id: string;
  label: string;
  leftLabel: string;
  rightLabel: string;
  value: number;
  locked: boolean;
};

export type CharacterTrait = {
  id: string;
  label: string;
  intensity: number;
  locked: boolean;
};

export type FactoryModel = {
  schemaVersion: 2;
  revision: number;
  kind: FactoryKind;
  identity: Record<IdentityField, string>;
  identityLocks: Record<IdentityField, boolean>;
  personality: {
    axes: PersonalityAxis[];
  };
  traits: CharacterTrait[];
  writing: Record<WritingField, string>;
  writingLocks: Record<WritingField, boolean>;
  extensions: Record<string, unknown>;
};

export type Diagnostic = {
  id: string;
  label: string;
  section: string;
  score: number;
  detail: string;
};
