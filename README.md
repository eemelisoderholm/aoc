# AOC

My solutions for _some_ [Advent of Code](https://adventofcode.com/) puzzles,
using TypeScript and [Deno](https://docs.deno.com/runtime/).

Trying to prioritize solution readability, and self-imposing a no external
dependencies rule for fun, to reinvent some generic utility wheels from scratch.

## Usage

Solutions are run via the Deno test runner.

```bash
# Run tests for all days
deno test -A

# Run tests for day 3 of 2022
deno test -A ./2022/03
```

Some extra scripts are available for convenience.

```bash
# Prepare template for a new solution (see ./template/**)
deno run -A init.ts 2022 5

# Clear all the solutions, keep tests etc.
deno run -A reset.ts
```

## Structure

```
/yyyy/dd/dd.md      | Instructions of the day as markdown
/yyyy/dd/dd.txt     | Personal input file of the day
/yyyy/dd/dd.ts      | Solution functions exported as part1 and part2
/yyyy/dd/dd.test.ts | Tests using example input and real input

/common/*.ts        | Generic utility functions shared between puzzles
```

The tests are responsible for reading (but not parsing) the input files. The
solutions themselves are usually pure `(string) => number` functions.
