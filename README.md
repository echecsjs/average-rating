# Average Rating

[![npm](https://img.shields.io/npm/v/@echecs/average-rating)](https://www.npmjs.com/package/@echecs/average-rating)
[![Coverage](https://codecov.io/gh/echecsjs/average-rating/branch/main/graph/badge.svg)](https://codecov.io/gh/echecsjs/average-rating)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Spec](https://img.shields.io/badge/Spec-FIDE-green.svg)](SPEC.md)

**Average Rating** is a TypeScript library implementing the Average Rating of
Opponents tiebreaks for chess tournaments, following the
[FIDE Tiebreak Regulations](https://handbook.fide.com/chapter/TieBreakRegulations032026)
(sections 10.1 and 10.6). Zero runtime dependencies.

## Installation

```bash
npm install @echecs/average-rating
```

## Quick Start

### Main export — `@echecs/average-rating`

```typescript
import { averageRatingOfOpponents, tiebreak } from '@echecs/average-rating';
import type { Game, GameKind, Player, Result } from '@echecs/average-rating';

const players: Player[] = [
  { id: 'A', rating: 1800 },
  { id: 'B', rating: 1600 },
  { id: 'C', rating: 1700 },
  { id: 'D', rating: 1900 },
];
// games[n] = round n+1; Game has no `round` field
const games: Game[][] = [
  [{ black: 'B', result: 1, white: 'A' }], // round 1
  [{ black: 'C', result: 0.5, white: 'A' }], // round 2
  [{ black: 'A', result: 0, white: 'D' }], // round 3
  // Byes excluded from ARO regardless of kind
  [{ black: '', kind: 'half-bye', result: 0.5, white: 'A' }], // round 4
];

const avg = averageRatingOfOpponents('A', games, players);
// Returns Math.round((1600 + 1700 + 1900) / 3) = 1733

// `tiebreak` is an alias for `averageRatingOfOpponents`
const same = tiebreak('A', games, players);
```

### Cut-1 subpath — `@echecs/average-rating/cut1`

```typescript
import {
  averageRatingOfOpponentsCut1,
  tiebreak,
} from '@echecs/average-rating/cut1';

const avg = averageRatingOfOpponentsCut1('A', games, players);
// Returns Math.round((1700 + 1900) / 2) = 1800
// (lowest-rated opponent, B at 1600, is excluded)
```

## API

All functions share the same signature:

```typescript
(playerId: string, games: Game[][], players: Player[]): number
```

`Player.rating` is optional — players without a rating are silently skipped.
Functions return `0` when no rated opponents have been faced. Round is
determined by array position: `games[0]` = round 1, `games[1]` = round 2, etc.
The `Game` type has no `round` field. The optional `kind?: GameKind` field on
`Game` classifies unplayed rounds; byes are excluded from all ARO calculations.

> **Fixed in 4.1.0:** Forfeit opponents are excluded from ratings-based
> tie-breaks per FIDE C.07 15.2. This affects `averageRatingOfOpponents` and
> `averageRatingOfOpponentsCut1`.

### Types

#### `Player`

```typescript
interface Player {
  id: string;
  rating?: number; // optional — unrated players are skipped
}
```

#### `Game`

```typescript
interface Game {
  black: string;
  kind?: GameKind;
  result: Result;
  white: string;
}
```

#### `Result`

```typescript
type Result = 0 | 0.5 | 1;
```

#### `GameKind`

```typescript
type GameKind =
  | 'forfeit-loss'
  | 'forfeit-win'
  | 'full-bye'
  | 'half-bye'
  | 'pairing-bye'
  | 'zero-bye';
```

### `@echecs/average-rating`

#### `averageRatingOfOpponents(playerId, games, players)` / `tiebreak`

**FIDE section 10.1** — Average FIDE rating of all opponents faced by
`playerId`. Byes are excluded. Opponents not found in `players` or without a
`rating` are skipped. Returns the rounded integer average.

`tiebreak` is an alias for `averageRatingOfOpponents`.

```typescript
import { averageRatingOfOpponents, tiebreak } from '@echecs/average-rating';
```

### `@echecs/average-rating/cut1`

#### `averageRatingOfOpponentsCut1(playerId, games, players)` / `tiebreak`

**FIDE section 10.6** — Average rating of opponents minus the lowest-rated one.
Collects all opponent ratings, removes the single lowest, then returns the
rounded integer average of the remainder. Returns `0` if only one rated opponent
was faced.

`tiebreak` is an alias for `averageRatingOfOpponentsCut1`.

```typescript
import {
  averageRatingOfOpponentsCut1,
  tiebreak,
} from '@echecs/average-rating/cut1';
```

### `@echecs/average-rating/cut2`

#### `averageRatingOfOpponentsCut2(playerId, games, players)` / `tiebreak`

**FIDE section 10.1 + 14.2** — Average rating of opponents minus the two
lowest-rated ones (Cut-2). Collects all opponent ratings, removes the two
lowest, then returns the rounded integer average of the remainder. Returns `0`
if fewer than three rated opponents were faced.

`tiebreak` is an alias for `averageRatingOfOpponentsCut2`.

```typescript
import {
  averageRatingOfOpponentsCut2,
  tiebreak,
} from '@echecs/average-rating/cut2';
```

### `@echecs/average-rating/median1`

#### `averageRatingOfOpponentsMedian1(playerId, games, players)` / `tiebreak`

**FIDE section 10.1 + 14.3** — Average rating of opponents after excluding one
lowest-rated and one highest-rated opponent (Median-1). Collects all opponent
ratings, removes the single lowest and the single highest, then returns the
rounded integer average of the remainder. Returns `0` if fewer than three rated
opponents were faced.

`tiebreak` is an alias for `averageRatingOfOpponentsMedian1`.

```typescript
import {
  averageRatingOfOpponentsMedian1,
  tiebreak,
} from '@echecs/average-rating/median1';
```

### `@echecs/average-rating/median2`

#### `averageRatingOfOpponentsMedian2(playerId, games, players)` / `tiebreak`

**FIDE section 10.1 + 14.4** — Average rating of opponents after excluding two
lowest-rated and two highest-rated opponents (Median-2). Collects all opponent
ratings, removes the two lowest and the two highest, then returns the rounded
integer average of the remainder. Returns `0` if fewer than five rated opponents
were faced.

`tiebreak` is an alias for `averageRatingOfOpponentsMedian2`.

```typescript
import {
  averageRatingOfOpponentsMedian2,
  tiebreak,
} from '@echecs/average-rating/median2';
```

## Contributing

Contributions are welcome. Please open an issue at
[github.com/echecsjs/average-rating/issues](https://github.com/echecsjs/average-rating/issues).
