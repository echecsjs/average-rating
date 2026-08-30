import { describe, expect, it } from 'vitest';

import { averageRatingOfOpponentsMedian1 } from '../median1.js';

import type { CompletedRound, Player } from '@echecs/tournament';

const PLAYERS: Player[] = [
  { id: 'A', points: 2.5, rank: 1, rating: 2000 },
  { id: 'B', points: 1.5, rank: 2, rating: 1800 },
  { id: 'C', points: 1.5, rank: 3, rating: 2000 },
  { id: 'D', points: 0.5, rank: 4, rating: 2200 },
];

const ROUNDS: CompletedRound[] = [
  {
    byes: [],
    games: [
      { black: 'B', result: 'white', white: 'A' },
      { black: 'D', result: 'draw', white: 'C' },
    ],
  },
  {
    byes: [],
    games: [
      { black: 'C', result: 'draw', white: 'A' },
      { black: 'D', result: 'white', white: 'B' },
    ],
  },
  {
    byes: [],
    games: [
      { black: 'D', result: 'white', white: 'A' },
      { black: 'C', result: 'draw', white: 'B' },
    ],
  },
];

describe('averageRatingOfOpponentsMedian1', () => {
  it('excludes the lowest and highest opponent ratings', () => {
    expect(averageRatingOfOpponentsMedian1('A', ROUNDS, PLAYERS)).toBe(2000);
  });

  it('returns 0 when nothing remains after the cut', () => {
    expect(averageRatingOfOpponentsMedian1('A', [], PLAYERS)).toBe(0);
  });
});
