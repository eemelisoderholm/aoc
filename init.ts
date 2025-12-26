import { copy } from "https://deno.land/std@0.167.0/fs/copy.ts";

// Initialize a solution for a given day, using the files from ./template
// Usage: deno run -A init.ts 2018 8

// Accepting year and day args in either order
function getArgs(): { year: number; day: number } {
  const [a, b] = Deno.args.map((arg) => parseInt(arg)).filter(Boolean);
  if (!a || !b) throw new Error("Invalid or missing year and date");
  const year = a > 2000 ? a : b;
  const day = a <= 2000 ? a : b;
  return { year, day };
}

const { year, day } = getArgs();
const dd = day.toString().padStart(2, "0");

const path = `./${year}/`;

// Copy the template files as-is to the new path
await copy("./template", path, { overwrite: true });

for await (const entry of Deno.readDir(path)) {
  if (entry.name.startsWith("yyyy-dd")) {
    const filePath = `${path}/${entry.name}`;
    const content = await Deno.readTextFile(filePath);

    // Write files with replaced name and content
    await Deno.writeTextFile(
      filePath
        .replace("/yyyy-dd.", `/${year}-${dd}.`),
      content
        .replaceAll("dd", dd)
        .replaceAll("yyyy", year.toString()),
    );

    // Remove the template files
    await Deno.remove(filePath);
  }
}
