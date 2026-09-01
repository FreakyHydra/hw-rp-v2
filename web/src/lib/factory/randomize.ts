import { TRAIT_LIBRARY } from './defaults';
import type { CharacterTrait, FactoryModel, IdentityField } from './types';

const options: Record<Exclude<IdentityField, 'shortDescription'>, string[]> = {
  name: ['Mara Voss', 'Rook Vale', 'Sable North', 'Iven Reed', 'Tarin Ash'],
  pronouns: ['she / her', 'he / him', 'they / them'],
  age: ['Young adult', 'Adult', 'Older adult', 'Unknown'],
  role: ['Wanderer', 'Archivist', 'Ranger', 'Mechanic', 'Courier'],
  species: ['Human', 'Wolf hybrid', 'Fox hybrid', 'Corvid folk', 'Custom being']
};

function hashSeed(seed: string): number {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number): () => number {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(values: readonly T[], random: () => number): T {
  return values[Math.floor(random() * values.length)];
}

function clone(model: FactoryModel): FactoryModel {
  return JSON.parse(JSON.stringify(model)) as FactoryModel;
}

export function randomizeModel(model: FactoryModel, seed: string): FactoryModel {
  const next = clone(model);
  const random = mulberry32(hashSeed(seed.trim() || 'howling-whispers'));

  (Object.keys(options) as Array<keyof typeof options>).forEach((field) => {
    if (!next.identityLocks[field]) next.identity[field] = pick(options[field], random);
  });

  if (!next.identityLocks.shortDescription) {
    next.identity.shortDescription = `${next.identity.role || 'Wanderer'} with a deliberately unfinished history and room to change.`;
  }

  next.personality.axes = next.personality.axes.map((axis) =>
    axis.locked ? axis : { ...axis, value: Math.round((random() * 160 - 80) / 5) * 5 }
  );

  const lockedTraits = next.traits.filter((trait) => trait.locked);
  const lockedIds = new Set(lockedTraits.map((trait) => trait.id));
  const candidates = TRAIT_LIBRARY.filter((label) => !lockedIds.has(label.toLowerCase()));
  const selected: CharacterTrait[] = [];
  const wanted = 3 + Math.floor(random() * 2);

  while (selected.length < wanted && candidates.length > 0) {
    const index = Math.floor(random() * candidates.length);
    const label = candidates.splice(index, 1)[0];
    selected.push({
      id: label.toLowerCase(),
      label,
      intensity: Math.round((40 + random() * 55) / 5) * 5,
      locked: false
    });
  }

  next.traits = [...lockedTraits, ...selected];
  next.revision += 1;
  return next;
}
