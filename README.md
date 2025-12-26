# AOC

My solutions for _some_ [Advent of Code](https://adventofcode.com/) puzzles,
using TypeScript and [Deno](https://docs.deno.com/runtime/).

Trying to prioritize solution readability, and self-imposing a no external
dependencies rule for fun, to reinvent some generic utility wheels from scratch.

## Usage

Solutions are run via the Deno test runner.

Personal inputs and puzzle markdowns are omitted from the repository for AOC
rules compliance.

```bash
# Run all tests with real and example input
deno test -A --parallel

# Run all tests only with example input
deno test -A --parallel --filter "Example"

# Run tests for day 3 of 2022
deno test -A --parallel 2022/2022-02.test.ts
deno test -A --parallel --filter "2022 Day 03"
```

Init script is available to quickly start a new solution

```bash
# Prepare template for a new solution (see ./template/**)
deno run -A init.ts 2022 5
```

## Structure

```
/yyyy/yyyy-dd.txt     | Personal input file of the day (git ignored)
/yyyy/yyyy-dd.ts      | Solution functions exported as part1 and part2
/yyyy/yyyy-dd.test.ts | Tests using example input and real input

/common/*.ts          | Generic utility functions shared between puzzles
```

The tests are responsible for reading (but not parsing) the input files. The
solutions themselves are usually pure `(string) => number` functions.
