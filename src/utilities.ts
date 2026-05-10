import type { CompletedRound, Game } from '@echecs/tournament';

function gamesForPlayer(player: string, rounds: CompletedRound[]): Game[] {
  return rounds
    .flatMap((r) => r.games)
    .filter((g) => g.white === player || g.black === player);
}

export { gamesForPlayer };
