import { A } from "../../common/array.ts";
import { M } from "../../common/math.ts";

type Event =
  | { type: "SHIFT"; minute: number; guard: number }
  | { type: "SLEEP"; minute: number }
  | { type: "WAKE"; minute: number };

// [1518-11-01 00:00] Guard #10 begins shift
// [1518-11-01 00:05] falls asleep
// [1518-11-01 00:25] wakes up
// [1518-11-01 00:30] falls asleep
// [1518-11-01 00:55] wakes up
// [1518-11-01 23:58] Guard #99 begins shift

function parseEvent(line: string): Event {
  const matchMinute = line.match(/:(\d{2})/);
  if (!matchMinute) throw new Error(`Invalid event: ${line}`);

  const minute = parseInt(matchMinute[1]);

  if (line.includes("wakes")) return { type: "WAKE", minute };
  if (line.includes("falls")) return { type: "SLEEP", minute };

  const matchGuard = line.match(/\#(\d+)\s/);
  if (!matchGuard) throw new Error(`Invalid event: ${line}`);

  const guard = parseInt(matchGuard[1]);

  return { type: "SHIFT", minute, guard };
}

// Sleeping minutes for each sleep period per guard
type SleepRecord = Record<number, Set<number>[]>;
function getSleepRecord(events: Event[]): SleepRecord {
  const guardSleeps: SleepRecord = {};
  let currentGuard: number;
  events.forEach((event, i) => {
    if (event.type === "SHIFT") {
      currentGuard = event.guard;
      guardSleeps[event.guard] = guardSleeps[event.guard] || [];
    }
    if (event.type === "WAKE") {
      const sleepStart = events[i - 1].minute;
      const sleepEnd = event.minute;
      const minuteSet = new Set(A.range(sleepStart, sleepEnd));
      guardSleeps[currentGuard].push(minuteSet);
    }
  });
  return guardSleeps;
}

type GuardStats = {
  guard: number;
  total: number; // Total minutes slept
  freqMin: number; // Most frequent sleeping minute
  freqMinTotal: number; // Total sleep events for the minute
};
const getStats = (sleeps: SleepRecord): GuardStats[] =>
  Object.entries(sleeps).map(([guard, sets]) => {
    const total = M.sum(sets.map((s) => s.size));
    const { mostFreq } = A.frequencies(sets);
    return [parseInt(guard), {
      total,
      freqMin: mostFreq?.value ?? 0,
      freqMinTotal: mostFreq?.total ?? 0,
    }] as const;
  }).map(([guard, stats]) => ({ guard, ...stats }));

function parseSleepStats(input: string) {
  const lines = input.split("\n").toSorted();
  const events = lines.map(parseEvent);
  const sleeps = getSleepRecord(events);
  return getStats(sleeps);
}

const findHighestTotalSleeper = (stats: GuardStats[]) =>
  stats.toSorted((a, b) => b.total - a.total)[0];

const findFrequentSameMinuteSleeper = (stats: GuardStats[]) =>
  stats.toSorted((a, b) => b.freqMinTotal - a.freqMinTotal)[0];

// "Strategy 1: Find the guard that has the most minutes asleep.
//  What minute does that guard spend asleep the most?"
export function part1(input: string) {
  const stats = parseSleepStats(input);
  const result = findHighestTotalSleeper(stats);
  return result.guard * result.freqMin;
}

// "Strategy 2: Of all guards, which guard is most frequently
//  asleep on the same minute?"
export function part2(input: string) {
  const stats = parseSleepStats(input);
  const result = findFrequentSameMinuteSleeper(stats);
  return result.guard * result.freqMin;
}
