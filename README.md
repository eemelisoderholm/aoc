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

# Update the solution section below in this README
deno run -A readme.ts

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

## Solutions

<!--- SOLUTIONS-AUTOGEN-START -->

### 2015

| Puzzle                                                             | Solution                           |
| ------------------------------------------------------------------ | ---------------------------------- |
| [2015/01: Not Quite Lisp](./2015/01/01.md)                         | [./2015/01/01.ts](./2015/01/01.ts) |
| [2015/02: I Was Told There Would Be No Math](./2015/02/02.md)      | [./2015/02/02.ts](./2015/02/02.ts) |
| [2015/03: Perfectly Spherical Houses in a Vacuum](./2015/03/03.md) | [./2015/03/03.ts](./2015/03/03.ts) |
| [2015/04: The Ideal Stocking Stuffer](./2015/04/04.md)             | [./2015/04/04.ts](./2015/04/04.ts) |
| [2015/05: Doesn't He Have Intern-Elves For This?](./2015/05/05.md) | [./2015/05/05.ts](./2015/05/05.ts) |
| [2015/06: Probably a Fire Hazard](./2015/06/06.md)                 | [./2015/06/06.ts](./2015/06/06.ts) |
| [2015/07: Some Assembly Required](./2015/07/07.md)                 | [./2015/07/07.ts](./2015/07/07.ts) |

### 2016

| Puzzle                                                      | Solution                           |
| ----------------------------------------------------------- | ---------------------------------- |
| [2016/01: No Time for a Taxicab](./2016/01/01.md)           | [./2016/01/01.ts](./2016/01/01.ts) |
| [2016/02: Bathroom Security](./2016/02/02.md)               | [./2016/02/02.ts](./2016/02/02.ts) |
| [2016/03: Squares With Three Sides](./2016/03/03.md)        | [./2016/03/03.ts](./2016/03/03.ts) |
| [2016/04: Security Through Obscurity](./2016/04/04.md)      | [./2016/04/04.ts](./2016/04/04.ts) |
| [2016/05: How About a Nice Game of Chess?](./2016/05/05.md) | [./2016/05/05.ts](./2016/05/05.ts) |
| [2016/06: Signals and Noise](./2016/06/06.md)               | [./2016/06/06.ts](./2016/06/06.ts) |
| [2016/07: Internet Protocol Version 7](./2016/07/07.md)     | [./2016/07/07.ts](./2016/07/07.ts) |

### 2017

| Puzzle                                                              | Solution                           |
| ------------------------------------------------------------------- | ---------------------------------- |
| [2017/01: Inverse Captcha](./2017/01/01.md)                         | [./2017/01/01.ts](./2017/01/01.ts) |
| [2017/02: Corruption Checksum](./2017/02/02.md)                     | [./2017/02/02.ts](./2017/02/02.ts) |
| [2017/03: Spiral Memory](./2017/03/03.md)                           | [./2017/03/03.ts](./2017/03/03.ts) |
| [2017/04: High-Entropy Passphrases](./2017/04/04.md)                | [./2017/04/04.ts](./2017/04/04.ts) |
| [2017/05: A Maze of Twisty Trampolines, All Alike](./2017/05/05.md) | [./2017/05/05.ts](./2017/05/05.ts) |
| [2017/06: Memory Reallocation](./2017/06/06.md)                     | [./2017/06/06.ts](./2017/06/06.ts) |

### 2018

| Puzzle                                                  | Solution                           |
| ------------------------------------------------------- | ---------------------------------- |
| [2018/01: Chronal Calibration](./2018/01/01.md)         | [./2018/01/01.ts](./2018/01/01.ts) |
| [2018/02: Inventory Management System](./2018/02/02.md) | [./2018/02/02.ts](./2018/02/02.ts) |
| [2018/03: No Matter How You Slice It](./2018/03/03.md)  | [./2018/03/03.ts](./2018/03/03.ts) |
| [2018/04: Repose Record](./2018/04/04.md)               | [./2018/04/04.ts](./2018/04/04.ts) |
| [2018/05: Alchemical Reduction](./2018/05/05.md)        | [./2018/05/05.ts](./2018/05/05.ts) |
| [2018/06: Chronal Coordinates](./2018/06/06.md)         | [./2018/06/06.ts](./2018/06/06.ts) |

### 2019

| Puzzle                                                         | Solution                           |
| -------------------------------------------------------------- | ---------------------------------- |
| [2019/01: The Tyranny of the Rocket Equation](./2019/01/01.md) | [./2019/01/01.ts](./2019/01/01.ts) |
| [2019/02: 1202 Program Alarm](./2019/02/02.md)                 | [./2019/02/02.ts](./2019/02/02.ts) |
| [2019/03: Crossed Wires](./2019/03/03.md)                      | [./2019/03/03.ts](./2019/03/03.ts) |
| [2019/04: Secure Container](./2019/04/04.md)                   | [./2019/04/04.ts](./2019/04/04.ts) |
| [2019/05: Sunny with a Chance of Asteroids](./2019/05/05.md)   | [./2019/05/05.ts](./2019/05/05.ts) |
| [2019/06: Universal Orbit Map](./2019/06/06.md)                | [./2019/06/06.ts](./2019/06/06.ts) |

### 2020

| Puzzle                                          | Solution                           |
| ----------------------------------------------- | ---------------------------------- |
| [2020/01: Report Repair](./2020/01/01.md)       | [./2020/01/01.ts](./2020/01/01.ts) |
| [2020/02: Password Philosophy](./2020/02/02.md) | [./2020/02/02.ts](./2020/02/02.ts) |
| [2020/03: Toboggan Trajectory](./2020/03/03.md) | [./2020/03/03.ts](./2020/03/03.ts) |
| [2020/04: Passport Processing](./2020/04/04.md) | [./2020/04/04.ts](./2020/04/04.ts) |
| [2020/05: Binary Boarding](./2020/05/05.md)     | [./2020/05/05.ts](./2020/05/05.ts) |
| [2020/06: Custom Customs](./2020/06/06.md)      | [./2020/06/06.ts](./2020/06/06.ts) |
| [2020/07: Handy Haversacks](./2020/07/07.md)    | [./2020/07/07.ts](./2020/07/07.ts) |
| [2020/08: Handheld Halting](./2020/08/08.md)    | [./2020/08/08.ts](./2020/08/08.ts) |

### 2021

| Puzzle                                              | Solution                           |
| --------------------------------------------------- | ---------------------------------- |
| [2021/01: Sonar Sweep](./2021/01/01.md)             | [./2021/01/01.ts](./2021/01/01.ts) |
| [2021/02: Dive!](./2021/02/02.md)                   | [./2021/02/02.ts](./2021/02/02.ts) |
| [2021/03: Binary Diagnostic](./2021/03/03.md)       | [./2021/03/03.ts](./2021/03/03.ts) |
| [2021/04: Giant Squid](./2021/04/04.md)             | [./2021/04/04.ts](./2021/04/04.ts) |
| [2021/05: Hydrothermal Venture](./2021/05/05.md)    | [./2021/05/05.ts](./2021/05/05.ts) |
| [2021/06: Lanternfish](./2021/06/06.md)             | [./2021/06/06.ts](./2021/06/06.ts) |
| [2021/07: The Treachery of Whales](./2021/07/07.md) | [./2021/07/07.ts](./2021/07/07.ts) |
| [2021/09: Smoke Basin](./2021/09/09.md)             | [./2021/09/09.ts](./2021/09/09.ts) |
| [2021/10: Syntax Scoring](./2021/10/10.md)          | [./2021/10/10.ts](./2021/10/10.ts) |

### 2022

| Puzzle                                              | Solution                           |
| --------------------------------------------------- | ---------------------------------- |
| [2022/01: Calorie Counting](./2022/01/01.md)        | [./2022/01/01.ts](./2022/01/01.ts) |
| [2022/02: Rock Paper Scissors](./2022/02/02.md)     | [./2022/02/02.ts](./2022/02/02.ts) |
| [2022/03: Rucksack Reorganization](./2022/03/03.md) | [./2022/03/03.ts](./2022/03/03.ts) |
| [2022/04: Camp Cleanup](./2022/04/04.md)            | [./2022/04/04.ts](./2022/04/04.ts) |
| [2022/05: Supply Stacks](./2022/05/05.md)           | [./2022/05/05.ts](./2022/05/05.ts) |
| [2022/06: Tuning Trouble](./2022/06/06.md)          | [./2022/06/06.ts](./2022/06/06.ts) |
| [2022/07: No Space Left On Device](./2022/07/07.md) | [./2022/07/07.ts](./2022/07/07.ts) |
| [2022/09: Rope Bridge](./2022/09/09.md)             | [./2022/09/09.ts](./2022/09/09.ts) |

### 2023

| Puzzle                                     | Solution                           |
| ------------------------------------------ | ---------------------------------- |
| [2023/01: Trebuchet?!](./2023/01/01.md)    | [./2023/01/01.ts](./2023/01/01.ts) |
| [2023/02: Cube Conundrum](./2023/02/02.md) | [./2023/02/02.ts](./2023/02/02.ts) |
| [2023/03: Gear Ratios](./2023/03/03.md)    | [./2023/03/03.ts](./2023/03/03.ts) |
| [2023/04: Scratchcards](./2023/04/04.md)   | [./2023/04/04.ts](./2023/04/04.ts) |
| [2023/06: Wait For It](./2023/06/06.md)    | [./2023/06/06.ts](./2023/06/06.ts) |

### 2024

| Puzzle                                         | Solution                           |
| ---------------------------------------------- | ---------------------------------- |
| [2024/01: Historian Hysteria](./2024/01/01.md) | [./2024/01/01.ts](./2024/01/01.ts) |
| [2024/02: Red-Nosed Reports](./2024/02/02.md)  | [./2024/02/02.ts](./2024/02/02.ts) |
| [2024/03: Mull It Over](./2024/03/03.md)       | [./2024/03/03.ts](./2024/03/03.ts) |
| [2024/04: Ceres Search](./2024/04/04.md)       | [./2024/04/04.ts](./2024/04/04.ts) |
| [2024/05: Print Queue](./2024/05/05.md)        | [./2024/05/05.ts](./2024/05/05.ts) |
| [2024/07: Bridge Repair](./2024/07/07.md)      | [./2024/07/07.ts](./2024/07/07.ts) |

<!--- SOLUTIONS-AUTOGEN-END -->
