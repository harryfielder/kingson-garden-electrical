import * as migration_20260921_185647_initial from './20260921_185647_initial';
import * as migration_20260921_201327_design_tokens from './20260921_201327_design_tokens';

export const migrations = [
  {
    up: migration_20260921_185647_initial.up,
    down: migration_20260921_185647_initial.down,
    name: '20260921_185647_initial',
  },
  {
    up: migration_20260921_201327_design_tokens.up,
    down: migration_20260921_201327_design_tokens.down,
    name: '20260921_201327_design_tokens'
  },
];
