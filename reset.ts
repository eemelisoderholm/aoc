import { copy } from "https://deno.land/std@0.167.0/fs/copy.ts";
import { getPuzzles } from "./meta.ts";

/**
 * Reset all the solutions code to an empty template,
 * while keeping the markdown, tests and input intact
 */
async function resetAllSolutions(): Promise<string> {
  const puzzles = await getPuzzles();
  await Promise.all(
    puzzles.map(({ tsPath }) =>
      copy("./template/00.ts", tsPath, { overwrite: true })
    ),
  );
  console.log("All the solutions have been reset");
  return "";
}

if (confirm("Remove all the solutions for all the puzzles?")) {
  resetAllSolutions();
}
