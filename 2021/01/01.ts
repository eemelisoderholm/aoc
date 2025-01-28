import { M } from "../../common/math.ts";
import { P } from "../../common/parse.ts";

// Find how many measurements are larger than the previous measurement
export function part1(input: string) {
  const nums = P.linesAsNumbers(input);
  return nums.reduce((total, value, index, arr) => {
    const last = arr[index - 1];
    return last && value > last ? total + 1 : total;
  }, 0);
}

// How many sums of 3 measurements are larger than sum of previous 3
export function part2(input: string) {
  const nums = P.linesAsNumbers(input);
  return nums.reduce((total, _, index, arr) => {
    if (index === 0 || index >= arr.length - 2) return total;
    const last = M.sum(arr.slice(index - 1, index + 2));
    const next = M.sum(arr.slice(index, index + 3));
    return next > last ? total + 1 : total;
  }, 0);
}
