import { describe, expect, it } from 'vitest';

import { averageRatingOfOpponentsCut1 } from '../cut1.js';
import { averageRatingOfOpponents } from '../index.js';

import type { CompletedRound, Player } from '@echecs/tournament';

const PLAYERS: Player[] = [
  { id: 'A', points: 2.5, rank: 1, rating: 2000 },
  { id: 'B', points: 0, rank: 4, rating: 1800 },
  { id: 'C', points: 0, rank: 3, rating: 2600 },
  { id: 'D', points: 0.5, rank: 2, rating: 2200 },
];

const ROUNDS: CompletedRound[] = [
  {
    byes: [],
    games: [{ black: 'B', result: 'white', white: 'A' }],
  },
  {
    byes: [],
    games: [
      {
        black: 'C',
        forfeit: 'black',
        result: 'white',
        white: 'A',
      },
    ],
  },
  {
    byes: [],
    games: [{ black: 'D', result: 'draw', white: 'A' }],
  },
];

describe('ARO forfeit exclusion (FIDE C.07 15.2)', () => {
  it('excludes forfeit opponents from ARO', () => {
    expect(averageRatingOfOpponents('A', ROUNDS, PLAYERS)).toBe(2000);
  });

  it('excludes forfeit opponents from ARO/C1', () => {
    expect(averageRatingOfOpponentsCut1('A', ROUNDS, PLAYERS)).toBe(2200);
  });
});
