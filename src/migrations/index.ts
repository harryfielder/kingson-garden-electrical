import * as migration_20260921_185647_initial from './20260921_185647_initial';

export const migrations = [
  {
    up: migration_20260921_185647_initial.up,
    down: migration_20260921_185647_initial.down,
    name: '20260921_185647_initial'
  },
];
