import { describe, expect, it } from 'vitest';

import { averageRatingOfOpponentsCut2 } from '../cut2.js';

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

const BOUNDARY_PLAYERS: Player[] = [
  { id: 'A', points: 2.5, rank: 1, rating: 2000 },
  { id: 'B', points: 1.5, rank: 2, rating: 1800 },
  { id: 'C', points: 1.5, rank: 3, rating: 1800 },
  { id: 'D', points: 0.5, rank: 4, rating: 2200 },
];

describe('averageRatingOfOpponentsCut2', () => {
  it('excludes the two lowest opponent ratings', () => {
    expect(averageRatingOfOpponentsCut2('A', ROUNDS, PLAYERS)).toBe(2200);
  });

  it('cuts by value when the two lowest ratings are tied', () => {
    expect(averageRatingOfOpponentsCut2('A', ROUNDS, BOUNDARY_PLAYERS)).toBe(
      2200,
    );
  });

  it('returns 0 when fewer than three opponents have ratings', () => {
    expect(averageRatingOfOpponentsCut2('A', [], PLAYERS)).toBe(0);
  });
});
