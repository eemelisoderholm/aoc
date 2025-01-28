interface Race {
  time: number;
  dist: number;
}

// Parse the lines as records for different races
// Time:      7  15   30
// Distance:  9  40  200
// -> [{ time: 7, dist: 9 }, { time: 15, dist: 40 }, ...]
function parseRaces(input: string): Race[] {
  const lineNums = input.split("\n")
    .map((line) =>
      Array.from(line.match(/\d+/g) ?? [])
        .map((digits) => parseInt(digits))
    );
  return lineNums[0].map((time, raceIndex) => {
    return { time, dist: lineNums[1][raceIndex] };
  });
}

// Parse the lines as the record for a single race
// Time:      7  15   30
// Distance:  9  40  200
// -> { time: 71530, dist: 940200 }
function parseRealRace(input: string): Race {
  const [time, dist] = input.split("\n").map((line) =>
    parseInt(line.replace(/\D+/g, ""))
  );
  return { time, dist };
}

function winErrorMargin(race: Race) {
  return new Array(race.time).fill(race.time).map(
    (maxTime, time) => {
      return time * (maxTime - time);
    },
  ).filter((dist) => dist > race.dist).length;
}

const distance = (holdTime: number, totalTime: number) =>
  (totalTime - holdTime) * holdTime;

// Find total number of ways to beat the records
export function part1(input: string) {
  const races = parseRaces(input);
  const margins = races.map(winErrorMargin);
  return margins.reduce((acc, margin) => acc * margin);
}

// Find total number of ways to beat the single long record
export function part2(input: string) {
  const race = parseRealRace(input);
  // Crude brute force solution, test all times
  let wins = 0;
  for (let i = 0; i <= race.time; i++) {
    const dist = distance(i, race.time);
    if (dist > race.dist) wins++;
  }
  return wins;
}
