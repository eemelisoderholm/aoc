import { markdownTable } from "https://esm.sh/markdown-table@3.0.3";
import { getPuzzles, Puzzle } from "./meta.ts";

/**
 * Update the solution table in the README to reflect files in repo.
 * Looks for the correct position between two comment lines.
 *
 * <!--- SOLUTIONS-AUTOGEN-START -->
 *
 * | Puzzle                            | Solution                           |
 * |-----------------------------------|------------------------------------|
 * | [2015/01: Title](./2015/01/01.md) | [./20XX/XX/XX.ts](./2015/01/01.ts) |
 * ...
 *
 * <!--- SOLUTIONS-AUTOGEN-END -->
 *
 * @param content Current README.md file content as a string
 * @returns New README.md file content with solution table updated
 */
async function updateSolutionsTable(content: string): Promise<string> {
  const markerBegin = "<!--- SOLUTIONS-AUTOGEN-START -->";
  const markerEnd = "<!--- SOLUTIONS-AUTOGEN-END -->";
  const markers = new RegExp(`(${markerBegin})([\\s\\S]*)(${markerEnd})`);

  if (!content.match(markers)) {
    throw new Error("Could not find solutions table position");
  }

  const puzzles = await getPuzzles();

  const yearsRec = puzzles.reduce((acc, puzzle) => {
    const others = acc[puzzle.year] || [];
    return { ...acc, [puzzle.year]: [...others, puzzle] };
  }, {} as Record<string, Puzzle[]>);

  const replacement = Object.entries(yearsRec).map(([year, puzzles]) => {
    return `### ${year}\n\n${
      markdownTable([
        ["Puzzle", "Solution"],
        ...puzzles.map((
          p,
        ) => [`[${p.title}](${p.mdPath})`, `[${p.tsPath}](${p.tsPath})`]),
      ])
    }\n\n`;
  }).join("");

  return content.replace(markers, `$1\n\n${replacement}$3`);
}

const oldReadme = await Deno.readTextFile("./README.md");
const newReadme = await updateSolutionsTable(oldReadme);

if (oldReadme !== newReadme) {
  await Deno.writeTextFile("./README.md", newReadme);
  console.log("Saved new README.md with updated solutions table.");
} else {
  console.log("Solutions table in README.md is already up to date.");
}
