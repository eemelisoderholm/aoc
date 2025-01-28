export interface Puzzle {
  year: string;
  day: string;
  title: string;
  mdPath: string;
  tsPath: string;
}

export async function getPuzzles(): Promise<Puzzle[]> {
  const puzzles: Puzzle[] = [];
  for await (const entry of Deno.readDir(".")) {
    if (entry.isDirectory && entry.name.startsWith("2")) {
      const year = entry.name;
      for await (const entry of Deno.readDir(`./${year}`)) {
        if (
          entry.isDirectory && ["0", "1", "2"].includes(entry.name.charAt(0))
        ) {
          const day = entry.name;
          const dir = `./${year}/${day}`;
          const mdPath = `${dir}/${day}.md`;
          const tsPath = `${dir}/${day}.ts`;
          const desc = await readPuzzleDescription(mdPath);
          const title = desc.replace(/Day \d{1,2}: /, `${year}/${day}: `);
          puzzles.push({ year, day, title, mdPath, tsPath });
        }
      }
    }
  }
  return puzzles.sort((a, b) => a.mdPath.localeCompare(b.mdPath));
}

async function readPuzzleDescription(mdPath: string): Promise<string> {
  try {
    const content = await Deno.readTextFile(mdPath);
    const titleLine = content.split("\n")[0];
    if (!titleLine) throw new Error("No title line");
    return titleLine.replace("# ", "") ?? "Day 0: ???";
  } catch (err) {
    console.error(`Could not read puzzle description from ${mdPath}`, err);
    return "Day 0: ???";
  }
}
