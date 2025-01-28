import { M } from "../../common/math.ts";

interface Game {
  id: number;
  rounds: Cubeset[];
}

interface Cubeset {
  red: number;
  green: number;
  blue: number;
}

function parseGames(input: string): Game[] {
  return input.split("\n")
    .map((line) => line.split(": ")[1]).map(
      // "6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"
      (game, index) => ({
        id: index + 1,
        rounds: game.split("; ").map((hand) => {
          // "6 red, 1 blue, 3 green"
          const round = { red: 0, green: 0, blue: 0 };
          hand.split(", ").forEach((cube) => {
            // "6 red"
            const [amount, color] = cube.split(" ");
            round[color as keyof Cubeset] = parseInt(amount);
          });
          return round;
        }),
      }),
    );
}

function cubesInGame(game: Game): Cubeset {
  return game.rounds.reduce((currMax, cubes) => ({
    red: Math.max(currMax.red, cubes.red),
    green: Math.max(currMax.green, cubes.green),
    blue: Math.max(currMax.blue, cubes.blue),
  }), { red: 0, green: 0, blue: 0 });
}

function powerOfCubes(cubes: Cubeset): number {
  return cubes.red * cubes.green * cubes.blue;
}

export function part1(input: string) {
  const games = parseGames(input);
  const possible = games.filter((game) =>
    game.rounds.every((round) =>
      round.red <= 12 &&
      round.green <= 13 &&
      round.blue <= 14
    )
  );
  return M.sum(possible.map((game) => game.id));
}

export function part2(input: string) {
  const games = parseGames(input);
  return M.sum(games.map(cubesInGame).map(powerOfCubes));
}
