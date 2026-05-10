import { describe, expect, it } from 'vitest';

import { tiebreak as averageRatingOfOpponentsCut1 } from '../cut1.js';
import { tiebreak as averageRatingOfOpponents } from '../index.js';

import type { CompletedRound, Player } from '@echecs/tournament';

const PLAYERS: Player[] = [
  { id: 'A', points: 2.5, rank: 1, rating: 2400 },
  { id: 'B', points: 1, rank: 3, rating: 2200 },
  { id: 'C', points: 0, rank: 4, rating: 2000 },
  { id: 'D', points: 2.5, rank: 2, rating: 2100 },
];

const ROUNDS: CompletedRound[] = [
  {
    byes: [],
    games: [
      { black: 'B', result: 'white', white: 'A' },
      { black: 'D', result: 'black', white: 'C' },
    ],
  },
  {
    byes: [],
    games: [
      { black: 'D', result: 'draw', white: 'A' },
      { black: 'B', result: 'black', white: 'C' },
    ],
  },
  {
    byes: [],
    games: [
      { black: 'C', result: 'white', white: 'A' },
      { black: 'B', result: 'white', white: 'D' },
    ],
  },
];

describe('averageRatingOfOpponents', () => {
  it("returns average of OTB opponents' ratings rounded to nearest integer", () => {
    expect(averageRatingOfOpponents('A', ROUNDS, PLAYERS)).toBe(2100);
  });

  it('handles player with no games', () => {
    expect(averageRatingOfOpponents('A', [], PLAYERS)).toBe(0);
  });
});

describe('averageRatingOfOpponentsCut1', () => {
  it('drops lowest-rated opponent and averages the rest', () => {
    expect(averageRatingOfOpponentsCut1('A', ROUNDS, PLAYERS)).toBe(2150);
  });

  it('returns 0 when only one opponent (all cut)', () => {
    const rounds: CompletedRound[] = [
      { byes: [], games: [{ black: 'B', result: 'white', white: 'A' }] },
    ];
    expect(averageRatingOfOpponentsCut1('A', rounds, PLAYERS)).toBe(0);
  });
});
