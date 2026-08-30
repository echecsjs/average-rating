import { describe, expect, it } from 'vitest';

import { averageRatingOfOpponentsMedian2 } from '../median2.js';

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

describe('averageRatingOfOpponentsMedian2', () => {
  it('excludes the two lowest and two highest opponent ratings', () => {
    expect(averageRatingOfOpponentsMedian2('A', ROUNDS, PLAYERS)).toBe(0);
  });

  it('averages the remainder when at least one rating survives', () => {
    const wide: Player[] = [
      { id: 'A', points: 5, rank: 1, rating: 2000 },
      { id: 'B', points: 2, rank: 2, rating: 1800 },
      { id: 'C', points: 2, rank: 3, rating: 1900 },
      { id: 'D', points: 1, rank: 4, rating: 2100 },
      { id: 'E', points: 0, rank: 5, rating: 2300 },
      { id: 'F', points: 0, rank: 6, rating: 2000 },
    ];
    const five: CompletedRound[] = [
      { byes: [], games: [{ black: 'B', result: 'white', white: 'A' }] },
      { byes: [], games: [{ black: 'C', result: 'white', white: 'A' }] },
      { byes: [], games: [{ black: 'D', result: 'white', white: 'A' }] },
      { byes: [], games: [{ black: 'E', result: 'white', white: 'A' }] },
      { byes: [], games: [{ black: 'F', result: 'white', white: 'A' }] },
    ];
    expect(averageRatingOfOpponentsMedian2('A', five, wide)).toBe(2000);
  });
});
