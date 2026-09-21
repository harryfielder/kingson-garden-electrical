import * as migration_20260921_185647_initial from './20260921_185647_initial';
import * as migration_20260921_201327_design_tokens from './20260921_201327_design_tokens';
import * as migration_20260921_204214_add_neutral_tone from './20260921_204214_add_neutral_tone';

export const migrations = [
  {
    up: migration_20260921_185647_initial.up,
    down: migration_20260921_185647_initial.down,
    name: '20260921_185647_initial',
  },
  {
    up: migration_20260921_201327_design_tokens.up,
    down: migration_20260921_201327_design_tokens.down,
    name: '20260921_201327_design_tokens',
  },
  {
    up: migration_20260921_204214_add_neutral_tone.up,
    down: migration_20260921_204214_add_neutral_tone.down,
    name: '20260921_204214_add_neutral_tone'
  },
];
